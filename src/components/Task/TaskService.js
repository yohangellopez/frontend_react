import React, { Component } from 'react'
import axios from 'axios'

const API ='http://localhost/laravel_react/ApiTask/public/api/task'

export const getTasks = async() =>{
    const res = await fetch(`${API}/lista`)
    const data = await res.json();
    return data;
}

export const getTasksFilter = async(filtro) =>{
    const res = await fetch(`${API}/lista/${filtro}`)
    const data = await res.json();
    return data;
}

export const createTask = async(task) =>{
    const res = await axios.post(`${API}/registro`, task)
    return res;
}

export const getTask = async(id) =>{
    const res = await fetch(`${API}/task/${id}`)
    const data = await res.json();
    return data;
}

export const updateTask = async(id,task) =>{
    const res = await axios.put(`${API}/update/${id}`, task)
    return res;
}

export const modifyStatus = async (id)=>{
    const res = await axios.put(`${API}/modify/${id}`);
    return res;
}

export const deleteTask = async(id) =>{
    const res = await axios.delete(`${API}/delete/${id}`)
    return res;
}