import React from "react";
import estilos from "./card.module.css"


export default function Card({name, flags, continents}){
    return(
        <div className={estilos.contenedor}>
            <div>
                <h3 className={estilos.h3}>{name}</h3>
                <h5 className={estilos.h5}>{continents}</h5>                
                <img className={estilos.flags}src={flags} alt='img'/>
                </div>
        </div>
    )
}        
                
