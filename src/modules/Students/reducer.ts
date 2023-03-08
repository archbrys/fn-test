import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { fetchStudents } from './actions';
import { NAME } from './constants';

export interface IStudentsState {
  students: [];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IStudentsState = {
  students: [],
  status: 'idle',
};


export const counterSlice = createSlice({
  name: NAME,
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'idle';
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.status = 'failed';
      });
  },
});


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const studentState = (state: RootState) => state.student;

export default counterSlice.reducer;
