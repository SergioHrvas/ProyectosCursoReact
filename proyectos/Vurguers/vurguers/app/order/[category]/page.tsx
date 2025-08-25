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
    <div>{params.category}</div>
  )
}
