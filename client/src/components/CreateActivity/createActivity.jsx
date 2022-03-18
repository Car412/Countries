import React from 'react';
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {postActivity, getActivity} from '../../actions/index';
import {estilos} from './createActivity.module.css';

function validateName(input){
    let error={};
    if(!/^[a-zA-Z]+$/.test(input)){
        error.input = 'Name can contain only letters'
    }
    return error;
}

function validate(input){
    if (!input.difficulty){
        alert('Difficulty is required');
    }else if (!input.duration){
        alert ('Duration is required');
    }else if (!input.season){
        alert('Please, choose a season');
    }
    }

export default function CreateActivity(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = useSelector(state=>state.countries)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: [],
        countries:[],
    })

    useEffect(()=>{
        dispatch(getActivity())
    }, []);

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postActivity(input))
        setInput({
            name: '',
            difficulty: '',
            duration: '',
            season: [],
            countries: [],
        })
        navigate('/home');
    }

    function handleChangeName(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validateName({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSeason(e){
        if(e.target.checked && e.target.id === 'season'){
            setInput({
                ...input,
                [e.target.id] : [...e.season, e.target.value]
            })
            setErrors(validate({
                ...input,
                [e.target.name] : [...input.season, e.target.value]
            }))
        }
    }

    function handleSelect(e){
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })        
    }

    return(
        <div>
            <Link to='/home'><button>Back</button></Link>
            <div>
                <form onSubmit={e=> handleSubmit(e)}>
                    <h2><strong>Let's create a new Activity</strong></h2>
                    <label>Name: </label>
                    <input type='text' value={input.name} name='name' onChange={e=> handleChangeName(e)}/>

                    <label>Difficulty: </label>
                    <input type='number' value={input.difficulty} name='difficulty' onChange={e=> handleChange(e)}/>

                    <label>Duration: </label>
                    <input type='number' value={input.duration} name='duration' onChange={e=> handleChange(e)}></input>
                    
                    <label>Season: </label>
                    <label><input type='checkbox' value='Autumn' onChange={e=> handleSeason(e)}/>Autumn</label>
                    <label><input type='checkbox' value='Winter' onChange={e=> handleSeason(e)}/>Winter</label>
                    <label><input type='checkbox' value='Spring' onChange={e=> handleSeason(e)}/>Spring</label>
                    <label><input type='checkbox' value='Summer' onChange={e=> handleSeason(e)}/>Summer</label>

                    <label>Country: </label>
                    <select onChange={e=>handleSelect(e)}>{countries.map(c=>{
                        <option value={c.name}>{c.name}</option>
                    })}</select>
                    
                    <button type='submit'>Ok!</button>
                </form>
            </div>
        </div>
    )


}