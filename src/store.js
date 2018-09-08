import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'

const rootReducer = combineReducers({
    movieBrowser: reducer
});
const loggerMiddleware = createLogger();
// const enhancer = applyMiddleware(thunk, loggerMiddleware)
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk, loggerMiddleware),
    // other store enhancers if any
);
const store = createStore(rootReducer , {},  enhancer);

//only for dev
window.store = store;

export default store;