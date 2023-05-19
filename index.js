import express from "express"
import DB from './db_class.js'
import bodyParser from "body-parser"
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    res.send('TP-Personajes');
})

app.get('/personajes', async (req, res) => {
    try {
        let r = await DB.get_all_personajes();
        res.json(r);
    } catch (e) {
        console.log(e);
        res.send("error al obtener personajes");
    }
})

app.get('/personajes/:id', async (req, res) => {
    try {
        let r = await DB.get_by_id_personajes(req.params.id);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.send("error al obtener personaje");
    }
})

app.use(bodyParser.json());
app.post('/personajes', async (req, res) => {
    try {
        let r = await DB.agregar_personaje(req.body);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.send("error al crear personaje");
    }
})

app.put('/personajes/:id', async (req, res) => {
    try {
        let r = await DB.editar_personaje(req.body);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.send("error al modificar personaje");
    }
})

app.delete('/personajes/:id', async (req, res) => {
    try {
        let r = await DB.delete_by_id_personajes(req.params.id);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.send("error al eliminar personaje");
    }
})

app.listen(port, () => {
    console.log('app')
})

