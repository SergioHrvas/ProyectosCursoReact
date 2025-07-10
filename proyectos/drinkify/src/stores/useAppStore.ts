import {create} from 'zustand'
import { createRecipeSlice } from './recipeSlice'
import type {RecipeSliceType} from './recipeSlice'
import { createFavouriteSlice, type FavouriteSliceType } from './favouriteSlice'
import { createNotificationSlice, type NotificationSliceType } from './notificacionSlice'
import { createGenerateAISlice, type GenerateAISliceType } from './generateAISlice'

export const useAppStore = create<RecipeSliceType & FavouriteSliceType & NotificationSliceType & GenerateAISliceType> ( (...a) => ( { // pasamos todos los argumentos (set, get...) a los demás 
    ...createRecipeSlice(...a), // los tres puntos para que tome una copia
    ...createFavouriteSlice(...a),
    ...createNotificationSlice(...a),
    ...createGenerateAISlice(...a)
}))