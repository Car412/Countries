import React from 'react';
import {estilos} from './card.module.css';

export default function Card({flags, name, continents}){
    return(
        <div>
        <div>
            <img src={flags} alt='img'/>
            <h3>{name}</h3>
            <h5>{continents}</h5>
        </div>
        </div>
    )

}