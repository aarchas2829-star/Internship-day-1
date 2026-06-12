import axios from "axios";

const BASE_URL = "https://internship-day-1-production.up.railway.app";
};

export const addTask = async (
  title,
  status,
  priority,
  due_date
) => {
  return await axios.post(`${BASE_URL}/tasks`, {
    title,
    status,
    priority,
    due_date
  });
};

export const deleteTask = async (id) => {
  return await axios.delete(`${BASE_URL}/tasks/${id}`);
};

export const updateTask = async (id, title, status, priority, due_date) => {
  return await axios.put(`${BASE_URL}/tasks/${id}`, {
    title,
    status,
    priority,
    due_date
  });
};
