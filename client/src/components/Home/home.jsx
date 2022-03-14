import React from 'react';
import {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountries, orderByName, filterByActivity,orderByPopulation, filterByContinent } from '../../actions';
import SearchBar from '../SearchBar/searchBar'
import Card from '../Card/card';

export default function Home(){
    const dispatch = useDispatch;
    const allCountries = useSelector((state)=> state.countries)
    const allActivities = useSelector((state)=>state.activities)

    useEffect(()=>{
        dispatch(getCountries())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries())
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.taget.value))        
    }    

    function handleFilterActivity(e){
        dispatch(filterByActivity(e.target.value))
    }

    function handlePopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value))
    }

    function handleFilterByContinent(e){
        dispatch(filterByContinent(e.taget.value))
    }

	return(
        <div>
            <SearchBar/>		
            <h1>Countries Guide</h1>
            <button onClick={e=>{handleClick(e)}}>All Countries</button>               
            
            <Link to='/activity'><button>Create Activity</button></Link>	
			
            <div>
            <select onChange={e=>handleSort(e)}>
                <option value="Asc">A to Z</option>
                <option value="Desc">Z to A</option>
            </select>
            </div>

            <div>
            <select onChange={e=>handleFilterByContinent(e)}>
                <option value="All">Todos</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
            </select>
            </div>          
            
            <div>			
            <select onChange={e=>handlePopulation(e)}>
                <option value="High">High Population</option>
                <option value="Low">Low Population</option>		
            </select>
            </div>    

            <div>
            <select onChange={e=>handleFilterActivity(e)}> 
                <option value="All">All</option>
                {allActivities && allActivities.map(a =>(
                <option value={a.name}>{a.name}</option>
                    ))}
            </select>	
            </div>
            <Card/>
            </div>	
    )    

    };