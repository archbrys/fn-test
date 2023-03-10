import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProfile, IProfileStatus } from "../Profile/interface";
import { NAME, Status } from "./constants";

export const fetchStudents = createAsyncThunk(
  `${NAME}/fetchStudents`,
  async () => {
    const response = await axios({
      method: "get",
      url: "https://run.mocky.io/v3/79ebd782-efd6-469b-8dd5-663cf03406ad",
    });

    return response.data;
  },
);

export const getStatusValue = (profile: IProfile | undefined) => {
  let statusValue =
    Array.isArray(profile?.status) && !profile?.status.length
      ? "withdrawn"
      : profile?.status.reduce((a: IProfileStatus, b: IProfileStatus) =>
          a.date > b.date ? a : b,
        ).type || "withdrawn";

  return Status[statusValue];
};
