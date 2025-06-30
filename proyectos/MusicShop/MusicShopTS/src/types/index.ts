export type Instrument = {
    id: number,
    image: string,
    description:string,
    name:string,
    price: number
}

export type CartItem = Instrument & {
    count: number
}

// export type InstrumentId = Instrument['id']