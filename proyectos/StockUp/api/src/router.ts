import { Router } from 'express'

import { createProduct, getProducts, getProductById, updateProduct, updateAvailable, removeProduct} from './controllers/product'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()

router.get('/', getProducts)

router.get('/:id',
    param('id').isInt().withMessage("Formato de ID no válido"),
    handleInputErrors,
    getProductById)

router.post('/',
    //Validación
    body('name').notEmpty().withMessage("El nombre del producto no puede ser vacío"),
    body('price')
                .isNumeric().withMessage("Valor no numérico")
                .notEmpty().withMessage("El precio del producto no puede ser vacío")
                .custom(value => value > 0).withMessage("Precio no válido"),
    handleInputErrors,

    createProduct)

router.put('/:id',
    //Validación
    body('name').notEmpty().withMessage("El nombre del producto no puede ser vacío"),
    body('price')
                .isNumeric().withMessage("Valor no numérico")
                .notEmpty().withMessage("El precio del producto no puede ser vacío")
                .custom(value => value > 0).withMessage("Precio no válido"),
    body('available').isBoolean().withMessage("Valor no válido"),
    param('id').isInt().withMessage("Formato de ID no válido"),
    handleInputErrors,
    updateProduct)

router.patch('/:id', 
    param('id').isInt().withMessage("Formato de ID no válido"),
    handleInputErrors,
    updateAvailable)

router.delete('/:id', 
    param('id').isInt().withMessage("Formato de ID no válido"),
    handleInputErrors,
    removeProduct
)

export default router