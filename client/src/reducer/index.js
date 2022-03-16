import {
    GET_COUNTRIES,
    GET_BY_NAME,
    GET_DETAIL,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    POST_ACTIVITY,
    GET_ACTIVITIES
} from '../actions/index.js';

const initialState = {
    countries: [], // contiene todos los paises
    allCountries: [], // copia de "countries" para que, al hacer cambios, no me modifique el estado con el total de la info
    activities: [],
    detail: [],
}

function rootReducer (state= initialState, action){
    switch (action.type){
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            };
        case GET_BY_NAME:
                return{
                    ...state,
                    countries: action.payload,
                    allCountries: action.payload
                };
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            };
        case FILTER_BY_CONTINENT:
            return{
                ...state,
                allCountries: state.countries.filter(el=> el.continent === action.payload)
            };
        case FILTER_BY_ACTIVITY:
            const allCountries = state.allCountries
            const filterActivity = action.payload === 'All'? allCountries : [...allCountries]?.filter(el=> el.activities?.includes(action.payload))
            return{
                ...state,
                countries: filterActivity          
            };
        case ORDER_BY_NAME:
            let sort = action.payload === 'asc'?
            state.countries.sort(function (a,b){
                if(a.name>b.name){
                    return 1;
                }
                if(b.name>a.name){
                    return -1
                }
                return 0;
            }) :
            state.countries.sort(function(a,b){
                if(a.name>b.name){
                    return -1;
                }
                if(b.name>a.name){
                    return 1;
                }
                return 0
            });
            return{
                ...state,
                countries: sort
            };
        case ORDER_BY_POPULATION:
            let popSort = action.payload === 'high'?
            state.countries.sort(function(a,b){
                if(a.population>b.population){
                    return 1
                }
                if (b.population> a.population){
                    return -1
                }
                return 0
            }) :
            state.countries.sort(function(a,b){
                if(a.population>b.population){
                    return -1
                }
                if(b.population>a.population){
                    return 1
                }
                return 0
            })
            return{
                ...state,
                countries: popSort
            };
        case POST_ACTIVITY:
            return{
                ...state
            };  
        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            }                 
        default:
            return state;    
    }
}

export default rootReducer;
