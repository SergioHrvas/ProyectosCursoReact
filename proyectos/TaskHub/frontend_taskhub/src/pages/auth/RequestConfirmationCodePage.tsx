import { ErrorMessage } from "@/components/ErrorMessage";
import { requestConfirmationCode } from "@/services/AuthService";
import type { RequestConfirmationCodeForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const RequestConfirmationCodePage = () => {
    const initialValues: RequestConfirmationCodeForm = {
        user: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const {mutate} = useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })


    const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
        mutate(formData)
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Solicitar código de confirmación</h1>
            <p className="text-2xl font-light text-white mt-5">
                Coloca tu email / username para recibir {''}
                <span className=" text-fuchsia-500 font-bold"> un nuevo código</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="user"
                    >Email / username</label>
                    <input
                        id="user"
                        type="user"
                        placeholder="Email / Username de registro"
                        className="w-full p-3 rounded-lg border-gray-300 border"
                        {...register("user", {
                            required: "El email / username de registro es obligatorio",
                        })}
                    />
                    {errors.user && (
                        <ErrorMessage>{errors.user.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Enviar Código'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
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
                    to='/auth/forgot-password'
                    className="text-center text-gray-300 font-normal"
                >
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>
            </nav>
        </>
    )
}
