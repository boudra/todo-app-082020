const API_URL = process.env.REACT_APP_API_URL;

export function addTodo(text) {
  return {
    type: "ADD_TODO",
    payload: {
      text,
      completed: false,
    },
  };
}

export function submitTodo(text) {
  return function(dispatch) {
    fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ text, completed: false })
    }).then(r => r.json()).then(todos => dispatch(setTodos(todos)))
  }
}

export function setTodos(todos) {
  return {
    type: "SET_TODOS",
    payload: todos,
  };
}

export function setLoading(isLoading) {
  return {
    type: "SET_LOADING",
    payload: isLoading
  }
}

export function fetchTodos() {
  return function (dispatch) {
    dispatch(setLoading(true));

    fetch(`${API_URL}/todos`)
      .then((res) => res.json())
      .then((response) => dispatch(setTodos(response)))
      .finally(() => dispatch(setLoading(false)));
  }
}
