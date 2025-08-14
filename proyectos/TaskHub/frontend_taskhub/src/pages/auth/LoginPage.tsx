import { ErrorMessage } from "@/components/ErrorMessage"
import type { UserLoginForm } from "@/types/index"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from "@/services/AuthService"
import { toast } from "react-toastify"

export const LoginPage = () => {
  const initialValues: UserLoginForm = {
    user: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: loginAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Iniciando sesión")
      navigate("/")
    }
  })

  const handleLogin = (formData: UserLoginForm) => { mutate(formData) }

  return (
    <>
      <h1 className="text-5xl font-black text-white">Login</h1>
      <p className="text-xl font-light text-white mt-5">
          Rellena el formulario para {''}
          <span className=" text-fuchsia-500 font-bold"> iniciar sesión</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email / Username</label>

          <input
            id="user"
            type="user"
            placeholder="Email / Username de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("user", {
              required: "El email / username es obligatorio"
            })}
          />
          {errors.user && (
            <ErrorMessage>{errors.user.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex-col space-y-5">
        <p className="text-center text-white font-normal">¿No tienes cuenta? <Link to="/auth/register" className="text-fuchsia-500 font-bold">Regístrate</Link></p>
        <p className="text-center text-white font-normal">¿Olvidaste la contraseña? <Link to="/auth/forgot-password" className="text-fuchsia-500 font-bold">Reseteala</Link></p>
      
      </nav>
    </>
  )
}
