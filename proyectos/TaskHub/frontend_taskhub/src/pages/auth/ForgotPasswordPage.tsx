import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { type ForgotPasswordForm } from "../../types";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/AuthService";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const initialValues: ForgotPasswordForm = {
    user: ''
  }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    
    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })
  
  const handleForgotPassword = (formData: ForgotPasswordForm) => {mutate(formData)}


  return (
    <>
        <h1 className="text-5xl font-black text-white">Resetear contraseña</h1>
        <p className="text-xl font-light text-white mt-5">
            Escribe tu email / username para {''}
            <span className=" text-fuchsia-500 font-bold"> resetear tu contraseña</span>
        </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10  bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="user"
          >Email / Username</label>
          <input
            id="user"
            type="user"
            placeholder="Email / username de registro"
            className="w-full p-3  border-gray-300 border"
            {...register("user", {
              required: "El email/username de registro es obligatorio",
            })}
          />
          {errors.user && (
            <ErrorMessage>{errors.user.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Enviar Instrucciones'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/login'
          className="text-center text-gray-300 font-normal"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>

        <Link
          to='/auth/register'
          className="text-center text-gray-300 font-normal"
        >
          ¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </>
  )
}
