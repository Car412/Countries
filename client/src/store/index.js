import { createStore, applyMiddleware} from 'redux'; // despacha accionea asíncronas
import {composeWithDevTools} from 'redux-devtools-extension'; // anida middlewares
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
    );

export default store; 