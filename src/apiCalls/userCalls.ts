import axios from "axios";
import { GET_USERS, POST_URL } from "../config/config";
import IPost from "../model/IPost";
export const getUsers = async () => {
    return await axios.get(`${GET_USERS}`);
}
export const getPosts = async (userId: number) => {
    return await axios.get(`${POST_URL}?userId=${userId}`);
}
export const addPost = async (post: IPost) => {
    return await axios.post(`${POST_URL}`, post);
}



