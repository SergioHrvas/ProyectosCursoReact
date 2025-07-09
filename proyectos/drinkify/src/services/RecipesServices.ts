import axios from "axios"
import { CategoriesSchema, RecipesSchema } from "../schemas/recipesSchemas"
import type { SearchParams } from "../types"

export const getCategories = async () => {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    const {data} = await axios(url)
    const result = CategoriesSchema.safeParse(data)

    if (result.success) {
        return result.data
    }
}

export const getRecipes = async (params: SearchParams) => {
    const urlIng = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${params.ingredient}`
    const urlCat =  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?&c=${params.category}`
    const {data : dataIng} = await axios(urlIng)
    const {data : dataCat} = await axios(urlCat)
    const result1 = RecipesSchema.safeParse(dataIng)
    const result2 = RecipesSchema.safeParse(dataCat)

    const resultado = result1.data?.drinks.filter(d => result2.data?.drinks.some(d2 => d2.idDrink === d.idDrink))
    
    if(result1.success && result2.success) {
        return resultado
    }
}