import type { PropsWithChildren } from "react"


export const ErrorMessage = ({children} : PropsWithChildren) => {
  return (
    <div className='bg-red-700 text-xl p-2 mx-auto text-white font-bold w-full text-center rounded-lg'>
        {children}
    </div>
  )
}
