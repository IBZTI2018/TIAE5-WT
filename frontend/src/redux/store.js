
import { createStore, applyMiddleware } from "redux";
import { setAxiosConfig } from 'redux-json-api';
import thunk from "redux-thunk";
import reducers from "./reducers/index";

const store = createStore(reducers, applyMiddleware(thunk));
store.dispatch(
  setAxiosConfig({
    baseURL: "/api",
    headers: {
      Authorization: "bearer" + Math.random(),
      Accept: "application/json"
    },
  })
);

export default store;
