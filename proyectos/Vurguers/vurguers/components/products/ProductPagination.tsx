import Link from "next/link"

const limitPages = 2

type ProductPaginationProps = {
    currentPage: number,
    maxPage: number,
    search: string
}
export const ProductPagination = ({ currentPage, maxPage, search}: ProductPaginationProps) => {

    const pages = Array.from({length: maxPage}, (_, i) => i+1)

    return (
        <nav className='flex gap-3 justify-center py-10 text-lg'>
            {currentPage > 1 &&
                    <Link href={`/admin/products?page=${currentPage - 1}${search ? `&search=${search}` : ""}`}>Anterior</Link>
            }

            {pages.map(page => (page == 1 || page == maxPage || (page <= currentPage + limitPages && page >= currentPage - limitPages))
                && (
                <Link 
                    href={`/admin/products?page=${page}${search ? `&search=${search}` : ""}`}
                    key={page}
                    className={currentPage === page ? "text-xl text-green-800" : ""}
                >
                    {page}
                </Link>
            ))}

            {currentPage < maxPage && 
                <Link href={`/admin/products?page=${currentPage + 1}${search ? `&search=${search}` : ""}`}>Siguiente</Link>
            }
        </nav>
    )
}
