import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

type CategoryIconProps = {
  category: Category
}

export const CategoryIcon = ({category} : CategoryIconProps ) => {
  return (
    <div className={` flex items-center gap-4 w-full border-t text-white border-slate-600 p-3 last-of-type:border-b`}>
      <div className="w-16 h-16 relative">
        <Image src={`/icon_${category.slug}.svg`}
        alt={`Imagen de ${category.name}`}
        fill
      />
      </div>

      <p className="font-bold text-2xl">
        <Link href={`/order/${category.slug}`}>{category.name}</Link>
      </p>
    </div>
  )
}
