import type { TaskType } from "@/types/index"
import { NoteDetails } from "./NoteDetails"

type NoteListProps = {
    notes: TaskType['notes']
    taskId: string
}


export const NoteList = ({notes, taskId} : NoteListProps) => {
  return (
    <div className="divide-y divide-gray-100 mt-10">
        <p className='text-lg text-slate-600 font-bold mb-3'>Historial de notas</p>
        {(notes && notes.length > 0) ?
        <div className="space-y-4">
            {notes.map(note => (
                <NoteDetails note={note} taskId={taskId}/>
            ))}
        </div> 
        : <p>No hay notas agregadas a la tarea</p>}
    </div>
  )
}
