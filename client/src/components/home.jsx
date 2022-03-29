import React from 'react';
import { getCountries, orderByName, orderByPopulation,filterByContinent, filterByActivity, getActivity, resetDetail} from '../actions';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Card from './card';
import Paginado from './paginado';
import SearchBar from './searchBar';
import estilos from './home.module.css';

export default function Home(){
    const dispatch = useDispatch()
    const allCountries = useSelector((state)=> state.countries)
    const allActivities = useSelector((state)=> state.activities)

    //estados locales para el paginado    
    const [orden, setOrden] = useState('') // eslint-disable-next-line
    const [orden2, setOrden2] = useState('');
    const [currentPage, setCurrentPage] = useState(1) //para que inicie en la pag 1
    let countriesPerPage;
    currentPage === 1? countriesPerPage = 9 : countriesPerPage = 10;
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry =  indexOfLastCountry - countriesPerPage;
    const currentCountry = allCountries?.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    } 
    
    useEffect(()=>{ // traigo toda la info        
        dispatch(resetDetail())
        dispatch(getCountries());
        dispatch(getActivity());        
    }, [dispatch])


    function handleNameSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado${e.target.value}`)
    }

    function handlePopSort(e){
        e.preventDefault()
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1)
        setOrden2(`Ordenado${e.target.value}`)
    }

    function handleFilterCont(e){        
        dispatch(filterByContinent(e.target.value))
    }

    function handleFilterAct(e){        
        dispatch(filterByActivity(e.target.value))        
    }

    return(
        <div className={estilos.contenedor}>
            <h1 className={estilos.h1}>Contries App</h1>
            <div>
                    <SearchBar/>
                </div>            
            <nav className={estilos.nav}>                
                <div>
                    <select onChange={(e)=> handleNameSort(e)} className={estilos.select}>
                        <option value='AZ'> AZ </option>
                        <option value='ZA'> ZA </option>
                    </select>
                    <select onChange={(e)=> handlePopSort(e)} className={estilos.select}>
                        <option value='High'> High </option>
                        <option value='Low'> Low </option>
                    </select>
                </div>
                <div>
                    <select onChange={(e)=> handleFilterCont(e)} className={estilos.select}>
                        <option value='All'>All</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Africa">Africa</option>
                        <option value="North America">North America</option>
                        <option value="Oceania">Oceania</option>                        
                        <option value="South America">South America</option>                        
                    </select>
                    <select onChange={(e)=> handleFilterAct(e)} className={estilos.select}>
                        <option value= 'All'>All</option>
                        {
                            allActivities && allActivities.map(activity=>(
                                <option value={getActivity.name}>{activity.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                <Link to= '/create'>
                    <button className={estilos.select}>Create your activity</button>
                </Link>
            </div>
            </nav>
            <div>
            <Paginado key={1} 
            countriesPerPage={countriesPerPage} 
            allCountries={allCountries?.length} 
            paginado={paginado}/>
            </div>        
            
            <div>
                <div className={estilos.card} >
                    {currentCountry?.map((el)=>{
                        return(
                            <div key={el.id}>
                                <Link to={'/details/' + el.id}>
                                    <Card id={el.id} 
                                    flags={el.flags} 
                                    name={el.name} 
                                    continents={el.continents} 
                                    key={el.id}/>
                                </Link>
                            </div>
                        )                        
                    }) 
                }                
                </div>          
                
            </div>
        </div>
    )
}