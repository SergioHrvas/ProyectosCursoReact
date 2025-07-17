import { Link } from 'react-router-dom'

export const Dashboard = () => {
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
    
    </>
  )
}
