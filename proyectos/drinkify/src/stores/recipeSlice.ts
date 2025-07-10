import { create, type StateCreator } from "zustand"
import { getCategories, getRecipe, getRecipes } from "../services/RecipesServices"
import type { Categories, SearchParams, Recipe, RecipeInfo} from "../types"
import { createFavouriteSlice, type FavouriteSliceType } from "./favouriteSlice"

export type RecipeSliceType = {
    categories: Categories,
    recipes: Recipe[],
    selectedRecipe: RecipeInfo,
    modal: boolean,
    fetchCategories: () => Promise<void>,
    fetchRecipes: (params: SearchParams) => Promise<void>
    fetchRecipe: (id: Recipe['idDrink']) => Promise<void>,
    closeModal: () => void
}

export const createRecipeSlice: StateCreator<RecipeSliceType & FavouriteSliceType, [], [], RecipeSliceType> = (set,get,api) => ({
    categories: {
        drinks: []
    },

    selectedRecipe: {} as RecipeInfo,

    recipes: [],


    modal: false,

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

        const favourites = get().favRecipes
        const indexFav = favourites.findIndex(f => f.idDrink === id)

        //Compruebo si la tengo en favoritos
        if(indexFav >= 0){
            set({
                selectedRecipe: favourites[indexFav],
                modal: true
            })
        }
        else{
            const recipe = await getRecipe(id);
            set({
                selectedRecipe: recipe?.data,
                modal: true
            })
        }
        
    },
    closeModal(){
        set({
            modal: false,
            selectedRecipe: {} as RecipeInfo
        })
    }
})