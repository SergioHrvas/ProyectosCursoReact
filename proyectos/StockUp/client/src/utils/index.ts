export const formatCurrency = (quantity: number) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(quantity)
}

export const toBoolean = (str: string): boolean => {
    return str.toLowerCase() === "true"
}