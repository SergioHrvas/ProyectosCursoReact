import { Link } from 'react-router-dom'
export const Products = () => {
  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-700'>Productos</h2>
        <Link
          to={'/product/create'}
          className='rounded-md bg-indigo-700 text-white font-bold text-sm uppercase p-3 cursor-pointer shadow-md hover:bg-indigo-900'
        >
          Agregar Producto
        </Link>
      </div>
    </>
  )
}
