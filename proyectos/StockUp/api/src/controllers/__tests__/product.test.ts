import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {
    it('should return validation errors', async() => {
        const res = await request(server).post('/api/products').send({})
        
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(4)


        expect(res.status).not.toBe(201)
        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty("data")
        expect(res.body.errors).not.toHaveLength(2)
    }),
    it('should validate the price is greater than 0', async() => {
        const res = await request(server).post('/api/products').send({
            name: "Monitor",
            price: 0
        })
        
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(1)


        expect(res.status).not.toBe(201)
        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty("data")
        expect(res.body.errors).not.toHaveLength(2)

    }),
    it('should validate the price is a number and greater than 0', async() => {
        const res = await request(server).post('/api/products').send({
            name: "Monitor",
            price: "hola"
        })
        
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(2)


        expect(res.status).not.toBe(201)
        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty("data")
        expect(res.body.errors).not.toHaveLength(3)

    }),
    it('should create a new product', async () => {
        const res = await request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 30
        })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("data")

        expect(res.status).not.toBe(400)
        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(500)
        expect(res.body).not.toHaveProperty("errors")
    })
})

describe('GET /api/products', () => {
    it('should check if api/products url exists', async() => {
        const response = await request(server).get('/api/products')

        expect(response.status).not.toBe(404)

    })
    it('should return a JSON list of products', async() => {
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.status).not.toBe(500)
        expect(response.body).not.toHaveProperty('errors')
        expect(response.body.data).not.toHaveLength(0)
    })
})

describe('GET /api/products/:id', () => {
    it('should return 404 response for a non-existed product', async() => {
        const productId = 20000;
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('should check if the id is valid', async() => {
        const productId = 'not-valid-url';
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Formato de ID no válido')

    })

    it('should return a JSON of a product', async() => {
        const response = await request(server).get('/api/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(500)
        expect(response.body).not.toHaveProperty('errors')

    })
})

describe('PUT /api/products/:id', () => {

    it('should return 404 response for a non-existed product', async() => {
        const productId = 20000;
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: "Monitor Curvo",
            available: true,
            price: 300
        })

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    }),

    it('should check if the id is valid', async() => {
        const productId = 'not-valid-url';
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: "Monitor Curvo",
            available: true,
            price: 300
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Formato de ID no válido')

    }),
    it('should return validation errors', async() => {
        const res = await request(server).put('/api/products/1').send({})
        
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toBeTruthy() //lo mismo que lo anterior
        expect(res.body.errors).toHaveLength(5)


        expect(res.status).not.toBe(200)
        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty("data")
        expect(res.body.errors).not.toHaveLength(2)
    }),
    it('should validate price is greater than 0', async() => {
        const res = await request(server).put('/api/products/1').send({
            name: "Vertical monitor",
            available: true,
            price: -300
        })
        
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toBeTruthy() //lo mismo que lo anterior
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe("Precio no válido")

        expect(res.status).not.toBe(200)
        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty("data")
        expect(res.body.errors).not.toHaveLength(3)
    }),


    it('should update an existing product with correct data', async() => {
        const response = await request(server).put(`/api/products/1`).send({
            name: "Monitor Curvo",
            available: true,
            price: 300
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(500)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })   
})

describe('PATCH /api/products/:id', () => {

    it('should return 404 response for a non-existed product', async() => {
        const productId = 20000;
        const response = await request(server).patch(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    }),

    it('should check if the id is valid', async() => {
        const productId = 'not-valid-url';
        const response = await request(server).patch(`/api/products/${productId}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Formato de ID no válido')

    }),

    it('should update the product availability', async() => {
        const response = await request(server).patch(`/api/products/1`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.available).toBe(false)

        expect(response.status).not.toBe(500)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })   
})


describe("DELETE /api/products/:id", () => {
    it('should return 404 response for a non-existed product', async() => {
        const productId = 20000;
        const response = await request(server).delete(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    }),

    it('should check if the id is valid', async() => {
        const productId = 'not-valid-url';
        const response = await request(server).delete(`/api/products/${productId}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Formato de ID no válido')

    }),
    
    it("should delete the product", async() => {
        const response = await request(server).delete(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toHaveProperty("deleted")

        expect(response.body.data.deleted).toBe(true)

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(500)

    })
})
