import React from 'react';
import estilos from './paginado.module.css';


export default function Paginado({countriesPerPage, allCountries, paginado}){
    const pageNumbers = []

    for(let i = 1; i <=Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav className={estilos.nav}>
            <div className={estilos.div}>
                {pageNumbers && pageNumbers.map((number)=>{
                    return(
                    <a key={number} className={estilos.boton} onClick={()=>paginado(number)}>
                    {number}
                    </a>
                )})}
           </div>
        </nav>
    )

}