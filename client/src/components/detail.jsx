import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetail, resetDetail} from '../actions';
import { useEffect } from 'react';
import estilos from './detail.module.css';


export default function GetDetail(){
    const dispatch = useDispatch();
    const {id} = useParams();
    const myCountry = useSelector((state)=> state.detail)

    useEffect(()=>{
        dispatch(resetDetail())
        dispatch(getDetail(id))
    },[dispatch, id]) //eslint-disable-line    


return(
    <div className={estilos.contenedor}>        
        <div>
            <div>
                <img src={myCountry.flags} alt='flag' className={estilos.flag}/>
            </div>
            <div>
                <h1 className={estilos.h1}>{myCountry.name}</h1>
                <div className={estilos.h2}>
                <h2>{myCountry.id}</h2>    
                <h2>Continent: {myCountry.continents}</h2>
                <h2>Capital: {myCountry.capital}</h2>
                <h2>Subregion: {myCountry.subregion}</h2>
                <h2>Area: {myCountry.area} km²</h2>
                <h2>Population: {myCountry.population}</h2>
                </div>
            </div>
        </div>
        <div className={estilos.divAct}>
            {
               myCountry.hasOwnProperty('activities') ? myCountry.activities.map(activity => (
                        <div key={activity.id}>
                          <h2>Activity:  {activity.name}</h2>
                          <h4>Difficulty:{activity.difficulty}, Season: {activity.season}</h4>
                          <h4>Duration: {activity.duration} minutes</h4>                             
                        </div>
                      ))                     
                    
                    : (
                         
                    <div>
                      <p>No activities</p>
                    </div>
                  )
                  }
            
        <div className={estilos.div}>            
            <Link to='/home'>
            <button className={estilos.boton}>Back</button>
        </Link>
        </div>
        </div>
    </div>
)};