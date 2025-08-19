import type { TaskType } from "@/types/index"
import { NewNoteForm } from "./NewNoteForm"
import { NoteList } from "./NoteList"

type NotesPanelProps = {
    taskId: string,
    notes: TaskType['notes']
}

export const NotesPanel = ({taskId, notes} : NotesPanelProps) => {
  return (
    <>
        <NewNoteForm taskId={taskId}/>
        <NoteList notes={notes} taskId={taskId}/>
    </>
  )
}
