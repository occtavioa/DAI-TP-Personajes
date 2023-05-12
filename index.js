import express from "express"
import DB from './db_class.js'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('TP-Personajes')
})

app.listen(port, () => {
    console.log('app')
})

