import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_DETAIL = 'GET_DETAIL';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const GET_ACTIVITY = 'GET_ACTIVITY';

//conexion con el back:

export function getCountries(){
    return async function (dispatch){
        let info = await axios.get("http://localhost:3001/countries")
        return dispatch({
            type: 'GET_COUNTRIES',
            payload : info.data
        })
    }
}

export function getByName(name){
    return async function (dispatch){
        let info = await axios.get(`http://localhost:3001/countries?name=${name}`);
        return dispatch ({
            type: 'GET_BY_NAME',
            payload : info.data
        })
    }
}

export function getDetail(id){
    return async function (dispatch){
        try {
            let info = await axios.get(`http://localhost:3001/countries/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: info.data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterByContinent(payload){
    return{
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}

export function filterByActivity(payload){
    return{
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByPopulation(payload){
    return{
        type: 'ORDER_BY_POPULATION',
        payload
    }
}

export function getActivity(payload){
    return async function(dispatch){
        try {
            let info = await axios.get('http://localhost:3001/activities');
            return dispatch({
                type:'GET_ACTIVITY',
                payload: info.data,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postActivity(payload){
    return async function (dispatch){
        let info = await axios.post("http://localhost:3001/activities", payload);
        return dispatch({
            type: 'POST_ACTIVITY',
            payload: info.data,
        })
    }
}