import type { StateCreator } from "zustand";
import type { RecipeInfo } from "../types";
import { type RecipeSliceType } from "./recipeSlice";
import { type NotificationSliceType } from "./notificacionSlice";

export type FavouriteSliceType = {
    favRecipes: RecipeInfo[],
    manageOnFavourites: (recipe: RecipeInfo) => void,
    isFavouriteRecipe: (id: RecipeInfo['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavouriteSlice: StateCreator<FavouriteSliceType & RecipeSliceType & NotificationSliceType, [], [], FavouriteSliceType> = (set, get) => ({
    favRecipes: [],

    manageOnFavourites: (recipe: RecipeInfo) => {


        if(get().isFavouriteRecipe(recipe.idDrink)){
            set((state) => ({
                favRecipes: state.favRecipes.filter(r => r.idDrink !== recipe.idDrink)
            }))

            get().showNotification({
                text: 'Receta eliminada de favoritos.',
                error: false
            })
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
            get().showNotification({
                text: 'Receta agregada a favoritos.',
                error: false
            })
        }

        get().closeModal()
        
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
    }
})
