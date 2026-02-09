const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/auth';
        this.productosPath = '/api/productos';

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        this.app.use( express.json({ limit: '50mb' }) );
        this.app.use( express.urlencoded({ extended: true, limit: '50mb' }) );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/auth.routes'));
        this.app.use( this.productosPath, require('../routes/productos.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}


module.exports = Server;
