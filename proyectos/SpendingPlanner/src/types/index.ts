type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Gasto una vez se almacena (con ID)
export type Expense = {
    id: string,
    amount: number,
    name: string,
    category: string,
    date: Value
}

// Gasto temporal (sin ID)
export type ExpenseState = Omit<Expense, 'id'>

export type Category = {
    id: string,
    name: string,
    icon: string
}