import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import employeeReducer from './reducers/employeeReducer';
const initialState ={};

const middleware = [thunk];

const reducer = combineReducers ({
    employee: employeeReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(  
                        reducer, 
                        initialState ,
                        composeEnhancers(
                            applyMiddleware(...middleware) )
                        );
export default store;