import { Link, Form, useActionData, type ActionFunctionArgs, redirect, type LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { Error } from "../components/Error"
import { editProduct, getProduct } from "../services/ProductService"
import { ProductForm } from "../components/ProductForm"

const availableOptions = [
  { name: "En Stock", value: true },
  { name: "Agotado", value: false }
]
export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id) {
    const product = await getProduct(+params.id)

    if (!product) {
      throw new Response('', { status: 404, statusText: "No encontrado" })
    }
    return product
  }
  else {
    throw new Response('', { status: 401, statusText: "ID no válido" })
  }

}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())

  let error = ""


  if (Object.values(data).includes('')) {
    error = "Todos los campos son obligatorios"
  }

  if (error) {
    return error
  }
  else {
    error = ""
  }

  if (params.id) {
    await editProduct(+params.id, data)
  }
  else {
    throw new Response('', { status: 401, statusText: "ID no válido" })
  }

  return redirect('/')
}

export const EditProduct = () => {
  const product = useLoaderData()

  const error = useActionData() as string


  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='text-4xl font-black text-slate-700'>Editar producto</h2>
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

        <ProductForm product={product}/>
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="available"
          >Disponibilidad:</label>
          <select
            id="available"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="available"
            defaultValue={product.available.toString()}
          >
            {availableOptions.map(opt => (
              <option key={opt.name} value={opt.value.toString()}>{opt.name}</option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-700 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-indigo-900"
          value="Guardar"
        />
      </Form>
    </>
  )
}
