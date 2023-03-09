import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import studentReducer from "../modules/Students/reducer";
import courseReducer from "../modules/Course/reducer";
import profileReducer from "../modules/Profile/reducer";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    course: courseReducer,
    profile: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
