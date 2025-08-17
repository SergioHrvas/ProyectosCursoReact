import { useAuth } from '@/hooks/useAuth'
import { deleteProject, getProjects } from '@/services/ProjectService'
import { isAdmin } from '@/utils/policies'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Fragment } from 'react/jsx-runtime'

export const Dashboard = () => {

  const { data: authData, isLoading: isAuthLoading } = useAuth()
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Proyecto eliminado correctamente")
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })
  
  return (
    <>
      <h1 className="text-5xl font-black">Mis proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-3">Administra tus proyectos</p>

      <nav className='my-5'>
        <Link
          to="/projects/create"
          className='bg-purple-600 font-bold text-white uppercase text-xl p-3 rounded-md hover:bg-purple-800 transition-colors'
        >
          Nuevo proyecto
        </Link>
      </nav>

      {
        (isLoading || isAuthLoading) ? <p>Cargando...</p>
          : (data && authData && data.length) ?
            <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
              {data.map((project) => (
                <li key={project._id} className="flex justify-between gap-x-6 px-5 py-6">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto space-y-2">
                      {isAdmin(project.admin, authData._id) ?
                        <p className="w-fit text-xs font-semibold text-purple-600 bg-purple-100 rounded-full px-2.5 py-1.5">
                          Administrador
                        </p> : 
                        <p className="w-fit text-xs font-semibold text-gray-600 bg-gray-100 rounded-full px-2.5 py-1.5">
                          Miembro del equipo
                        </p>
                      }
                      <Link to={`/projects/${project._id}`}
                        className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                      >{project.name}</Link>

                      <p className="text-sm text-gray-400">
                        Cliente: {project.client}
                      </p>
                      <p className="text-sm text-gray-400">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-x-6">
                    <Menu as="div" className="relative flex-none">
                      <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                      </MenuButton>
                      <Transition as={Fragment} enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <MenuItems
                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                        >
                          <MenuItem>
                            <Link to={`/projects/${project._id}`}
                              className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                              Ver Proyecto
                            </Link>
                          </MenuItem>
                          {authData._id === project.admin &&
                            <><MenuItem>
                              <Link to={`/projects/${project._id}/edit`}
                                className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                Editar Proyecto
                              </Link>
                            </MenuItem>
                              <MenuItem>
                                <button
                                  type='button'
                                  className='block px-3 py-1 text-sm leading-6 text-red-500'
                                  onClick={() => { mutate(project._id) }}
                                >
                                  Eliminar Proyecto
                                </button>
                              </MenuItem>
                            </>
                          }
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </li>
              ))}
            </ul>
            : <p className='pt-10 text-center text-gray-800'>No hay proyectos disponibles {''}
              <Link to="/projects/create" className='text-purple-800 font-bold'>Crear proyecto</Link>
            </p>
      }
    </>
  )
}
