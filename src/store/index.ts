import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TodoState = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const initialState = {
  todoList: [] as TodoState[],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<TodoState[]>) => {
      state.todoList = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

export const { reducer, actions } = todoSlice;

export type RootState = ReturnType<typeof store.getState>;
