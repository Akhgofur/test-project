import axios from "axios"

export const jsonPlaceHolderUrl = "https://jsonplaceholder.typicode.com/"

export const baseUrl = "https://test-users-server.onrender.com/"

const instance = axios.create({
    baseURL: baseUrl
})

export default instance