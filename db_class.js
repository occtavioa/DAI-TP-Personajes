import sql from 'mssql'
import dbconfig from "./dbconfig.js";

let p = await sql.connect(dbconfig)

class DB {
    static get_all_personajes = async (prop) => {
        let plus = "";
        console.log(prop);
        if(prop.field != undefined) {
            if(prop.field=='movie') {
                plus = `inner join PersonajePorPelicula on Personajes.Id=PersonajePorPelicula.IdPersonaje
                    where PersonajePorPelicula.IdPelicula='${prop.value}'`
            } else {
                plus = ` WHERE ${prop.field}='${prop.value}'`
            }
        }
        let query = "SELECT * FROM Personajes"+plus;
        let r = await p.query(query);
        return r.recordset;
    }
    static get_by_id_personajes = async(id) => {
        let r = await p.request().input('pId', id)
            .query('SELECT * FROM Personajes WHERE Id=@pId');
        return r.recordset;
    }
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
    static detalle_personajes = async(id) => {
        console.log(id);
        let personaje = await this.get_by_id_personajes(id);
        let peliculas = await p.query(`select Peliculas.* from Personajes 
            inner join PersonajePorPelicula on PersonajePorPelicula.IdPersonaje=personajes.Id
            inner join Peliculas on PersonajePorPelicula.IdPelicula=Peliculas.Id
            where Personajes.Id=${id}`);
        peliculas = peliculas.recordset
        return {personaje, peliculas};
    }

    static get_all_peliculas = async (props) => {
        let plus = "";
        if(props.field != undefined) {
            if(props.field=='ord') {
                plus = ` ORDER BY FechaCreacion ${props.value}`
            } else {
                plus = ` WHERE ${props.field}='${props.value}'`
            }
        }
        let query = "SELECT * FROM PELICULAS"+plus;
        let r = await p.query(q);
        return r.recordset;
    }
    static detalle_peliculas = async({id}) => {
        let pelicula = this.get_by_id_peliculas(id);
        let personajes = await p.query(`select Peliculas.* from Personajes 
            inner join PersonajePorPelicula on PersonajePorPelicula.IdPersonaje=personajes.Id
            inner join Peliculas on PersonajePorPelicula.IdPelicula=Peliculas.Id
            where Peliculas.Id=${id}`);
        personajes = personajes.recordset;
        return {pelicula, personajes}
    }
    static get_by_id_peliculas = async(id) => {
        let r = await p.request().input('pId', id)
            .query('SELECT * FROM Peliculas WHERE Id=@pId');
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
