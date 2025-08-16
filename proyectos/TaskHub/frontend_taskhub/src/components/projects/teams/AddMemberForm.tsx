import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage } from "../../ErrorMessage";
import type { TeamMemberForm } from "@/types/index";
import { findUser } from "@/services/TeamService";
import { toast } from "react-toastify";
import { SearchResult } from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        user: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUser,
        onSuccess: (data) => {
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = {
            data: formData,
            projectId
        }
        
        mutation.mutate(data)
    }

    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >Email / username</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Email / username del usuario a agregar"
                        className="w-full p-3  border-gray-300 border"
                        {...register("user", {
                            required: "El email / username es obligatorio",
                        })}
                    />
                    {errors.user && (
                        <ErrorMessage>{errors.user.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value='Buscar usuario'
                />
            </form>
            <div className="mt-5">
            {mutation.isPending && (
                <p className="text-center text-2xl font-bold mt-5">Buscando usuario...</p>
                )
            }
            {mutation.isError && (
                <ErrorMessage>
                    {mutation.error.message}
                </ErrorMessage>
            )}

            {mutation.data && <SearchResult user={mutation.data}/>}
            </div>
        </>
    )
}