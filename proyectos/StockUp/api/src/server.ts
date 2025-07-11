import express from 'express'

const server = express()

// Routing

server.get('/', (req, res) => {
    res.send("GET")
})

server.post('/', (req, res) => {
    res.send("POST")
})

server.put('/', (req, res) => {
    res.send("PUT")
})

server.patch('/', (req, res) => {
    res.send("PATCH")
})

server.delete('/', (req, res) => {
    res.send("DELETE")
})

export default server