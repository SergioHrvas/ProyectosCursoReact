import { ProductCard } from "@/components/products/ProductCard"
import { TitlePage } from "@/components/ui/TitlePage"
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
  const { category } = await params;
  const products = await getProducts(category)

  return (
    <>
      <TitlePage> Selecciona los productos para tu pedido </TitlePage>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-stretch p-2">
        {products.map(product => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </>
  )
}
