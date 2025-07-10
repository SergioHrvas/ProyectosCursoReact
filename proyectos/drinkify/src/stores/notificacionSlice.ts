import type { StateCreator } from "zustand"
import type { FavouriteSliceType } from "./favouriteSlice"

export type Notification = {
    text: string,
    error: boolean,
    show: boolean
}


export type NotificationSliceType = {
    notification: Notification,
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void,
    hideNotification: () => void

}

export const createNotificationSlice: StateCreator<NotificationSliceType & FavouriteSliceType, [], [], NotificationSliceType> = (set, get) => ({
    notification: {
        text: "",
        error: false,
        show: false
    },

    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => {
        set({
            notification: {
                ...payload,
                show: true
            }
        })

        setTimeout(() => {
            get().hideNotification()
        }, 5000);
    },

    hideNotification: () => {
        set({
            notification: {
                text: "",
                show: false,
                error: false
            }
        })
    }

})