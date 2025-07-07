import styles from "./App.module.css"
import { Alert } from "./components/Alert/Alert"
import { Form } from "./components/Form/Form"
import { Spinner } from "./components/Spinner/Spinner"
import { WeatherInfo } from "./components/WeatherInfo/WeatherInfo"
import useWeather from "./hooks/useWeather"

function App() {

  const {weather, loading, fetchWeather, hasWeather, notFound} = useWeather()

  return (
    <>
      <h1 className={styles.title}>SearchingWeather</h1>
      <div className={styles.container}>
          <Form fetchWeather={fetchWeather} />
           { loading && <Spinner/> }
           {hasWeather && 
            <WeatherInfo weather={weather}/>
          }
          {notFound && <Alert>Ciudad no encontrada en el país seleccionado</Alert>}
      </div>
    </>
  )
}

export default App
