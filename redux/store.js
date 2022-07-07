import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise';
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = applyMiddleware(thunk,promiseMiddleware);
const store = createStore(rootReducer, composeWithDevTools(middleware));

export default store;