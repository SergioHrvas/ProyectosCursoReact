import z from "zod";
import { CategoriesSchema, RecipeInfoSchema, RecipeSchema, SearchParamsSchema } from '../schemas/recipesSchemas'

export type Categories = z.infer<typeof CategoriesSchema>

export type SearchParams = z.infer<typeof SearchParamsSchema>

export type Recipe = z.infer<typeof RecipeSchema>

export type RecipeInfo = z.infer<typeof RecipeInfoSchema>