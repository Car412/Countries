import React from "react";

export default function Card({name, flags, continents}){
    return(
        <div>
            <img src={flags} alt='img'/>
            <div>
                <h2>{name}</h2>
                <h5>{continents}</h5>
            </div>
        </div>
    )
}