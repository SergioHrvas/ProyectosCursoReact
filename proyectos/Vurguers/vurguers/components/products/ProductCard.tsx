import { formatCurrency } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from 'next/image'

type ProductCardProps = {
  product: Product
}

export const ProductCard = ({product} : ProductCardProps) => {
  return (
    <div className="border bg-white">

      <Image src={`/products/${product.image}.png`} alt={`Foto de ${product.name}`} width={500} height={600}/>
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-emerald-700">
          {formatCurrency(product.price)}
        </p>
      </div>

      <button
        type="button"
        className="bg-slate-800 hover:bg-slate-500 text-white font-bold w-full mt-5 p-3 uppercase cursor-pointer"
      >Añadir</button>
    </div>
  )
}
