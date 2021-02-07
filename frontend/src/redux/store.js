
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import search from "./search";
import offers from "./offers";
import auth from "./auth";
import hotels from "./hotels";
import hotelrooms from "./rooms";
import hotelequipments from "./hotelequipments";
import hotelroomequipments from "./hotelroomequipments";
import titles from "./titles";
import countries from "./countries";
import layout from "./layout";

let middlewares = [];
const reducers = {
  search,
  offers,
  auth,
  hotels,
  hotelrooms,
  hotelequipments,
  hotelroomequipments,
  titles,
  countries,
  layout
}

// Very elaborate check to make sure our store also works without the Redux Chrome addon
//
// The documentation at github.com/zalmoxisus/redux-devtools-extension suggests a nice
// one-liner to add this, however, that causes a type error for every user without the
// dev tools installed (Issue: github.com/zalmoxisus/redux-devtools-extension/issues/413)
//
// This makes sure that the devtools extension middleware is only used if available!
if (typeof(window.__REDUX_DEVTOOLS_EXTENSION__) !== 'undefined') {
  middlewares = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )
} else {
  middlewares = applyMiddleware(thunk)
}

const store = createStore(combineReducers(reducers), middlewares);

export default store;
