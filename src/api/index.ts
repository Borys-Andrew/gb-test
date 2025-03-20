// import { User } from "@/types";
import { User } from "@/types";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const getUsers = async (): Promise<AxiosResponse<User[]>> => {
  try {
    const res = await axios.get("/users");

    return res.data;
  } catch (error) {
    throw error;
  }
};
console.log("🚀 ~ getUsers ~ getUsers:", getUsers());
