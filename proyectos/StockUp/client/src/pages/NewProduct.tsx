import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom"
import { Error } from "../components/Error"
import { addProduct } from "../services/ProductService"
import { ProductForm } from "../components/ProductForm"

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())

  let error = ""

  if (Object.values(data).includes('')) {
    error = "Todos los campos son obligatorios"
  }

  if (error) {
    return error
  }

  await addProduct(data)
  error = ""

  return redirect('/')
}

export const NewProduct = () => {

  const error = useActionData() as string


  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='text-4xl font-black text-slate-700'>Nuevo producto</h2>
        <Link
          to={'/'}
          className='rounded-md text-center bg-indigo-700 text-white font-bold text-sm uppercase p-3 cursor-pointer shadow-md hover:bg-indigo-900'
        >
          Volver a Productos
        </Link>
      </div>

      {error && (<Error>{error}</Error>)}
      <Form
        className="mt-10"
        method="POST"

      >

        <ProductForm/>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-700 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-indigo-900"
          value="Registrar Producto"
        />
      </Form>
    </>
  )
}
