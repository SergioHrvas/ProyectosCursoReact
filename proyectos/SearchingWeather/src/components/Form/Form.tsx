import { countries } from "../../data/db"
import styles from "./Form.module.css"

export const Form = () => {
  return (
    <form className={styles.form} onSubmit={() => console.log("Submit")}>

        <div className={styles.field}>
            <label htmlFor="city">Ciudad:</label>
            <input 
                id="city" 
                type="text" 
                name="city" 
                placeholder="Introduzca la ciudad"/>
        </div>

        <div className={styles.field}>
            <label htmlFor="country" >País:</label>
            <select
                id="country"
                name="country"
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
