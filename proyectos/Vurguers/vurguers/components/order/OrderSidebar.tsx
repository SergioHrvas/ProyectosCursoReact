import {prisma} from '@/src/lib/prisma'
import { CategoryIcon } from '../ui/CategoryIcon'
import { Logo } from '../ui/Logo'

async function getCategories(){
  return await prisma.category.findMany()
}

export const OrderSidebar = async () => {
  const categories = await getCategories()

  return (
    <aside className="md:w-72 md:h-screen bg-slate-800">
      <Logo/>
      <nav className='mt-3'>
        {categories.map(category => (
          <CategoryIcon
            key={category.id}
            category={category}
          />
        ))}
      </nav>

    </aside>
  )
}
