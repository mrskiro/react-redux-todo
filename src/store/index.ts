import {
  configureStore,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export type TodoState = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const initialState = {
  todoList: [] as TodoState[],
};

export const addTodo = createAsyncThunk(
  "addTodo",
  async (arg: { title: string }) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: arg.title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    return res.json();
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<TodoState[]>) => {
      state.todoList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todoList = [action.payload, ...state.todoList];
    });
  },
});

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

export const { reducer, actions } = todoSlice;

export type RootState = ReturnType<typeof store.getState>;
