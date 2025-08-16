import { addMemberToTeam } from "@/services/TeamService"
import type { TeamMemberForm, User } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import type { UseFormReset } from "react-hook-form"
import { toast } from "react-toastify"

type SearchResultProps = {
    user: User,
    projectId: string,
    reset: () => void
}

export const SearchResult = ({user, projectId, reset}: SearchResultProps) => {

    const {mutate} = useMutation({
        mutationFn: addMemberToTeam,
        onSuccess: (data) => {
            toast.success(data);
            reset()
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const handleClick = () => {
        const data = {
            id: user._id,
            projectId: projectId
        }
        mutate(data)
    }

    return (
    <div className="text-center w-full">
        <div className="text-lg ">{user.name} {''} {user.surname}</div>
        <div className="text-lg text-gray-600">{user.email}</div>
        <p className="text-fuchsia-700 font-bold">@{user.username}</p>

        <button onClick={handleClick} className="mt-4 font-black text-xl rounded-lg bg-purple-600 text-white p-3">Añadir miembro</button>
    </div>
  )
}
