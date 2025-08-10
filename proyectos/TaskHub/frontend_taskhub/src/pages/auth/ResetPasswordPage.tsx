import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import ResetPasswordToken from '@/components/auth/ResetPasswordToken';
import type { TokenConfirmation } from '@/types/index';
import { useState } from 'react';

export default function ResetPasswordPage() {

    const [token, setToken] = useState<TokenConfirmation['token']>('')
    const [isValidToken, setIsValidToken] = useState(false)


    return (
        <>
            <h1 className="text-5xl font-black text-white">Resetear contraseña</h1>
            <p className="text-xl font-light text-white mt-5">
                Escribe tu el token para {''}
                <span className=" text-fuchsia-500 font-bold"> resetear tu contraseña</span>
            </p>
            {!isValidToken ?
                <ResetPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/> : 
                <ResetPasswordForm token={token}/>
            }
        </>

            
    )
}
