import { Router } from 'express'

import { createProduct, getProducts, getProductById, updateProduct, updateAvailable, removeProduct} from './controllers/product'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: ID of the product
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: Name of the product
 *                      example: Big television
 *                  price:
 *                      type: number
 *                      description: Price of the product
 *                      example: 800
 *                  available:
 *                      type: boolean
 *                      description: If the product is available or not
 *                      example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of all the products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return the details of a product by ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The unique ID of the product to get
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              404:
 *                  description: Product not found
 *              400: 
 *                  description: Bad Request - Invalid ID
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 */
router.get('/:id',
    param('id').isInt().withMessage("Formato de ID no válido"),
    handleInputErrors,
    getProductById)


/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new product
 *          tags:
 *              - Products
 *          description: Return a new record of the product in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Personal & Gaming Computer"
 *                              price:
 *                                  type: number
 *                                  example: 1350
 *          responses:
 *              400: 
 *                  description: Bad Request - Invalid Request Body
 *              201:
 *                  description: Successful response
 */
router.post('/',
    //Validación
    body('name').notEmpty().withMessage("El nombre del producto no puede ser vacío"),
    body('price')
                .isNumeric().withMessage("Valor no numérico")
                .notEmpty().withMessage("El precio del producto no puede ser vacío")
                .custom(value => value > 0).withMessage("Precio no válido"),
    handleInputErrors,

    createProduct)


/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update a new product with the data of the body request 
 *          tags:
 *              - Products
 *          description: Return the updated product in the database
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The unique ID of the product to update
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Personal & Gaming Computer"
 *                              price:
 *                                  type: number
 *                                  example: 1350
 *                              available:
 *                                  type: boolean
 *                                  example: false
 *          responses:
 *              404: 
 *                  description: Product not found
 *              400: 
 *                  description: Bad Request - Invalid Request Body or ID
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 */
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


/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Change the availability of the product
 *          tags:
 *              - Products
 *          description: Return the updated availability 
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The unique ID of the product to edit
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              400: 
 *                  description: Bad Request - Invalid ID
 *              404: 
 *                  description: Product not found
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 */
router.patch('/:id', 
    param('id').isInt().withMessage("Formato de ID no válido"),
    handleInputErrors,
    updateAvailable)

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a product by the ID
 *          tags:
 *              - Products
 *          description: Return the success of the deletion
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The unique ID of the product to remove
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              400: 
 *                  description: Bad Request - Invalid ID
 *              404: 
 *                  description: Product not found
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: "Producto eliminado correctamente."
 */
router.delete('/:id', 
    param('id').isInt().withMessage("Formato de ID no válido"),
    handleInputErrors,
    removeProduct
)

export default router