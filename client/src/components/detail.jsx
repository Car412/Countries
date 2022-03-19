import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetail} from '../actions';
import { useEffect } from 'react';

export default function GetDetail(props){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    })

    const myCountry = useSelector((state)=> state.detail)

    return(
        <div>
            {myCountry?
            <div>
                <img src={myCountry.flags} alt='img'/>
                <h1>{myCountry.name}</h1>
                <div>
                    <div>
                        <h3>Id: {myCountry.id}</h3>
                        <h3>Continent: {myCountry.continents}</h3>
                        <h3>Capital: {myCountry.capital}</h3>
                        <h3>Subregion: {myCountry.subregion}</h3>
                        <h3>Area: {myCountry.area}</h3>
                        <h3>Population: {myCountry.population}</h3>
                        <Link to= '/home'><button>Return</button></Link>
                    </div>
                    <div>
                        {myCountry.activities && myCountry.activities.length?
                        myCountry.activities.map(el=>
                            <li><span>{el.name}</span>
                            <p>Difficulty: <span>{el.difficulty}</span></p>
                            <p>Duration: <span>{el.duration}</span></p>
                            <p>Season: {el.season}</p>
                            </li>
                            ) :
                            <h3>No activities</h3>
                    }
                    </div>
                </div>
            </div>    :
            <div>
                <p>Loading...</p>
            </div>
        }
        </div>
    )
}