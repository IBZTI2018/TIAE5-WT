
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import search from "./search";
import offers from "./offers";

const reducers = {
  search,
  offers,
}

const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
