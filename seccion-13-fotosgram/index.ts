import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const server = new Server();

// Body parser
server.app.use( bodyParser.urlencoded( { extended: true } ) );
server.app.use( bodyParser.json() );
// rutas de mi aplicacion
server.app.use('/user', userRoutes);

mongoose.connect('mongodb://localhost:27017/fotosgram', {
    useNewUrlParser:true,
    useCreateIndex:true
}, ( err )=>{
       if (err){
           throw err;
       }
       console.log('Base de  datos online.')
})

// Levantar express
    server.start( ()=>{
               console.log(`Servidor corriendo en ${ server.port }`)
    });
