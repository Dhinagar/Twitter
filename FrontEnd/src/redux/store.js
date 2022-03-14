import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { Reducers } from "./reducers/index";

const store = createStore(Reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
    serialize: true
}))

export default store