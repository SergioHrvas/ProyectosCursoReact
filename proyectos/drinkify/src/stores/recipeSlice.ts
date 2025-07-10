import type { StateCreator } from "zustand"
import { getCategories, getRecipe, getRecipes } from "../services/RecipesServices"
import type { Categories, SearchParams, Recipe } from "../types"

export type RecipeSliceType = {
    categories: Categories,
    recipes: Recipe[],
    fetchCategories: () => Promise<void>,
    fetchRecipes: (params: SearchParams) => Promise<void>
    fetchRecipe: (id: Recipe['idDrink']) => Promise<void>
}

export const createRecipeSlice: StateCreator<RecipeSliceType> = (set, get, api) => ({
    categories: {
        drinks: []
    },

    recipes: [],

    fetchCategories: async () => {
        const cats = await getCategories()
        set({
            categories: cats
        })
    },

    fetchRecipes : async (params: SearchParams) => {
        const recipes = await getRecipes(params)
        set({
            recipes: recipes
        })
    },

    fetchRecipe : async (id: Recipe['idDrink']) => {
        const recipe = await getRecipe(id);
    }
})