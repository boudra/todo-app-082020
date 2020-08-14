import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from "react-redux";
import {addTodo, fetchTodos, submitTodo} from "./actions";

function App({loading, todos, addTodo, fetchTodos, submitTodo}) {
  useEffect(() => {
    fetchTodos();
  }, []);

  if(loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
    <p>Todo</p>
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
          submitTodo(e.target.text.value)
          e.target.text.value = "";
      }}>
        <input type="text" name="text" />
        <button>Submit</button>
      </form>
      <ul>
        {todos.map(todo => {
          return <li>{todo.text}</li>
        })}
      </ul>
      <button onClick={() => addTodo("another todo")}>Add todo</button>
      <button onClick={() => fetchTodos()}>Refresh</button>
    </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
    loading: state.loading
  };
}

export default connect(mapStateToProps, {addTodo, fetchTodos, submitTodo})(App);
