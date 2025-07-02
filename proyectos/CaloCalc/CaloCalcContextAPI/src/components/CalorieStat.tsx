type CalorieStatProps = {
    quantity: number,
    text: string
}

export const CalorieStat = ({quantity, text}: CalorieStatProps) => {
  return (
    <p className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'>
        <span className='font-black text-6xl'>
            {quantity}    
        </span>
        {text}
    </p>
  )
}
