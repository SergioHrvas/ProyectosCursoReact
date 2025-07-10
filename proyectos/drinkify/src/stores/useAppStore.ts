import {create} from 'zustand'
import { createRecipeSlice } from './recipeSlice'
import type {RecipeSliceType} from './recipeSlice'
import { createFavouriteSlice, type FavouriteSliceType } from './favouriteSlice'
import { notificationSlice, type NotificationSliceType } from './notificacionSlice'

export const useAppStore = create<RecipeSliceType & FavouriteSliceType & NotificationSliceType> ( (...a) => ( { // pasamos todos los argumentos (set, get...) a los demás 
    ...createRecipeSlice(...a), // los tres puntos para que tome una copia
    ...createFavouriteSlice(...a),
    ...notificationSlice(...a)
}))