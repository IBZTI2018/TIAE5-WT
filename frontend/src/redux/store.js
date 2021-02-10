
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import offers from "./offers";
import auth from "./auth";
import hotels from "./hotels";
import titles from "./titles";
import countries from "./countries";
import hotelrooms from "./hotelrooms";
import priceranges from "./priceranges";
import roomequipments from "./roomequipments";
import layout from "./layout";

let middlewares = [];
const reducers = {
  offers,
  auth,
  hotels,
  titles,
  countries,
  hotelrooms,
  priceranges,
  roomequipments,
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
