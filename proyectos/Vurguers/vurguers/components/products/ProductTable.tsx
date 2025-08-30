import { ProductExtended } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";

export default function ProductTable({products}: {products: ProductExtended[]}) {
    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-10">
            <div className="mt-8 flow-root ">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Producto
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Precio
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Categoría
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Acciones</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map(product => 
                                    (<tr key={product.id}>
                                        <td className="whitespace-nowrap font-bold py-4 px-3 text-gray-800 sm:pl-0">{product.name}</td>
                                        <td className="whitespace-nowrap py-4 px-3 text-emerald-800">{formatCurrency(product.price)}</td>
                                        <td className="whitespace-nowrap py-4 px-3 text-gray-600">{product.category.name}</td>
                                        <td className="relative whitespace-nowrap py-4 px-3 text-sm sm:pr-0">
                                            <Link className="text-green-700 font-bold hover:text-green-950" href={`/admin/products/${product.id}/edit`}>Editar <span className="sr-only">, {product.name}</span></Link>
                                        </td>
                                    </tr>)
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
