import AddMemberModal from "@/components/projects/teams/AddMemberModal"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteMemberFromTeam, getMembersTeam } from "@/services/TeamService"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"
import { Fragment } from "react/jsx-runtime"
import { toast } from "react-toastify"
import type { User } from "@/types/index"

export const ProjectTeamPage = () => {
    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projectTeam', projectId],
        queryFn: () => getMembersTeam(projectId),
        retry: false
    })

    const {mutate} = useMutation({
        mutationFn: deleteMemberFromTeam,
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] }) // Refresh the team members list
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const handleRemove = (id: User['_id']) => {
        mutate({ projectId, id}) // Replace 'memberId' with the actual member ID to remove
    }

    return (
        <>
            <h1 className="text-5xl font-black">Administrar equipo</h1>
            <p className="text-2xl font-light text-gray-600 mt-5">Administra los miembros del equipo</p>
            <nav className="mt-5 flex gap-3">
                <button
                    type="button"
                    onClick={() => navigate('?addMember=true')}
                    className='bg-purple-600 font-bold text-white uppercase text-xl p-3 rounded-md hover:bg-purple-800 transition-colors'
                >
                    Añadir miembro
                </button>

                <Link
                    to={`/projects/${projectId}`}
                    className='bg-fuchsia-600 font-bold text-white uppercase text-xl p-3 rounded-md hover:bg-fuchsia-800 transition-colors'
                >
                    Volver
                </Link>
            </nav>

            { isLoading && <p>Cargando...</p>}
            { isError && <p>No se pudieron cargar los miembros del equipo</p>}
            <h2 className="text-5xl font-black my-10">Miembros actuales</h2>
            {data && data.length ? (
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data?.map((member) => (
                        <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-2xl font-black text-gray-600">
                                        {member.name} {' '} {member.surname} <span className="font-light">- @{member.username}</span>
                                    </p>
                                    <p className="text-sm text-gray-400">
                                       {member.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                            <span className="sr-only">opciones</span>
                                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </MenuButton>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <MenuItem>
                                                <button
                                                    onClick={() => handleRemove(member._id)}
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                >
                                                    Eliminar del Proyecto
                                                </button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center py-20'>No hay miembros en este equipo</p>
            )}
            <AddMemberModal/>
        </>
    )
}
