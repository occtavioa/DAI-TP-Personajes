import sql from 'mssql'
import dbconfig from "./dbconfig.js";

let p = await sql.connect(dbconfig)

class DB {
    static get_all_personajes = async () => {
        let r = await p.query("SELECT * FROM Personajes");
        return r.recordset;
    }
    static get_by_id_personajes = async(id) => {
        let r = await p.request().input('pId', id)
                                 .query('SELECT * FROM Personajes WHERE Id=@pId');
        return r.recordset;
    }
    static editar_personaje = async(per) => {
        let r = await p.request().input('pId', per.id)
                                 .input('pImagen', per.imagen)
                                 .input('pNombre', per.nombre)
                                 .input('pEdad', per.edad)
                                 .input('pPeso', per.peso)
                                 .input('pHistoria', per.historia)
                                 .query('UPDATE Personajes SET Id=@pId,Imagen=@pImagen,Nombre=@pNombre,Edad=@pEdad,Peso=@pPeso,Historia=@pHistoria');
        return r.recordset;
    }
    static agregar_personaje = async(per) => {
        let r = await p.request().input('pImagen', per.imagen)
                                 .input('pNombre', per.nombre)
                                 .input('pEdad', per.edad)
                                 .input('pPeso', per.peso)
                                 .input('pHistoria', per.historia)
                                 .query('INSERT INTO Personajes VALUES (@pImagen,@pNombre,@pEdad,@pPeso,@pHistoria)');
        return r.recordset;
    }
    static delete_by_id_personajes = async(id) => {
        let r = await p.request().input('pId', id)
                                 .query('DELETE FROM Personajes WHERE Id=@pId');
        return r.recordset;
    }
}

export default DB
