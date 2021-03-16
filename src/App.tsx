import * as React from "react";
import * as ReactRedux from "react-redux";
import { actions, RootState, TodoState, addTodo } from "./store";
import "./App.css";

function App() {
  const dispatch = ReactRedux.useDispatch();
  const { todoList } = ReactRedux.useSelector((state: RootState) => state.todo);

  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((json) => dispatch(actions.set(json as TodoState[])));
  }, []);

  const onSubmit = () => {
    if (!title.length) return;
    dispatch(addTodo({ title: title }));
    setTitle("");
  };

  return (
    <>
      <div>
        <p>todoを追加する</p>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <button type="submit" onClick={onSubmit}>
        追加
      </button>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
