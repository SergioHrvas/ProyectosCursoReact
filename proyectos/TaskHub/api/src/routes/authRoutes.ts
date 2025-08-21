import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { body, param } from 'express-validator'
import { handleInputError } from '../middlewares/validation'
import { authenticate } from '../middlewares/auth'

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

router.post(
    '/forgot-password',
    body('user').notEmpty().withMessage("El nombre de usuario o correo electrónico es obligatorio"),
    handleInputError,
    AuthController.forgotPassword
)


router.post(
    '/validate-token',
    body('token').notEmpty().withMessage("El token es obligatorio"),
    handleInputError,
    AuthController.validateToken
)

router.post(
    '/reset-password/:token',
    param('token').isNumeric().withMessage("Token no válido"),
    body('password').isLength({min: 8}).withMessage("El password necesita como mínimo 8 caracteres."), 
    body('password_confirmation').custom((value, {req}) => {
        return req.body.password === value
    }).withMessage("Las contraseñas no coinciden."),
    handleInputError,
    AuthController.resetPassword
)


router.get('/user',
    authenticate,
    AuthController.getUser
)


/*Profile*/
router.put('/user',
    authenticate,
    body('name').notEmpty().withMessage("El nombre del usuario es obligatorio"), 
    body('surname').notEmpty().withMessage("El apellido del usuario es obligatorio"), 
    body('username').notEmpty().withMessage("El username del usuario es obligatorio"), 
    body('email').notEmpty().withMessage("El email del usuario es obligatorio"), 
    handleInputError,
    AuthController.updateUser
)


router.put('/change-password',
    authenticate,
    body('password').isLength({min: 8}).withMessage("El nuevo password necesita como mínimo 8 caracteres."), 
    body('password_confirmation').custom((value, {req}) => {
        return req.body.password === value
    }).withMessage("Las contraseñas no coinciden."),
    body('password_old').notEmpty().withMessage("La contraseña antigua es obligatoria"),
    handleInputError,
    AuthController.changePassword
)

router.post('/check-password',
    authenticate,
    body('password').notEmpty().withMessage("La contraseña es obligatoria."), 
    handleInputError,
    AuthController.checkPassword
)
export default router
