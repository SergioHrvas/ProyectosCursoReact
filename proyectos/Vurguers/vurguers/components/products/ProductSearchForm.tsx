"use client"
import { SearchProductFormSchema } from "@/src/schema"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"

export const ProductSearchForm = () => {
    const handleSearch = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }

        const result = SearchProductFormSchema.safeParse(data)

        if(result.success){
            redirect(`/admin/products?search=${result.data.search}`)
        }
        else{
            result.error.issues.forEach(issue => toast.error(issue.message))
        }
    }

    return (
        <form className="flex items-center"
            action={handleSearch}>
            <input
                className="bg-white border border-gray-300 p-2 rounded-lg"
                type="text"
                name="search"
                placeholder='Buscar producto' />
            <input
                className="bg-green-700 px-6 py-2 ml-2 rounded-md font-bold text-white cursor-pointer"
                type="submit"
                value="BUSCAR" />
        </form>
    )
}
