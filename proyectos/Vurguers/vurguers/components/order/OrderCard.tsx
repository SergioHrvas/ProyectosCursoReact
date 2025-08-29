import { completeOrder } from "@/actions/complete-order-action";
import { OrderExtended } from "@/src/types";
import { formatCurrency } from "@/src/utils";

export default function OrderCard({ order }: { order: OrderExtended }) {

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4 flex flex-col"
        >
            <p className='text-2xl font-medium text-gray-900'>Cliente: {order.name} </p>
            <dl className="mt-6 space-y-4 flex-grow">
                {order.orderProducts.map(product => (
                    <div
                        key={product.id}
                        className="flex items-center gap-2 border-t border-gray-300 pt-4"
                    >
                        <dt className="flex items-center text-sm text-gray-500">
                            <span>({product.quantity})</span>
                        </dt>
                        <dd className="px-2 text-sm font-medium text-gray-900">
                            {product.product.name}
                        </dd>

                        <dt className="flex items-center text-emerald-700 font-bold">
                            <span>{formatCurrency(product.product.price)}</span>
                        </dt>
                    </div>
                ))}

            </dl>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-xl font-bold text-gray-900">Total a Pagar: </dt>
                <dd className="text-xl font-bold text-gray-900">{formatCurrency(order.total)}</dd>
            </div>
            <form action={completeOrder}>
                <input
                    type="hidden"
                    value={order.id}
                    name="order_id"
                >
                </input>
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Marcar Orden Completada'
                />
            </form>
        </section>
    )
}
