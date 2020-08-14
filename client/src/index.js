import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as Redux from "redux";
import { Provider } from "react-redux";
import ReduxThunk from 'redux-thunk';

const initialState = {
  todos: [],
  loading: false
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };

    case "SET_TODOS":
      return { ...state, todos: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

const identity = (store) => (next) => (action) => {
  next(action);
};

const logger = (store) => (next) => (action) => {
  console.log("action", action);
  console.log("before state", store.getState());
  const result = next(action);
  console.log("after state", store.getState());
  return result;
};


const store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(ReduxThunk, logger)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
