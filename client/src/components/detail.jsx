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
    },[dispatch]) //eslint-disable-line    

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
        <div>
            {
                myCountry.activities && (
                    myCountry.activities.length === 0?(
                        <div>
                            <p className={estilos.h2}>No activities created</p>
                        </div>
                    ) : (
                        myCountry.activities.map((a)=>(
                            <div className={estilos.h4}>
                                <h3>Activity: {a.name}</h3>
                                <h4>Difficulty: {a.difficulty}</h4>
                                <h4>Duration: {a.duration} minutes</h4>
                                <h4>Season: {a.season}</h4>
                            </div>
                        ))
                    )
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