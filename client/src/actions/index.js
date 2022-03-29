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
export const RESET_DETAIL = 'RESET_DETAIL';
export const RESET_STATE = 'RESET_STATE';

export function getCountries(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/countries")
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
}

/* export const getCountries = ()=> (dispatch) =>{
    return axios
    .get("http://localhost:3001/countries")
    .then((json)=>{
        dispatch({
            type: GET_COUNTRIES,
            payload: json.data,
        });
    })
    .catch((error) =>{
        console.log(error)
    });
} */

export function getByName(name){
    return async function (dispatch){
        let info = await axios.get(`http://localhost:3001/countries?name=${name}`);
        return dispatch ({
            type: 'GET_BY_NAME',
            payload : info.data
        })
    }
}

/* export const getByName = (name) => (dispatch) =>{
    return axios
    .get(`http://localhost:3001/countries?name=${name}`)
    .then((json)=>{
        dispatch({
            type: GET_BY_NAME,
            payload: json.data,
        })
    })
    .catch((error)=>{
        console.log(error)
    })
} */

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

/* export const getDetail = (id) => (dispatch) =>{
    return axios.get(`http://localhost:3001/countries/${id}`)
    .then((json)=>{
        dispatch({
            type: GET_DETAIL,
            payload: json.data,
        })
    })
    .catch((error)=>{
        console.log(error)
    })
} */

export function filterByContinent(payload){
    return function (dispatch){
        dispatch({
        type: FILTER_BY_CONTINENT,
        payload
    })
    }
}

export function filterByActivity(payload){
    return function (dispatch){
        dispatch({
        type: FILTER_BY_ACTIVITY,
        payload
    })
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload,
    }
}

export function orderByPopulation(payload){
    return{
        type: ORDER_BY_POPULATION,
        payload
    }
}

export function getActivity(){
    return async function(dispatch){
        try {
            let info = await axios.get('http://localhost:3001/activity');
            return dispatch({
                type:GET_ACTIVITY,
                payload: info.data,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postActivity(payload){
    return async function (dispatch){
        let info = await axios.post("http://localhost:3001/activity", payload);
        return dispatch({
            type: POST_ACTIVITY,
            payload: info.data,
        })
    }
};

export function resetDetail(){ //para evitar que cuando elijo un pais, me muestre al principio el detalle de un pais previamente elegido
    return{
        type: RESET_DETAIL,
    }
}

export function resetState(){
    return{
        type: RESET_STATE,
    }
}