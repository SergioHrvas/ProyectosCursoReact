import OrderCard from '@/components/order/OrderCard'
import { TitlePage } from '@/components/ui/TitlePage'
import { prisma } from '@/src/lib/prisma'
import React from 'react'

async function getPendingOrders(){
  return await prisma.order.findMany({
    where: {
      ready: false
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }

  })
}

export default async function AdminOrdersPage() {
  const orders = await getPendingOrders()
  return (
    <>
      <TitlePage> Administración de pedidos </TitlePage>
      {orders.length ? 
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 mt-5'>
          {orders.map(order => <OrderCard key={order.id} order={order}/>)}
        </div> 
        : <p className='text-center text-xl italic'>No hay órdenes</p>}
    </>
  )
}
