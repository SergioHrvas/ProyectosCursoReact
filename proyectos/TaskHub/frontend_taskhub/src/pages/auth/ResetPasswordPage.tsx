import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import ResetPasswordToken from '@/components/auth/ResetPasswordToken';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ResetPasswordPage() {

    const [isValidToken, setIsValidToken] = useState(false)


    return (
        <>
            <h1 className="text-5xl font-black text-white">Resetear contraseña</h1>
            <p className="text-xl font-light text-white mt-5">
                Escribe tu el token para {''}
                <span className=" text-fuchsia-500 font-bold"> resetear tu contraseña</span>
            </p>
            {!isValidToken ?
                <ResetPasswordToken/> : 
                <ResetPasswordForm/>
            }
        </>

            
    )
}
