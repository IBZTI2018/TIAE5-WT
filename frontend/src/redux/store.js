
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import search from "./search";
import offers from "./offers";

const store = createStore(combineReducers({ search, offers }), applyMiddleware(thunk));

export default store;
