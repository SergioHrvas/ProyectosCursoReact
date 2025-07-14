import type { PropsWithChildren } from "react"

export const Error = ({children} : PropsWithChildren) => {
  return (
    <div className="bg-red-700 text-white p-2 uppercase font-bold rounded-md text-center my-3">{children}</div>
  )
}
