import { formatCurrency } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from 'next/image'
import { AddToOrderButton } from "./AddToOrderButton"

type ProductCardProps = {
  product: Product
}

export const ProductCard = ({product} : ProductCardProps) => {
  return (
    <div className="border bg-white flex flex-col">

      <Image src={`/products/${product.image}.png`} alt={`Foto de ${product.name}`} width={500} height={600}/>
      <div className="p-5 flex-grow flex flex-col justify-between">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-emerald-700">
          {formatCurrency(product.price)}
        </p>
      </div>

      <AddToOrderButton product={product}/>
    </div>
  )
}
