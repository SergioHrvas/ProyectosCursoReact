import { Link } from "react-router-dom"

export const ErrorPage = () => {
  return (
    <>
        <h1 className="text-center font-black text-4xl">Página no encontrada.</h1>
        <p className="text-center mt-3 text-xl">
            Volver a la  <Link className="text-fuchsia-700 font-black" to={"/"}>página principal</Link>
        </p>
    </>
  )
}
