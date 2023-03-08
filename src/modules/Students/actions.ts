import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NAME } from "./constants";

export const fetchStudents = createAsyncThunk(
  `${NAME}/fetchStudents`,
  async () => {
    const response = await axios({
      method: "get",
      url:
        "https://run.mocky.io/v3/79ebd782-efd6-469b-8dd5-663cf03406ad"
    });
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);