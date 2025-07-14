import { PostProductSchema, ProductSchema, ProductsSchema, type Product } from "../types" 
import { number, parse, pipe, safeParse, string, transform } from "valibot"
import axios from "axios"
import { toBoolean } from "../utils";


type ProductData = {
     [k: string]: FormDataEntryValue;
}

export async function addProduct(data: ProductData) {
    try{
        // Validamos los datos enviados
        const dataParsed = safeParse(PostProductSchema, {...data, price: +data.price})
       
        if(dataParsed.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            
            await axios.post(url, dataParsed.output)
            
        } else{
            throw new Error("Error en la validez de los datos")
        }
    }
    catch (error) {
        console.log(error)
    }
}

export async function getProducts(){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data : { data }} = await axios(url)
        
        const result = safeParse(ProductsSchema, data)
        if (result.success) {
            return result.output
        } else {
            throw new Error("Error en la validez de la respuesta")
        }
    }
    catch (error) {
        console.log(error)
    }
}

export async function getProduct(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data : { data }} = await axios(url)
        
        const result = safeParse(ProductSchema, data)
        if (result.success) {
            return result.output
        } else {
            throw new Error("Error en la validez de la respuesta")
        }
    }
    catch (error) {
        console.log(error)
    }
}

export async function editProduct(id: Product['id'], data: ProductData){
    try{

        const numberSchema = pipe(string(), transform(Number), number())

        // Validamos los datos enviados
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(numberSchema, data.price),
            available: toBoolean(data.available.toString())
        })
       
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            
            await axios.put(url, result.output)
            
        } else{
            throw new Error("Error en la validez de los datos")
        }
    }
    catch (error) {
        console.log(error)
    }
}


export async function deleteProduct(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    }
    catch (error) {
        console.log(error)
    }
}


export async function changeAvailable(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    }
    catch (error) {
        console.log(error)
    }
}