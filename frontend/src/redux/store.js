
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import search from "./search";
import offers from "./offers";
import auth from "./auth";

const reducers = {
  search,
  offers,
  auth
}

const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(thunk),
  )
);

export default store;
