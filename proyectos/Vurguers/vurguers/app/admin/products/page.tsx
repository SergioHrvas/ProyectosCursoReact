import { ProductPagination } from "@/components/products/ProductPagination";
import { ProductSearchForm } from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import { TitlePage } from "@/components/ui/TitlePage";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

const TAKES_PRODUCT = 10;

async function getProductsCount(search: string){
    return await prisma.product.count({
        where: search
            ? {
                name: {
                    contains: search,
                    mode: "insensitive"
                }
            }
            : undefined
    })
}
async function getProducts(page: number, search: string){
    
    return await prisma.product.findMany({
        take: TAKES_PRODUCT,
        skip: TAKES_PRODUCT * (page - 1),
        include: {
            category: true
        },
        where: search
            ? {
                name: {
                    contains: search,
                    mode: "insensitive"
                }
            }
            : undefined
    })
}

export default async function ProductsPage({searchParams}: {searchParams: {page: string, search: string}}) {

    const page = searchParams.page ? +searchParams.page : 1
    const search = searchParams.search

    if(page < 1) redirect(`/admin/products?page=1${search ? `&search=${search}` : ""}`)
    const [products, productsCount ] = await Promise.all([await getProducts(page, search), await getProductsCount(search)])
    const maxPage = Math.ceil(productsCount/TAKES_PRODUCT)

    if(page > maxPage) redirect(`/admin/products?page=${maxPage}${search ? `&search=${search}` : ""}`)

    return (
        <>
            <TitlePage>Administrar productos</TitlePage>

            <div className="flex justify-between">
                <Link className="bg-slate-700 px-6 py-2 ml-2 rounded-md text-white font-bold" href="/admin/product/create">Crear producto</Link>
                
                <ProductSearchForm/>
            </div>
            {products.length == 0 
            ? <p className="text-center text-lg text-gray-800 mt-10 w-full bg-white py-10">No hay productos registrados</p> 
            : <ProductTable products={products}/>
            }

            <ProductPagination currentPage={page} maxPage={maxPage} search={search}/>
        </>
    );
}
