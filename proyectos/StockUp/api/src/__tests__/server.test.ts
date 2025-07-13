import request from 'supertest'
import server, {connectionDB} from '../server'
import db from '../config/db'

/*describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe("Hola mundo")

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe("Hola Mundo")


    })
})*/

jest.mock('../config/db')

describe("connection DB", () => {
    it('should handle db connection errors', async () => {
        //crea una funcion simulada para observar db.authenticate y simulamos error con mock
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error("Hubo un error en la conexión con la BD"))
        
        const consoleSpy = jest.spyOn(console, 'log')

        await connectionDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Hubo un error en la conexión con la BD")
        )
    })
})