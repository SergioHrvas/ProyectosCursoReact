import { useState, useEffect } from 'react'
import type { CartItem } from '../types'

function useCart() {
    // Carrito inicial (recuperamos de localStorage)
    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')

        // Comprobamos si hay algo
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    //Estados
    const [cart, setCart] = useState(initialCart())

    // Guaramos persistencia de datos
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // Si fuese una API
    /*
    const [data, setData] = useState([])
  
    useState(() => {
      setData(db)
    }, [])
    */


    return {
        cart,
    }
}

export default useCart