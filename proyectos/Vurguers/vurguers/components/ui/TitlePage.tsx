import React, { ReactNode } from 'react'

export const TitlePage = ({children}: {children: ReactNode}) => {
  return (
    <h1
    className="text-2xl my-5 ml-2 font-bold">
        {children}
    </h1>
  )
}
