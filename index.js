import express from "express";




import routes from "./routes/rutasClientes.js";
import db from "./config/db.js";



const app = express();




//Conexion a la base de datos
db.authenticate()
    .then( () => {console.log('********* CONEXION A LA BASE DATOS CORRECTA *******')})
    .catch( (error) => {console.log(error)})


    

//Habilitando pug
app.set('view engine', 'pug');


//body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));



app.use( (req,res,next) => {

    const NuevoYear = new Date().getFullYear();

    res.locals.year = NuevoYear;
    res.locals.nombreSitio = "Agencia de Viajes"

    next();

})


//Define la carpeta publica/archivos estaticos
app.use(express.static('public'))




//Agregando el router
app.use('/',routes);













//Creacion del puerto
const port = process.env.PORT || 3000;

app.listen( port, () => {

    console.log('********** SERVER RUNNING IN PORT 3000 **************')
})