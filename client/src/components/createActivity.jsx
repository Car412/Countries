import React from 'react';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {postActivity, getCountries} from '../actions';
import {useDispatch, useSelector} from 'react-redux';

const validacion = (input) =>{
    let errors = {};
    if(!input.name){
        errors.name = 'name is required'
    }
    if(!input.difficulty){
        errors.difficulty = 'required input'
    }
    if(input.duration < 1){
        errors.duration = 'invalid duration'
    }
    if (!input.season){
        errors.season = 'season is required'
    }
    return errors;
};

export default function CreateActivity(){
    const dispatch = useDispatch()
    const countries = useSelector((state)=> state.countries)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: [],
    })    

function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    });
    setErrors(validacion({
        ...input,
        [e.target.name] : e.target.value
    }))
}

function handleSelect(e){
    setInput({
        ...input,
        countries: [...input.countries, e.target.value]
    })
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(postActivity(input))
    alert('Activity created successfully')
    setInput({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: []
    })
}

useEffect(()=>{
    dispatch(getCountries())
})

return(
    <div>
        <h1>Create Activity</h1>
        <nav>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input required type='text' placeholder='name' name='name' value={input.name} onChange={(e)=> handleChange(e)}/>
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                    <label>Difficulty: </label>
                    <select required name='difficulty' value={input.difficulty} onChange={(e)=> handleChange(e)}>
                        <option value= '' selected disabled>Difficulty</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    {errors.difficulty && (<p>{errors.difficulty}</p>)}
                </div>
                <div>
                    <label>Duration: </label>
                    <input required type='time' name='duration' value={input.duration} onChange={(e)=> handleChange(e)}/>
                    {errors.duration && (<p>{errors.duration}</p>)}
                </div>
                <div>
                    <label>Season: </label>
                    <select required name='season' value={input.season} onChange={(e)=> handleChange(e)}>
                        <option value= '' selected disabled>Season</option>
                        <option>Autumn</option>
                        <option>Winter</option>
                        <option>Spring</option>
                        <option>Summer</option>
                    </select>
                    {errors.season && (<p>{errors.season}</p>)}
                </div>
                <div>
                    <div>
                        <label>Countries: </label>
                        <select onChange={(e)=> handleSelect(e)}>
                            <option selected= 'false' disabled>Select country</option>
                            {countries.map((e)=>(
                                <option value={e.id}>{e.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <button type='submit'>Create</button>
                        <Link to= '/home'>
                            <button>Back</button>
                        </Link>                    
                </div>
            </form>
        </nav>
    </div>
)
}
