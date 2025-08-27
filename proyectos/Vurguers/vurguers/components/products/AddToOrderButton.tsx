"use client"

import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type AddToOrderButtonProps = {
    product: Product
}

export const AddToOrderButton = ({product} : AddToOrderButtonProps) => {

    const {addToOrder} = useStore()

    return (
        <button
            type="button"
            onClick={() => addToOrder(product)}
            className="mt-auto bg-slate-800 hover:bg-slate-500 text-white font-bold w-full p-3 uppercase cursor-pointer"
        >Añadir
        </button>
    )
}
