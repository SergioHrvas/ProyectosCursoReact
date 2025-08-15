import AddMemberModal from "@/components/projects/teams/AddMemberModal"
import { Link, useNavigate, useParams } from "react-router-dom"

export const ProjectTeamPage = () => {
    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

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

            <AddMemberModal/>
        </>
    )
}
