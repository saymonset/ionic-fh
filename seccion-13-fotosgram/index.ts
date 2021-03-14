import Server from './classes/server';

import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import userRoutes from './routes/usuario';
import postRoutes from './routes/post';

const server = new Server();

// Body parser
server.app.use( bodyParser.urlencoded( { extended: true } ) );
server.app.use( bodyParser.json() );

// fileUpload
    server.app.use(fileUpload({  useTempFiles: true }));

// Configurar CORS
       server.app.use(cors({origin:true, credentials:true}));
      // app.use(cors())
    

// rutas de mi aplicacion
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);


//mongodb+srv://samibd:12760187lo@micluster.mayzd.mongodb.net/fotosgram?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://samibd:12760187lo@micluster.mayzd.mongodb.net/fotosgram?retryWrites=true&w=majority', {
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
