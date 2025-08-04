import { transport } from "../config/nodemailer"

interface IEmail {
    email: string,
    name: string,
    token: string
}

export class AuthEmail {
    static sendConfirmEmail = async ( user : IEmail) => {
            const info = await transport.sendMail({
                from: 'TaskHub <official@taskhub.com>',
                to: user.email,
                subject: 'Uptask - Confirma tu cuenta',
                text: 'UpTask - Confirma tu cuenta',
                html: `<p>Hola ${user.name}! </p>
                <p>Accede al enlace de abajo e ingresa el siguiente token: <b>${user.token}</b></p>
                <a>Confirmar cuenta</a>
                
                <p>El token expirará en 10 minutos</p>`
            })

            console.log("Mensaje enviado:", info.messageId)
            return info
    }
}