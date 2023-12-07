import axios from "../utils/axios"

// USERS

export const getUsers = async () => axios.get("users").then(res => res.data).catch(err => err)

export const createUser = async (user) => axios.post(`users`, user).then(res => res).catch(err => err)

export const updateUser = async (user) => axios.put(`users/${user?.id}`, user).then(res => res).catch(err => err)

export const deleteUser = async (id) => axios.delete(`users/${id}`).then(res => res).catch(err => err)