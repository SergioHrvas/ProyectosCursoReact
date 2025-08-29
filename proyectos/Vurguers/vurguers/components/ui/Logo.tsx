import Image from 'next/image'
import React from 'react'

export const Logo = () => {
  return (
    <div className='flex justify-center mt-3'>
        <div className='relative w-56 h-56'>
            <Image fill src="/logo.svg" alt="Logo de Vurguers"></Image>
        </div>
    </div>
  )
}
