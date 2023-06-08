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
        let keys = Object.keys(req.query);
        if(keys.length > 1) {
            res.send('muchos params');
            res.end();
        } else {
            let prop = {field: keys[0], value: req.query[keys[0]]}
            let r = await DB.get_all_personajes(prop);
            res.json(r);
        }
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
app.get('/personajes/detalle/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        let r = await DB.detalle_personajes(req.params.id);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.send("error al obtener pelicula");
    }
})


app.get('/peliculas', async (req, res) => {
    try {
        let keys = Object.keys(req.query);
        if(keys.length > 1) {
            res.send('muchos params');
        } else {
            let prop = {field: keys[0], value: req.query[keys[0]]}
            let r = await DB.get_all_peliculas(prop);
            res.json(r.map(m => ({
                Id: m.Id,
                Image: m.Imagen,
                Titulo: m.Titulo,
                FechaCreacion: m.FechaCreacion
            })));
        }
    } catch (e) {
        console.log(e);
        res.send("error al obtener peliculas");
    }
})
app.get('/peliculas/:id', async (req, res) => {
    try {
        let r = await DB.get_by_id_peliculas(req.params.id);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.send("error al obtener pelicula");
    }
})
app.post('/peliculas', async (req, res) => {
    try {
        let r = await DB.agregar_pelicula(req.body);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.send("error al crear pelicula");
    }
})
app.put('/peliculas/:id', async (req, res) => {
    try {
        let r = await DB.editar_pelicula(req.body);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.send("error al modificar pelicula");
    }
})
app.delete('/peliculas/:id', async (req, res) => {
    try {
        let r = await DB.delete_by_id_peliculas(req.params.id);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.send("error al eliminar pelicula");
    }
})
app.get('/peliculas/detalle/:id', async (req, res) => {
    try {
        let r = await DB.detalle_peliculas(req.params.id);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.send("error al obtener pelicula");
    }
})

app.listen(port, () => {
    console.log('app')
})
