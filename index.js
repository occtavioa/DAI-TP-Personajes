import express from "express"
import DB from './db_class.js'
import bodyParser from "body-parser"

const app = express()
const port = 3000

app.get('/', (req, res, next) => {
    res.send('TP-Personajes')
})
app.get('/personajes', async (req, res) => {
    let keys = Object.keys(req.query);
    if (keys.length > 1) {
        res.status(400).send('muchos params');
    } else if (keys[0] !== undefined && keys[0].toLowerCase() !== 'nombre' && keys[0].toLowerCase() !== 'edad' && keys[0].toLowerCase() !== 'peliculas') {
        res.status(400).send('parametros invalidos')
    } else {
        try {
            let r = await DB.get_all_personajes({ field: keys[0], value: req.query[keys[0]] });
            console.log(r);
            res.json(r);
        } catch (e) {
            console.log(e);
            res.status(500).send("error al obtener personajes");
        }
    }
})
app.get('/personajes/:id', async (req, res) => {
    try {
        let r = await DB.get_by_id_personajes(req.params.id);
        console.log(r);
        console.log(req.params.id);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.status(500).send("error al obtener personaje");
    }
})
app.use(bodyParser.json());
app.post('/personajes', async (req, res) => {
    try {
        let r = await DB.agregar_personaje(req.body);
        console.log(r);
        console.log(req.body);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.status(500).send("error al crear personaje");
    }
})
app.put('/personajes/:id', async (req, res) => {
    try {
        let r = await DB.editar_personaje(req.params.id, req.body);
        console.log(r);
        console.log(req.body);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.status(500).send("error al modificar personaje");
    }
})
app.delete('/personajes/:id', async (req, res) => {
    try {
        let r = await DB.delete_by_id_personajes(req.params.id);
        console.log(r);
        console.log(req.params.id);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.status(500).send("error al eliminar personaje");
    }
})
app.get('/personajes/detalle/:id', async (req, res) => {
    try {
        let r = await DB.detalle_personajes(req.params.id);
        console.log(r);
        console.log(req.params.id);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.status(500).send("error al obtener pelicula");
    }
})

//

app.get('/peliculas', async (req, res) => {
    let keys = Object.keys(req.query);
    if(keys.length > 1) {
        res.status(400).send('error muchos params');
    } else if(keys[0] !== undefined && keys[0] !== 'titulo' && keys[0] !== 'ord') {
        res.status(400).send('parametros invalidos');
    } else {
        try {
            let r = await DB.get_all_peliculas({ field: keys[0], value: req.query[keys[0]] });
            res.json(r.map(m => ({
                Id: m.Id,
                Image: m.Imagen,
                Titulo: m.Titulo,
                FechaCreacion: m.FechaCreacion
            })));
        } catch (e) {
            console.log(e);
            res.status(500).send("error al obtener peliculas");
        }
    }
})
app.get('/peliculas/:id', async (req, res) => {
    try {
        let r = await DB.get_by_id_peliculas(req.params.id);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.status(500).send("error al obtener pelicula");
    }
})
app.post('/peliculas', async (req, res) => {
    try {
        let r = await DB.agregar_pelicula(req.body);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.status(500).send("error al crear pelicula");
    }
})
app.put('/peliculas/:id', async (req, res) => {
    try {
        let r = await DB.editar_pelicula(req.params.id, req.body);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.status(500).send("error al modificar pelicula");
    }
})
app.delete('/peliculas/:id', async (req, res) => {
    try {
        let r = await DB.delete_by_id_peliculas(req.params.id);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.status(500).send("error al eliminar pelicula");
    }
})
app.get('/peliculas/detalle/:id', async (req, res) => {
    try {
        let r = await DB.detalle_peliculas(req.params.id);
        res.json(r);
    } catch (e) {
        console.log(e);
        res.status(500).send("error al obtener pelicula");
    }
})

app.listen(port, () => {
    console.log('app')
})
