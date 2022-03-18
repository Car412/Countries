import React, { Fragment } from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { getCountries, getActivity, filterByActivity,filterByContinent, orderByName, orderByPopulation } from "../../actions";
import SearchBar from '../SearchBar/searchBar';
import Paginado from "../Paginado/paginado";
import Card from "../Card/card";
import {estilos} from './home.module.css';

export default function Home(){
    const dispatch = useDispatch();
    const allCountries = useSelector(state=> state.countries);
    const allActivities = useSelector(state=> state.activities);

    //Paginado: página actual
    const [currentPage, setCurrentPage] = useState(1)
    //Paises por página
    const [countiresPerPage, setCountriesPerPage] = useState(9)
    const [order, setOrder]= useState('')

    //último país
    const lastCountry = currentPage * countiresPerPage
    //primer país
    const firstCountry = lastCountry - countiresPerPage

    const currentCountries = allCountries.slice(firstCountry, lastCountry)

    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getCountries())
        dispatch(getActivity())
    },[dispatch, order])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries(e))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
    }

    function handleFilterContinent(e){
        dispatch(filterByContinent(e.target.value))
    }

    function handlePopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value))
    }

    function handleActivity(e){
        dispatch(filterByActivity(e.target.value))
    }

    return(
        <div className='estilos.contenedor'>
            <SearchBar/>
            <h1><strong>Welcome</strong></h1>
            <button onClick={e=> handleClick(e)}>All Countries</button>
            <Link to='/activity'><button>Create Activity</button></Link>
            <div>
                <div>
                    <select onChange={e=> handleSort(e)}>
                        <option value='asc'>Ascendente</option>
                        <option value='desc'>Descendente</option>
                    </select>
                <div>
                    <select onChange={e=> handleFilterContinent(e)}>
                        <option value = 'All'>All</option>
                        <option value='Europe'>Europe</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='Asia'>Asia</option>
                        <option value='Africa'>Africa</option>
                        <option value='South America'>South America</option>
                        <option value='North America'>North America</option>
                    </select>
                </div>
                <div>
                    <select onChange={e=> handlePopulation(e)}>
                        <option value='high'>High Population</option>
                        <option value='low'>Low Population</option>
                    </select>
                </div>
                <div>
                    <select onChange={e=> handleActivity(e)}>
                    <option value='All'>All</option>
                    {allActivities && allActivities.map(ac=>(
                        <option value={ac.name}>{ac.name}</option>
                    ))}
                    </select>
                </div>    
                </div>
                <div>
                    {currentCountries?.map(el=>{
                        return(
                            <Fragment>
                                <Link to={'/countries/' + el.id}
                                key={'l' + el.id}>
                                    <Card
                                    key={el.id}
                                    id={el.id}
                                    img={el.flags}
                                    name={el.name}                                    
                                    />
                                </Link>
                            </Fragment>
                        )
                    })}
                </div>
                <Paginado
            key={1}
            countriesPerPage={countiresPerPage}
            allCountries={allCountries}
            paginado={paginado}
            />
            </div>
        </div>
    )
}
