import sql from 'mssql'
import dbconfig from "./dbconfig.js";

let p = await sql.connect(dbconfig)

class DB {
    static get_all_personajes = async ({field, value}) => {
        let query = "SELECT * FROM Personajes";
        if(field != undefined && value != undefined) {
            if(field=='movie') {
                query += `inner join PersonajePorPelicula on Personajes.Id=PersonajePorPelicula.IdPersonaje
                    where PersonajePorPelicula.IdPelicula='${value}'`
            } else {
                query += ` WHERE ${field}='${value}'`
            }
        }
        let result = await p.query(query);
        return result.recordset;
    }
    static get_by_id_personajes = async(id) => {
        let result = await p.request().input('pId', id)
            .query('SELECT * FROM Personajes WHERE Id=@pId');
        return result.recordset;
    }
    static editar_personaje = async(id, props) => {
        let keys = Object.keys(props);
        let query = "UPDATE Personajes SET ";
        keys.forEach((key) => {
            query += `${key}='${props[key]}',`
        });
        query = query.slice(0,-1);
        query += ` WHERE Id=${id}`;
        let result = await p.query(query);
        return result.recordset;
    }
    static agregar_personaje = async({imagen, nombre, edad, peso, historia}) => {
        let result = await p.request().input('pImagen', imagen)
            .input('pNombre', nombre)
            .input('pEdad', edad)
            .input('pPeso', peso)
            .input('pHistoria', historia)
            .query('INSERT INTO Personajes VALUES (@pImagen,@pNombre,@pEdad,@pPeso,@pHistoria)');
        return result.recordset;
    }
    static delete_by_id_personajes = async(id) => {
        let result = await p.request().input('pId', id)
            .query('DELETE FROM PersonajePorPelicula INNER JOIN Perosnajes on PersonajePorPelicula.IdPersonaje=Personajes.Id WHERE Personajes.Id=@pId');
        return result.recordset;
    }
    static detalle_personajes = async(id) => {
        console.log(id);
        let personaje = await this.get_by_id_personajes(id);
        let peliculas = await p.query(`select Peliculas.* from Peliculas 
            inner join PersonajePorPelicula on PersonajePorPelicula.IdPelicula=Peliculas.Id
            where PersonajePorPelicula.IdPersonaje=${id}`);
        peliculas = peliculas.recordset
        return {personaje, peliculas};
    }

    //

    static get_all_peliculas = async ({field, value}) => {
        let query = "SELECT * FROM Peliculas";
        if(field != undefined && value != undefined) {
            if(field=='ord') {
                query += ` ORDER BY FechaCreacion ${value}`
            } else {
                query += ` WHERE ${field}='${value}'`
            }
        }
        let result = await p.query(query);
        return result.recordset;
    }
    static get_by_id_peliculas = async(id) => {
        let result = await p.request().input('pId', id)
            .query('SELECT * FROM Peliculas WHERE Id=@pId');
        return result.recordset;
    }
    static editar_pelicula = async(id, props) => {
        let keys = Object.keys(props);
        let query = "UPDATE Peliculas SET ";
        keys.forEach((key) => {
            query += `${key}='${props[key]}',`
        });
        query = query.slice(0,-1);
        query += ` WHERE Id=${id}`;
        let result = await p.query(query);
        return result.recordset;
    }
    static agregar_pelicula = async({imagen, titulo, fecha, calificacion}) => {
        let result = await p.request().input('pImagen', imagen)
        .input('pTitulo', titulo)
        .input('pFecha', new Date(fecha))
        .input('pCalificacion', calificacion)
        .query('INSERT INTO Peliculas VALUES (@pImagen,@pTitulo,@pFecha,@pCalificacion)');
        return result.recordset;
    }
    static delete_by_id_peliculas = async(id) => {
        let result = await p.request().input('pId', id)
        .query('DELETE FROM PersonajePorPelicula INNER JOIN Peliculas on PersonajePorPelicula.IdPelicula=Peliculas.Id WHERE Peliculas.Id=@pId');
        return result.recordset;
    }
    static detalle_peliculas = async(id) => {
        let pelicula = await this.get_by_id_peliculas(id);
        let personajes = await p.query(`select Personajes.* from Personajes 
            inner join PersonajePorPelicula on PersonajePorPelicula.IdPersonaje=personajes.Id
            where PersonajePorPelicula.IdPelicula=${id}`);
        personajes = personajes.recordset;
        return {pelicula, personajes}
    }
}
export default DB
