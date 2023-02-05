import express from "express";


import {principal,
        nosotros,
        testimoniales,
        viajes,
        detalleViaje,
        guardarTestimonial} from "../controllers/controladorClientes.js";




const router = express.Router();



router.get('/principal', principal );

router.get('/nosotros', nosotros );

router.get('/viajes', viajes );
router.get('/detalleViaje/:slug', detalleViaje );

router.get('/testimoniales', testimoniales );
router.post('/testimoniales', guardarTestimonial );








export default router;