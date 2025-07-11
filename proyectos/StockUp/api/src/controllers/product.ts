import { Request, Response } from 'express'
import Product from '../models/Product'

export const getProducts = async (req: Request, res: Response) => {
    try{
        const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ]
        })
        res.send({data: products, count: products.length})
    } catch(error){
        console.log(error)
        res.status(500).send({error: "Error interno"})
    }
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params

    try{
        const product = await Product.findByPk(id)

        if (!product){
            return res.status(404).send({error: "Producto no encontrado"})
        }
        res.send({data: product})
    } catch (error){
        console.log(error)
        res.status(500).send({error: "Error interno"})
    }
}

export const createProduct = async (req: Request, res: Response) => {

    //FORMA 1
    //Creamos el objeto
    //const product = new Product(req.body)

    //Lo guardamos en la base de datos
    //const saved_product = await product.save()
    
    //FORMA 2
    try {
        const saved_product = await Product.create(req.body)
        res.send({data: saved_product})
    } catch(error){
        console.log(error)
        res.status(500).send({error: "Error interno"})
    }
}

export const updateProduct = async (req: Request, res: Response) => {

    const { id } = req.params

    try{
        const product = await Product.findByPk(id)

        if (!product){
            return res.status(404).send({error: "Producto no encontrado"})
        }

        // Actualizar
        await product.update(req.body)
        const updated_product = await product.save()
        res.send({data: updated_product})
        
    } catch (error){
        console.log(error)
        res.status(500).send({error: "Error interno"})
    }
}


export const updateAvailable = async (req: Request, res: Response) => {

    const { id } = req.params

    try{
        const product = await Product.findByPk(id)

        if (!product){
            return res.status(404).send({error: "Producto no encontrado"})
        }

        // Actualizar
        product.available = !product.dataValues.available
        const updated_product = await product.save()
        res.send({data: updated_product})
        
    } catch (error){
        console.log(error)
        res.status(500).send({error: "Error interno"})
    }
}

export const removeProduct = async (req: Request, res: Response) => {
    const {id} = req.params

    try{
        const product = await Product.findByPk(id)

        if (!product){
            return res.status(404).send({error: "Producto no encontrado"})
        }

        // Eliminar
        product.destroy()
        
        res.send({data: {
            deleted: true
        }})

    } catch (error){
        console.log(error)
        res.status(500).send({error: "Error interno"})
    }
}