import {useDroppable } from '@dnd-kit/core'

type DropTaskProps = {
    status: string
}
export const DropTask = ({status} : DropTaskProps) => {

    const { isOver, setNodeRef } = useDroppable({id: status})
    
    const style = {
        opacity: isOver ? 0.4 : 1
    }
    return (
        <div
            style={style}
            ref={setNodeRef}
            className="font-semibold text-center uppercase text-gray-600 w-full justify-center border border-dashed border-gray-400 p-2"
        >
            Soltar tarea aquí
        </div>
  )
}
