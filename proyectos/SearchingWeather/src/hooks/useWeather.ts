import axios from "axios"
import { z } from 'zod'
import type { SearchType } from "../types"
import { useMemo, useState } from "react"
// import {object, string, number, parse} from "valibot"
// import type {InferOutput} from "valibot"

// TYPE GUARDDS
// function isWeatherResponse(weather : unknown) : weather is WeatherType{
//     return (
//         Boolean(weather) && // comprobamos que weather exista
//         typeof(weather) === 'object' && // comprobamos que weather sea un objeto
//         typeof(weather as WeatherType).name === 'string' && //accedemos a cada elemento comprobando su tipo
//         typeof(weather as WeatherType).main.temp === 'number' && 
//         typeof(weather as WeatherType).main.temp_max === 'number' && 
//         typeof(weather as WeatherType).main.temp_min === 'number'
//     )
// }


// ZOD
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

export type Weather = z.infer<typeof Weather> 


// // Valibot
// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number()
//     })
// })

// type Weather = InferOutput<typeof WeatherSchema>

const initialWeather = {
    name: "",
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

export default function useWeather () {

    const [weather, setWeather] = useState<Weather>(initialWeather)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)
    
    const fetchWeather = async (search: SearchType) => {

        const appId = import.meta.env.VITE_API_KEY
        
        setLoading(true)
        setWeather(initialWeather)

        try{
            

            // Obtenemos latitud y longitud
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            
            const {data} = await axios(url)

            //Comprobamos si existe
            if(!data[0]){
                setNotFound(true)
                return
            }
            else{
                setNotFound(false)
            }
            
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            // const {data: result} = await axios(weatherUrl)
            // console.log(result)

            //a. Casteamos el type
            // const {data: weatherResult} = await axios<WeatherType>(weatherUrl)
            // console.log(weatherResult.temp)
            // console.log(weatherResult.name)


            //b. Type Guards
            // const {data: weatherResult} = await axios(weatherUrl)
            // const result = isWeatherResponse(weatherResult)
            // if(result){
            //     console.log(weatherResult.main.temp)
            // }

            //c. Zod
            const {data: weatherResult} = await axios(weatherUrl)
            const result = Weather.safeParse(weatherResult)
            if(result.success){
                setWeather(result.data)
            }
            
            //d. Valibot
            // const {data: weatherResult} = await axios(weatherUrl)
            // const result = parse(WeatherSchema, weatherResult)
            // if(result){
            //     console.log(result.name, result.main.temp)
            // }

        }
        catch (error) {
            console.error(error)
        } finally { //Siempre se ejecuta
            setLoading(false)
        }
    }

    const hasWeather = useMemo(() =>
        weather.name !== ""
    , [weather.name])


    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeather,
    }
}