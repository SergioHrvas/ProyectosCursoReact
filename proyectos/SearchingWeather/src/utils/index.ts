export const KelvinToCelsius = (temp: number) => {
    const kelvin = 273.15;

    return parseInt((temp - kelvin).toString())
}