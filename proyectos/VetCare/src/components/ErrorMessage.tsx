import type { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export const ErrorMessage = ({children}: ErrorMessageProps) => {
  return (
    <p className='bg-red-700 text-white text-center font-bold rounded-lg my-4 p-3 text-sm'>
        {children}
    </p>
  )
}
