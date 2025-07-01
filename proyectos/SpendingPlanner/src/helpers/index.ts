export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'}).format(amount)
}

export const formatDate = (date: string): string => {
    const dateObject = new Date(date)
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('es-ES', options).format(dateObject)
}