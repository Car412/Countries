import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_DETAIL = 'GET_DETAIL';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';

// conexión con el back:

export function getCountries(){
    return async function (dispatch){
        let json = await axios.get('http://localhost:3001/countries')
        return dispatch({
            type: GET_COUNTRIES,
            payload : json.data
        })
    }
}

export function getByName(name){
    return async function (dispatch){
        let json = await axios.get('http://localhost:3001/countries?name=' + name)
        return dispatch ({
            type: GET_BY_NAME,
            payload : json.data
        })
    }
}

export function getDetail(id){
    return async function (dispatch){
        let json = await axios.get('http://localhost:3001/countries/' + id)
        return dispatch ({
            type: GET_DETAIL,
            payload: json.data
        })
    }
}

export function filterByContinent(payload){
    return{
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export function filterByActivity(payload){
    return{
        type: FILTER_BY_ACTIVITY,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByPopulation(payload){
    return{
        type: ORDER_BY_POPULATION,
        payload
    }
}

export function getActivities(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/activities')
        return dispatch({
            type: GET_ACTIVITIES,
            payload: json.data
        })
    }
}

export function postActivity(payload){
    return async function (dispatch){
        let json = await axios.post('http://localhost:3001/activity', payload)
        .then(function(json){})
        .catch(function(error){});
    }
}