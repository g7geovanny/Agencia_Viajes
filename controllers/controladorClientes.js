import Viaje from "../model/Viaje.js";
import Testimoniales from "../model/Testimoniales.js";


const principal = async (req,res) => {

    //consultar 3 viajes del modelo de Viaje


    //realizar multiples consultas

    const promiseDB = [];

    promiseDB.push( Viaje.findAll( {limit: 3} ));
    promiseDB.push( Testimoniales.findAll( {limit: 3}));

    try {

        const resultado = await Promise.all(promiseDB)

        res.render('principal',{
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        
        })
        
    } catch (error) {
        
    }

   

}


const nosotros = (req,res) => {

    res.render('nosotros',{
        pagina: 'Nosotros'
    
    })

}

const testimoniales = async (req,res) => {

    try {
        const testimoniales = await Testimoniales.findAll();

        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        
        })
    
        
    } catch (error) {

        console.log(error)
        
    }

   
}

const viajes = async (req,res) => {

    const viajes = await Viaje.findAll();

    res.render('viajes',{
        pagina: 'Proximos Viajes',
        viajes: viajes
    
    })

};



const detalleViaje = async (req,res) => {
    

    const {slug} = req.params;

    try {

        const resultado = await Viaje.findOne( { where: {slug: slug} } );

        res.render('viaje',{
            pagina:'Informacion Viaje',
            viaje: resultado
        })
        
    } catch (error) {

        console.log(error)
        
    }

}




const guardarTestimonial = async (req,res) => {

        const {nombre, correo, mensaje} = req.body;

        const errores = [];

    //validacion

    if(nombre.trim() === ''){
        errores.push({mensaje: 'el nombre esta vacio' })

    }

    if(correo.trim() === ''){
        errores.push({mensaje: 'el correo esta vacio' })

    }

    if(mensaje.trim() === ''){
        errores.push({mensaje: 'el mensaje esta vacio' })

    }

    if(errores.length > 0){

        //consulta Testimoniales existentes
        const testimoniales = await Testimoniales.findAll();

        res.render('testimoniales',
        {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales

        })

    }else{

        //almacena en la base de datos

        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales')

           
            
        } catch (error) {
            console.log(error)
            
        }
    }


    

}










export {
   principal,
   nosotros,
   testimoniales,
   viajes,
   detalleViaje,
   guardarTestimonial
}