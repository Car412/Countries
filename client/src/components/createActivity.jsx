import React from 'react';
import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getCountries, getActivity, postActivity} from '../actions';
import {useDispatch, useSelector} from 'react-redux';
import estilos from './createActivity.module.css';

const validacion = (input, activities) =>{  
  let errors = {};
  if (!input.name) {
      errors.name = "Name is required";
  }
  if (!input.difficulty) {
      errors.difficulty = "Difficulty is required";
  }
  if (!input.duration) {
      errors.duration = "Between 30 and 180 minutes";
  }
  if (!input.season) {
      errors.season = "Season is required";
  }
  if (!input.countries) {
      errors.countries = "Add at least one country";
  }
  return errors;
}

export default function CreateActivity() {
  const dispatch = useDispatch();  
  const countries = useSelector((state) => state.countries); //guardo los paises en la ctte    
  //const activities = useSelector((state)=> state.activities);
  const navigate = useNavigate();

  const [input, setInput] = useState({ // guarda la info de la activity a crear
    name: "",
    difficulty: "",
    duration: "",
    season: "",    
    countries: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getActivity());
    dispatch(getCountries());
  }, [dispatch]);

  const handleInputChange = function (e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validacion({...input, [e.target.name]: e.target.value}));
  };

  const handleSelect = function (e){
    if(!input.countries.includes(e.target.value)){
      setInput({
        ...input,
        countries: [...input.countries, e.target.value],
      });
    } else alert ('This country was already chosen')
  }

  const handleCheck = (e) =>{
    if(e.target.checked){
      setInput({
        ...input,
        [e.target.name] : e.target.value,
      });
      setErrors(validacion({
        ...input, [e.target.name] : e.target.value
      }))
    }
  };

  const handleDelete = (e) =>{
    setInput({
      ...input,
      countries: input.countries.filter(country=> country !== e)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postActivity(input))
    alert('Activity created successfully')
    setInput({
        name: '',
        difficulty: '',
        duration: '',
        population: '',
        countries: [],
    })
    navigate('/home')
};

  return (
    <div className={estilos.contenedor}>
      <h1 className={estilos.h1}>Create your own activity</h1>
      <form className={estilos.form} onSubmit={(e)=>handleSubmit(e)}>
        <div className={estilos.label}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={(e)=>handleInputChange(e)}
            autoComplete="off"
            required
          />
        {errors.name && (
          <p className={estilos.error}>{errors.name}</p>
        )}  
        </div>
        <div className={estilos.label}>
          <label>Difficulty: </label>
            <select name='difficulty' value={input.difficulty}onChange={handleInputChange}>
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
            {errors.difficulty && (
             <p className={estilos.error}>{errors.difficulty}</p>
        )}
        </div>
        <div className={estilos.label}>
          <label>Duration: </label>
          <input
            type="number"
            name="duration"
            value={input.duration}
            onChange={handleInputChange}
            autoComplete="off"
            required
            min="30"
            max="180"
          />
          {errors.duration && (
            <p className={estilos.error}>{errors.duration}</p>
        )}
        </div>
        <div className={estilos.label}>
          <label>Season: </label>
          <div>
            <label>
              <input
                type="checkbox"
                name="season"
                value="Summer"
                onChange={(e) => handleCheck(e)}
              />
              Summer
            </label>
            <label>
              <input
                type="checkbox"
                name="season"
                value="Autumn"
                onChange={(e) => handleCheck(e)}
              />
              Autumn
            </label>
            <label>
              <input
                type="checkbox"
                name="season"
                value="Winter"
                onChange={(e) => handleCheck(e)}
              />
              Winter
            </label>
            <label>
              <input
                type="checkbox"
                name="season"
                value="Spring"
                onChange={(e) => handleCheck(e)}
              />
              Spring
            </label>
          </div>
        </div> 
        {errors.season && (
          <p className={estilos.error}>{errors.season}</p>
      )}       
        <div className={estilos.label}>
          <label>Countries: </label>
          <select onChange={handleSelect}>
            <option value="all">Countries</option>
            {countries.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.countries && (
            <p className={estilos.error}>{errors.countries}</p>
          )}
        </div>
        <div>     
        {input.countries.map(country =>{
            return(
              <div key={country} className={estilos.div}>
                <h5>{country}</h5>
                <button onClick={()=>handleDelete(country)}
                className={estilos.boton2}
                >x</button>
              </div>
            )
          })} 
        </div>
        <div className={estilos.botones}>
          <button className={estilos.boton1} type="submit" onClick={handleSubmit}>
            Create
          </button>

          <Link to ='/home'>
            <button className={estilos.boton1}>Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
        
        





                       
                                      
                    
                

