import { Link, Form, useActionData, type ActionFunctionArgs, redirect, type LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { Error } from "../components/Error"
import { addProduct, getProduct } from "../services/ProductService"

export async function loader ({params} : LoaderFunctionArgs){
  if(params.id) {
    const product = await getProduct(+params.id)
    console.log(product)
    if(!product) {
      throw new Response('', {status: 404, statusText: "No encontrado"})
    }
    return product
  }
  else{
    throw new Response('', {status: 401, statusText: "ID no válido"})
  }

}

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

        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="name"
          >Nombre del producto:</label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del producto"
            name="name"
            defaultValue={product.name}
          />
        </div>
        <div className="mb-4">
          <label
            className="text-gray-800"
            htmlFor="price"
          >Precio:</label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio del producto. ej. 300, 450"
            name="price"
            defaultValue={product.price}
          />
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
