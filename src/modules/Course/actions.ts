import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NAME } from "./constants";

export const fetchCourses = createAsyncThunk(
  `${NAME}/fetchCourse`,
  async () => {
    const response = await axios({
      method: "get",
      url: "https://run.mocky.io/v3/34bdbb5f-70c0-41ce-aa0c-2bf46befa477",
    });

    return response.data;
  },
);
