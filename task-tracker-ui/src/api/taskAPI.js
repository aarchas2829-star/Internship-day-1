import axios from "axios";

const BASE_URL ="http://localhost:8000";

console .log("BASE_URL =", BASE_URL);
export const getTasks = async () => {
  return await axios.get(`${BASE_URL}/tasks`);
};

export const addTask = async (title, status, priority) => {
  return await axios.post(`${BASE_URL}/tasks`, {
    title,
    status,
    priority
  });
};

export const deleteTask = async (id) => {
  return await axios.delete(`${BASE_URL}/tasks/${id}`);
};

export const updateTask = async (id, title) => {
  return await axios.put(`${BASE_URL}/tasks/${id}`, {
    title: title,
    status: "todo",
    priority: "low"
  });
};