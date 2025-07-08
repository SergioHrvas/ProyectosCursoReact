import type { ReactNode } from 'react'

export const Alert = ({children} : {children: ReactNode}) => {
  return (
    <div className="alerta">{children}</div>
  )
}
