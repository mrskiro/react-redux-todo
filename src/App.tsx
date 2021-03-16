import * as React from "react";
import * as ReactRedux from "react-redux";
import { actions, RootState, TodoState } from "./store";
import "./App.css";

function App() {
  const dispatch = ReactRedux.useDispatch();
  const { todoList } = ReactRedux.useSelector((state: RootState) => state.todo);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((json) => dispatch(actions.set(json as TodoState[])));
  }, []);

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default App;
