import React from 'react';
import estilos from './loading.module.css'

export function Loading(){
    return(
        <div className={estilos.cont}>
            <h2 className={estilos.load}>LOADING</h2>
        </div>
    )
}