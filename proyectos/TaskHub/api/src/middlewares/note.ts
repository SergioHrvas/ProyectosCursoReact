import { Types } from "mongoose";
import Note, { TNote } from "../models/Note";
import { Request, Response, NextFunction} from 'express'

declare global {
    namespace Express {
        interface Request { // asi añadimos el campo note a Request de Express (al ser una interfaz repetida en Express, añade los campos nuevos)
            note: TNote
        }
    }
}

export async function validateNoteExists (req: Request, res: Response, next: NextFunction) {
    const {noteId} = req.params

    try {
        if(!Types.ObjectId.isValid(noteId)){
            return res.status(400).send({error: "Id no válido"})
        }

        const note = await Note.findById(noteId)
        
        console.log(note)
        if(!note){
            const error = new Error("Nota no encontrada")
            return res.status(404).send({error: error.message})
        }

        req.note = note
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({error: "Error interno"})
    }
}

export async function noteBelongsToTask ( req: Request, res: Response, next: NextFunction) {
    const note = req.note
    console.log(note)
    console.log(req.task)
    if(note.task.toString() !== req.task.id.toString()){
        const error = new Error ("Solicitud no válida")
        return res.status(400).send({deleted: false, error: error.message})
    }
    next()
}
