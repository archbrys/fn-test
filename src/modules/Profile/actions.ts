import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NAME } from "./constants";

export const fetchProfiles = createAsyncThunk(
  `${NAME}/fetchProfile`,
  async () => {
    const response = await axios({
      method: "get",
      url: "https://run.mocky.io/v3/214aef9d-b18a-4188-b55f-a25046408a7e",
    });
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);
