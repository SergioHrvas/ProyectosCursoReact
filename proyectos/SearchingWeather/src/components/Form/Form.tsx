import { countries } from "../../data/db"
import type { SearchType } from "../../types"
import { Alert } from "../Alert/Alert"
import styles from "./Form.module.css"

import { useState, type ChangeEvent, type FormEvent } from "react"

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

export const Form = ({fetchWeather} : FormProps) => {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState("")
  


    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch(
            {
                ...search,
                [e.target.name] : e.target.value
            }
        )
    }
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(search).includes('')){
            setAlert("Deben estar todos los campos rellenos")
            return
        }



        setAlert('')
        fetchWeather(search)


    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {alert && <Alert>{alert}</Alert>}
            
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input 
                    id="city" 
                    type="text" 
                    name="city"
                    value={search.city}
                    onChange={handleChange}
                    placeholder="Introduzca la ciudad"/>
            </div>

            <div className={styles.field}>
                <label htmlFor="country" >País:</label>
                <select
                    id="country"
                    name="country"
                    onChange={handleChange}
                    value={search.country}
                >
                    <option
                        value="">-- Seleccione el país --</option>
                    {countries.map(country => 
                        <option key={country.code} value={country.code}>{country.name}</option>
                    )}
                </select>        
            </div>

            <input type="submit" className={styles.submit} value="Buscar clima"/>
        </form>
    )
}
