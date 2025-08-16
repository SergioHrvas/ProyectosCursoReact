import type { User } from "@/types/index"

type SearchResultProps = {
    user: User
}

export const SearchResult = ({user}: SearchResultProps) => {
    return (
    <div className="text-center w-full">
        <div className="text-lg ">{user.name} {''} {user.surname}</div>
        <div className="text-lg text-gray-600">{user.email}</div>
        <p className="text-fuchsia-700 font-bold">@{user.username}</p>

        <button className="mt-4 font-black text-xl rounded-lg bg-purple-600 text-white p-3">Añadir miembro</button>
    </div>
  )
}
