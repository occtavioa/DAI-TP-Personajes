import sql from 'mssql'
import dbconfig from "./dbconfig.js";

let p = await sql.connect(dbconfig)

class DB {
    static get_all_personajes = async (prop) => {
        let where = "";
        let join = "";
        console.log(prop);
        if(prop.field != undefined) {
            if(prop.field=='movie') {
                join = " inner join PersonajePorPelicula on Personajes.Id=PersonajePorPelicula.IdPersonaje"
                where = ` where PersonajePorPelicula.IdPelicula='${prop.value}'`
            } else {
                where = ` WHERE ${prop.field}='${prop.value}'`
            }
        }
        let query = "SELECT * FROM Personajes"+join+where;
        console.log(query);
        let r = await p.query(query);
        return r.recordset;
    }
    static get_by_id_personajes = async(id) => {
        let r = await p.request().input('pId', id)
                                 .query('SELECT * FROM Personajes WHERE Id=@pId');
        return r.recordset;
    }
    // static get_by_nombre = async (nombre) => {
    //     let r = await p.request().input('pNombre', nombre)
    //                              .query('SELECT * FROM Personajes WHERE Nombre LIKE @pNombre');
    //     return r.recordset;
    // }
    // static get_by_edad = async (edad) => {
    //     edad=parseInt(edad);
    //     let r = await p.request().input('pEdad', edad)
    //                              .query('SELECT * FROM Personajes WHERE Edad=@pEdad');
    //     return r.recordset;
    // }
    // static get_by_pelicula = async ({id}) => {
    //     let r = await p.request().input('pId', id)
    //                              .query('SELECT Personajes.Id,Imagen,Nombre,Edad,Peso,Historia FROM Personajes INNER JOIN PersonajePorPelicula ON IdPelicula=@pId WHERE IdPersonaje=Personajes.Id');
    //     return r.recordset;
    // }
    static editar_personaje = async({id, imagen, nombre, edad, peso, historia}) => {
        let r = await p.request().input('pId', id)
                                 .input('pImagen', imagen)
                                 .input('pNombre', nombre)
                                 .input('pEdad', edad)
                                 .input('pPeso', peso)
                                 .input('pHistoria', historia)
                                 .query('UPDATE Personajes SET Imagen=@pImagen,Nombre=@pNombre,Edad=@pEdad,Peso=@pPeso,Historia=@pHistoria WHERE Id=@pId');
        return r.recordset;
    }
    static agregar_personaje = async({imagen, nombre, edad, peso, historia}) => {
        let r = await p.request().input('pImagen', imagen)
                                 .input('pNombre', nombre)
                                 .input('pEdad', edad)
                                 .input('pPeso', peso)
                                 .input('pHistoria', historia)
                                 .query('INSERT INTO Personajes VALUES (@pImagen,@pNombre,@pEdad,@pPeso,@pHistoria)');
        return r.recordset;
    }
    static delete_by_id_personajes = async({id}) => {
        let r = await p.request().input('pId', id)
                                 .query('DELETE FROM Personajes WHERE Id=@pId');
        return r.recordset;
    }

    static get_all_peliculas = async () => {
        let r = await p.query("SELECT * FROM Peliculas");
        return r.recordset;
    }
    static get_by_id_peliculas = async(id) => {
        let r = await p.request().input('pId', id).query('SELECT * FROM Peliculas WHERE Id=@pId');
        return r.recordset;
    }
    static agregar_pelicula = async({imagen, titulo, fecha, calificacion}) => {
        let r = await p.request().input('pImagen', imagen)
                                 .input('pTitulo', titulo)
                                 .input('pFecha', new Date(fecha))
                                 .input('pCalificacion', calificacion)
                                 .query('INSERT INTO Peliculas VALUES (@pImagen,@pTitulo,@pFecha,@pCalificacion)');
        return r.recordset;
    }
    static delete_by_id_peliculas = async(id) => {
        let r = await p.request().input('pId', id)
                                 .query('DELETE FROM Peliculas WHERE Id=@pId');
        return r.recordset;
    }
}
export default DB
