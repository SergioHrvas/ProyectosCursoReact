import server from './server'
import colors from 'colors'

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(colors.magenta.underline(`REST API escuchando en el puerto ${PORT}`))
})