import type { StateCreator } from "zustand"

export type Notification = {
    text: string,
    error: boolean,
    show: boolean
}


export type NotificationSliceType = {
    notification: Notification
}

export const notificationSlice: StateCreator<NotificationSliceType> = (set,get) => ({
    notification: {
        text: "aaa",
        error: false,
        show: true
    }
})