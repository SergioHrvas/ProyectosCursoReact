import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { body } from 'express-validator'
import { handleInputError } from '../middlewares/validation'

const router = Router()

router.post(
    '/create-account', 
    body('name').notEmpty().withMessage("El nombre del usuario es obligatorio"), 
    body('surname').notEmpty().withMessage("El apellido del usuario es obligatorio"), 
    body('username').notEmpty().withMessage("El username del usuario es obligatorio"), 
    body('email').notEmpty().withMessage("El email del usuario es obligatorio"), 
    body('password').isLength({min: 8}).withMessage("El password necesita como mínimo 8 caracteres."), 
    body('password_confirmation').custom((value, {req}) => {
        return req.body.password === value
    }).withMessage("Las contraseñas no coinciden."),
    handleInputError,
    AuthController.createAccount
)

router.post(
    '/confirm-account',
    body('token').notEmpty().withMessage("El token es obligatorio"),
    handleInputError,
    AuthController.confirmAccount
)


router.post(
    '/login',
    body('user').notEmpty().withMessage("El nombre de usuario o correo electrónico es obligatorio"),
    body('password').notEmpty().withMessage("La contraseña es obligatoria"),
    handleInputError,
    AuthController.login
)


router.post(
    '/request-code',
    body('user').notEmpty().withMessage("El nombre de usuario o correo electrónico es obligatorio"),
    handleInputError,
    AuthController.requestConfirmationCode
)

export default router
