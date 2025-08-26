import { ProductCard } from "@/components/products/ProductCard"
import { prisma } from "@/src/lib/prisma"

type OrderPageProps = {
  params: {
    category: string
  }
}

async function getProducts(category: string){
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })

  return products
}

export default async function OrderPage({params}: OrderPageProps) {
  const products = await getProducts(params.category)

  return (
    <>
      <h1
        className="text-2xl my-10 ml-2 font-bold">
          Selecciona los productos para tu pedido
        </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start p-2">
        {products.map(product => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </>
  )
}
