import {create} from 'zustand'
import { createRecipeSlice } from './recipeSlice'
import type {RecipeSliceType} from './recipeSlice'

export const useAppStore = create<RecipeSliceType> ( (...a) => ( { // pasamos todos los argumentos (set, get...) a los demás 
    ...createRecipeSlice(...a) // los tres puntos para que tome una copia
}))