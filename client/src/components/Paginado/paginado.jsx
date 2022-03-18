import React from "react";
import {estilos} from './paginado.module.css'

export default function Paginado({countriesPerPage, allCountries, paginado}){
    const pageNumbers = [];

    for(let i = 1; 1<= Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(number=>(
                    <li>
                        <a onClick={()=>paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}