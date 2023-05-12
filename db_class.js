import sql from 'mssql'
import dbconfig from "./dbconfig.js";

let p = await sql.connect(dbconfig)

class DB {
    static get_all_personajes = async () => {
        let r = await p.query("SELECT * FROM Personajes")
        return r.recordset;
    }
    static get_by_id_personajes = async(id) => {
        let r = await p.request().input('pId', id)
                                   .query('SELECT * FROM Personajes WHERE Id=@pId')
        return r.recordset;
    }
}

export default DB
