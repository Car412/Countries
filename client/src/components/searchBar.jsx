import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { getByName } from '../actions';
import estilos from './searchBar.module.css';


export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    };

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getByName(name))        
    }

    return(
        <div>
            <input 
            type='text' 
            placeholder='Country name' 
            value={name}
            onChange={(e)=> handleInputChange(e)} 
            className={estilos.input}></input>
            <button 
            type='submit' 
            onClick={(e)=> handleSubmit(e)} 
            className={estilos.boton}>Search</button>
        </div>
    )
}