import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail } from '../../actions';
import { useEffect } from 'react';
import{estilos} from './detail.module.css';
import CardActivity from '../CardActivity/cardActivity'

export default function Detail(){
    const dispatch = useDispatch();
    const {id} = useParams()

    useEffect(()=>{
        dispatch(getDetail(id))
    }, [dispatch]) // eslint-disable-line

    const detCountry = useSelector((state)=>state.detail)

   
    return(
        <div>
            <div>{Object.keys(detCountry).length > 0 ? 
    <div>
        <h1><strong>{detCountry.name}</strong></h1>
        <img src={detCountry.name} alt='img'/>
        <p>Capital: {detCountry.capital}</p>
        <p>Continent: {detCountry.continent}</p>
        <p>Subregion: {detCountry.subregion}</p>
        <p>Area: {detCountry.area}</p>
        <p>Population: {detCountry.population}</p>
        <p>Activities: </p>
        {detCountry.activities && detCountry.activities?.map(ac=>{
            <CardActivity
            name= {ac.name}
            difficulty= {ac.difficulty}
            duration = {ac.duration}
            season = {ac.season}
            />
        })}
    </div> : <p>Loading...</p>     
        }

    <div>
        <Link to ='/home'><button>Back</button></Link>
    </div>
                
            </div>
        </div>
    )
}
