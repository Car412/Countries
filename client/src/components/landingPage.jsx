import React from 'react';
import {Link} from 'react-router-dom';
import estilos from "./landingPage.module.css"


export default function LandingPage() {
    return(  
        <div className={estilos.contenedor}>      
        <div>
            <h1 className={estilos.titulo}>Around the World</h1>
            <Link to = '/home'>
                <button className={estilos.boton}>Let's Go!</button>
            </Link>
        </div>
        </div>
        )
}