import React from 'react';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import { getByName } from '../../actions';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState ('')

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getByName(name))
    }

    return(
        <div>
            <input type ='search'onChange={e=> handleInputChange(e)}/>
            <button type='submit' onClick={e=> handleSubmit(e)}>Search</button>
        </div>
    )
}