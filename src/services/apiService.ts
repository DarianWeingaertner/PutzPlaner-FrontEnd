// src/services/apiService.ts
import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL as string;

const apiClient = axios.create({
    baseURL: baseURL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export const getTasks = async () => {
    const response = await apiClient.get('/cleaningTasks');
    return response.data;
};

export const addTask = async (task: any) => {
    const response = await apiClient.post('/cleaningTasks', task);
    return response.data;
};

export const deleteTask = async (id: number) => {
    const response = await apiClient.delete(`/cleaningTasks/${id}`);
    return response.data;
};
