import type { Weather } from "../../hooks/useWeather"
import { KelvinToCelsius } from "../../utils"
import styles from "./WeatherInfo.module.css"

type WeatherInfoProps = {
    weather: Weather
}

export const WeatherInfo = ({weather}: WeatherInfoProps) => {
  return (
    <div className={styles.container}>
        <h2>Clima de: {weather.name}</h2>
        <p className={styles.temp}>{KelvinToCelsius(weather.main.temp)}&deg;C</p>
        <div className={styles.temps}>
            <p className={styles.temp_info}>Min: <span className={styles.temp_number}>{KelvinToCelsius(weather.main.temp_min)}&deg;C</span></p>
            <p className={styles.temp_info}>Max: <span className={styles.temp_number}>{KelvinToCelsius(weather.main.temp_max)}&deg;C</span></p>
        </div>
    </div>
  )
}
