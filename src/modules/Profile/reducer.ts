import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { fetchProfiles } from "./actions";
import { NAME } from "./constants";

export interface IProfileState {
  profiles: [];
  status: "idle" | "loading" | "failed";
}

const initialState: IProfileState = {
  profiles: [],
  status: "idle",
};

export const profileSlice = createSlice({
  name: NAME,
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = "idle";
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file.
export const profileState = (state: RootState) => state.profile;

export default profileSlice.reducer;
