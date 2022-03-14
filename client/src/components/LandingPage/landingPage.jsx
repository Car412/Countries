import React from "react";
import { Link } from "react-router-dom";
import estilos from "./landing.module.css"

export default function Landing(){
    return(
        <div className={estilos.contenedor}>
            <h1 className={estilos.titulo}>Hello World</h1>
            <Link to = '/home'> 
            <button className={estilos.boton}> Let's Go ! </button>
            </Link>
        </div>
    )
}