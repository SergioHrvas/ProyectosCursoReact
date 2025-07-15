import api from '../lib/axios'
import { CategoriesSchema, RecipeInfoSchema, RecipesSchema } from "../schemas/recipesSchemas"
import type { Recipe, SearchParams } from "../types"

export const getCategories = async () => {
    const url = "/list.php?c=list"
    const {data} = await api(url)
    const result = CategoriesSchema.safeParse(data)

    if (result.success) {
        return result.data
    }
}

export const getRecipes = async (params: SearchParams) => {
    const urlIng = `/filter.php?i=${params.ingredient}`
    const urlCat = `/filter.php?&c=${params.category}`
    const {data : dataIng} = await api(urlIng)
    const {data : dataCat} = await api(urlCat)
    const result1 = RecipesSchema.safeParse(dataIng)
    const result2 = RecipesSchema.safeParse(dataCat)

    const result = result1.data?.drinks.filter(d => result2.data?.drinks.some(d2 => d2.idDrink === d.idDrink))
    
    if(result1.success && result2.success) {
        return result
    }
}


export const getRecipe = async(id: Recipe['idDrink']) => {
    const url = `/lookup.php?i=${id}`

    const {data} = await api(url)

    const result = RecipeInfoSchema.safeParse(data.drinks[0])

    if(result.success){
        return result
    }
}