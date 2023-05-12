import 'dotenv/config'

const dbconfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_SERVER,
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    }
}

export default dbconfig
