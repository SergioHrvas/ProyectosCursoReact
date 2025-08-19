import type { Request, Response } from "express";
import Note, { TNote } from "../models/Note";
import { Types } from "mongoose";
import Task from "../models/Task";

type NoteParams = {
    noteId: Types.ObjectId,
    taskId: Types.ObjectId
}
export class NoteController {
    static createNote = async (req: Request<{}, {}, TNote>, res: Response) => {
        const { text } = req.body

        try {
            const newNote = new Note({
                text: text,
                author: req.user.id,
                task: req.task.id
            })

            req.task.notes.push(newNote.id)

            await Promise.allSettled([newNote.save(), req.task.save()])

            res.send("Nota creada correctamente")
        } catch (error) {
            res.status(500).send({ error: "Error interno." })
        }
    }

    static getNotes = async (req: Request, res: Response) => {
        try {
            const notes = await Note.find({ task: req.task.id }).populate({ path: 'author', select: 'id name surname username email' })

            res.send({ notes })

        } catch (error) {
            res.status(500).send({ error: "Error interno." })
        }
    }

    static deleteNote = async (req: Request<NoteParams>, res: Response) => {
        const { taskId } = req.params
        const note = req.note

        try {

            const task = await Task.findById(taskId).populate<{ project: { admin: Types.ObjectId } | null }>({ path: 'project', select: 'admin' });

            if (
                (note.author.toString() !== req.user.id.toString()) &&
                (task.project.admin && task.project.admin.toString() !== req.user.id.toString())
            )
            {
                const error = new Error("Usuario no autorizado.");
                return res.status(403).send({ error: error.message });
            }

            
            task.notes = task.notes.filter(t => t.toString() !== note.id.toString())


            await Promise.allSettled([note.deleteOne(), task.save()])

            return res.send("Nota eliminada correctamente")

        } catch (error) {
            res.status(500).send({ error: "Error interno." })
        }
    }

}
