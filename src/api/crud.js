import axios from "axios";

const baseUrl = import.meta.env.VITE_CRUD_URL;

const api = axios.create({
  baseURL: baseUrl,
  timeout: 2000,
});

export const getUsers = async () => {
  const data = await api.get("");
  return data.data;
};

export const deleteUsers = async (id) => {
  const deleted = await api.delete(id);
  return deleted;
};

export const editUsers = async (id, updatedUser) => {
  try {
    const res = await api.put(`${baseUrl}/${id}`, updatedUser);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addUsers = async (addUser) => {
  try {
    const res = await api.post(baseUrl, addUser);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
