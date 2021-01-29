import { combineReducers } from "redux";
import { reducer as api } from 'redux-json-api';
import search from "./search";

export default combineReducers({ api, search });
