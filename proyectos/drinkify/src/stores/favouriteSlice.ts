import type { StateCreator } from "zustand";
import type { RecipeInfo } from "../types";
import { createRecipeSlice, type RecipeSliceType } from "./recipeSlice";

export type FavouriteSliceType = {
    favRecipes: RecipeInfo[],
    manageOnFavourites: (recipe: RecipeInfo) => void,
    isFavouriteRecipe: (id: RecipeInfo['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavouriteSlice: StateCreator<FavouriteSliceType & RecipeSliceType, [], [], FavouriteSliceType> = (set, get, api) => ({
    favRecipes: [],

    manageOnFavourites: (recipe: RecipeInfo) => {
        get().closeModal()

        if(get().isFavouriteRecipe(recipe.idDrink)){
            set((state) => ({
                favRecipes: state.favRecipes.filter(r => r.idDrink !== recipe.idDrink)
            }))
            
        } else {
        
            //Primera forma de hacerlo:
            /*set({
                favRecipes: [
                    ...favRecipes,
                    recipe
                ]
            })*/

            //Segunda forma de hacerlo:
            set((state) => ({
                favRecipes: [
                    ...state.favRecipes,
                    recipe
                ]
            }))
        }


        localStorage.setItem('favRecipes', JSON.stringify(get().favRecipes))
    },
    
    isFavouriteRecipe: (id: RecipeInfo['idDrink']) => {
        const {favRecipes} = get()
        return favRecipes.some(r => r.idDrink === id)
    },

    loadFromStorage: () => {
        const localFavourites = localStorage.getItem('favRecipes');

        if(localFavourites)
            set({
                favRecipes: JSON.parse(localFavourites)
            })
        console.log("MIRO", get().favRecipes)
    }
})
