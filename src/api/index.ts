const endpoint = "https://jsonplaceholder.typicode.com/posts";

export const getTodoList = async () => {
  const res = await fetch(endpoint);
  return res.json();
};

export const addTodo = async (title: string) => {
  const res = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      title,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return res.json();
};

export const deleteTodoById = async (id: number) => {
  fetch(`${endpoint}/${id}`, {
    method: "DELETE",
  });
};
