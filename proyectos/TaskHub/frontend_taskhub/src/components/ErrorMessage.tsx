import type { PropsWithChildren } from "react"

export const ErrorMessage = ({children}: PropsWithChildren) => {
  return (
    <p className="bg-red-700 w-max text-white uppercase text-sm font-bold p-3 text-center">{children}</p>
  )
}
