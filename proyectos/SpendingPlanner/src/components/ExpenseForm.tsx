import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';

import { categories } from '../data/categories'
import type { ExpenseState } from '../types';

import DatePicker from 'react-date-picker';
import type { Value } from 'react-calendar/dist/shared/types.js';

// Importamos dependencias de estilo
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { ErrorMessage } from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';

export const ExpenseForm = () => {

    const [expense, setExpense] = useState<ExpenseState>({
        amount: 0,
        category: '',
        name: '',
        date: new Date
    })

    const [error, setError] = useState('')

    const { dispatch, state } = useBudget()


    useEffect(() => {
        if(state.expEditingId){
            const editingExpense = state.expenses.filter(exp => exp.id === state.expEditingId)[0]
            setExpense(editingExpense)
        }
        
    }, [state.expEditingId])


    const handleChangeDate = (value: Value) => {
        setExpense(
            {
            ...expense,
            date: value   
            }
        )
    }
    
    // Forma de hacerlo clásica
        /*
        const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
            if(e.target.name === "expenseName"){
                setExpense({
                    ...expense,
                    name: e.target.value
                })
            } else if(e.target.name === "expenseAmount"){
                setExpense({
                    ...expense,
                    amount: +e.target.value
                })
            } else if(e.target.name === "expenseCategory"){
                setExpense({
                    ...expense,
                    category: e.target.value
                })
            }
        }
        */

    //Otra forma (más escalable y profesional)
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name]: isAmountField? +value : value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            // Validamos
            if(Object.values(expense).includes('')) {
                setError("Todos los campos son obligatorios.")
                return 
            }

            // Agregamos o actualizamos el gasto
            if(state.expEditingId=="")
                dispatch({
                    type: "add-expense", 
                    payload: {
                        expense
                    }
                }
            )
            else{
                dispatch({
                    type: "edit-expense",
                    payload: {
                        expense: {
                            ...expense,
                            id: state.expEditingId,
                        }
                    }
                })
            }
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-lime-500">
                {state.expEditingId==="" ? "Añadir gasto" : "Editar gasto"}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}


            <div className="flex flex-col gap-2">
                <label
                    htmlFor="name"
                    className="text-xl"
                >
                    Nombre
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={expense.name}
                    onChange={handleChange}
                    placeholder="Introduzca el nombre del gasto"
                    className="bg-slate-100 p-2 rounded-lg border border-slate-400"/>
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"   
                >
                    Cantidad
                </label>
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    onChange={handleChange}
                    value={expense.amount}
                    placeholder="Introduzca la cantidad gastada"
                    className="bg-slate-100 p-2 rounded-lg border border-slate-400"/>
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl"   
                >
                    Categoría
                </label>
                <select
                    id="category"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                    className="bg-slate-100 p-2 rounded-lg border border-slate-400">
                    <option value="">-- Seleccione --</option>
                    { categories.map(category => (
                        <option 
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="date"
                    className="text-xl"   
                >
                    Fecha del gasto: 
                </label>
                <DatePicker 
                    id="date"
                    value={expense.date}
                    onChange={handleChangeDate}
                    className="bg-slate-100 p-2 border-0"
                />
            </div>
            <input
                type="submit"
                value={state.expEditingId === "" ? "Añadir gasto" : "Editar gasto"}
                className='p-3 bg-lime-700 cursor-pointer w-full text-white font-black rounded-lg uppercase'
            />
        </form>
    )
}
