import { z } from 'zod'

export const CategoriesSchema = z.object({
    drinks: z.array(
        z.object({
            strCategory: z.string()
        })
    )
})


export const SearchParamsSchema = z.object({
    ingredient: z.string(),
    category: z.string()
})


export const RecipeSchema = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string(),
})

export const RecipesSchema = z.object({
    drinks: z.array(
        RecipeSchema
    )
})