import { Link } from "react-router-dom";
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useState } from "react";
import type { TokenConfirmation } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/services/AuthService";
import { toast } from "react-toastify";

export default function ConfirmAccountPage() {

  const [token, setToken] = useState<TokenConfirmation['token']>('')

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      console.log("<a")
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const handleChange = (value: TokenConfirmation['token']) => {
    setToken(value)
  }

  const handleComplete = (value: TokenConfirmation['token']) => {
    mutate({token: value})
  }

  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> por email</span>
      </p>
      <form
        className="space-y-8 p-10 bg-white mt-10"
      >
        <label
          className="font-normal text-2xl text-center block"
        >Código de 6 dígitos</label>
        <div className="flex justify-center gap-5">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="text-center w-10 h-10 p-3 rounded-md border-gray-600 border placeholder-white"/>
            <PinInputField className="text-center w-10 h-10 p-3 rounded-md border-gray-600 border placeholder-white"/>
            <PinInputField className="text-center w-10 h-10 p-3 rounded-md border-gray-600 border placeholder-white"/>
            <PinInputField className="text-center w-10 h-10 p-3 rounded-md border-gray-600 border placeholder-white"/>
            <PinInputField className="text-center w-10 h-10 p-3 rounded-md border-gray-600 border placeholder-white"/>
            <PinInputField className="text-center w-10 h-10 p-3 rounded-md border-gray-600 border placeholder-white"/>
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/request-code'
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo código de confirmación
        </Link>
      </nav>

    </>
  )
}
