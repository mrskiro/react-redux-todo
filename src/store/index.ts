import {
  configureStore,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { addTodo, deleteTodoById } from "../api";

export type TodoState = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const initialState = {
  todoList: [] as TodoState[],
};

export const asyncAddTodo = createAsyncThunk(
  "addTodo",
  async (arg: { title: string }) => {
    const res = await addTodo(arg.title);
    return res;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<TodoState[]>) => {
      state.todoList = action.payload;
    },
    delete: (state, action: PayloadAction<number>) => {
      deleteTodoById(action.payload);
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncAddTodo.fulfilled, (state, action) => {
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
