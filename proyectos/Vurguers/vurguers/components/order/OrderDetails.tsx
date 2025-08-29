import { useStore } from "@/src/store"
import { OrderEntry } from "@/src/types"
import { formatCurrency } from "@/src/utils"
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/16/solid"

type OrderDetailsProps = {
    entry: OrderEntry
}


export const OrderDetails = ({ entry }: OrderDetailsProps) => {
    const { incEntryQuantity, decEntryQuantity, removeFromOrder} = useStore()

    return (
        <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{entry.name} </p>

                    <button
                        type="button"
                        onClick={() => removeFromOrder(entry.id)}
                    >
                        <XCircleIcon className="text-red-600 h-8 w-8 cursor-pointer" />
                    </button>
                </div>
                <p className="text-2xl text-emerald-700 font-black">
                    {formatCurrency(entry.price)}
                </p>
                <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => decEntryQuantity(entry.id)}
                    >
                        <MinusIcon className="h-6 w-6" />
                    </button>

                    <p className="text-lg font-black ">
                        {entry.quantity}
                    </p>

                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => incEntryQuantity(entry.id)}
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                </div>
                <p className="text-xl font-black text-gray-700">
                    Subtotal: {''} {formatCurrency(entry.subtotal)}
                    <span className="font-normal">

                    </span>
                </p>
            </div>
        </div>
    )
}
