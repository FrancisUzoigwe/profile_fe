
import axios from "axios"
import Swal from "sweetalert2"

// const url: string = "http://localhost:2345"
const url: string = "https://profile-practice.onrender.com"

export const spinUpApi = async () => {
    try {
        return await axios.get(url).then((res) => {
            return res.data
        })
    } catch (error: any) {
        throw new Error(error?.message)
    }
}


export const registerApi = async (data: any) => {
    try {
        return await axios.post(`${url}/api/v1/register`, data).then((res) => {
            Swal.fire({
                titleText: "Account Successfully Created",
                icon: "success",
                text: `${res.data.message}`,
                timerProgressBar: true,
                timer: 3000
            })
            return res.data.data
        })
    } catch (error: any) {
        Swal.fire({
            titleText: "Error occured",
            icon: "error",
            text: `${error}`,
            timerProgressBar: true,
            timer: 3000
        })
    }
}


export const signinApi = async (data: any) => {
    try {
        return await axios.post(`${url}/api/v1/login`, data).then((res) => {
            return res.data.data
        })
    } catch (error: any) {
        Swal.fire({
            titleText: "Error occured",
            icon: "error",
            text: `${error.response.data.message}`,
            timerProgressBar: true,
            timer: 3000
        })
    }
}


export const getAllAccount = async () => {
    try {
        return await axios.get(`${url}/api/v1/get-all-details`).then((res) => {
            return res.data.data
        })
    } catch (error: any) {
        console.log(error.message)
    }
}

export const updateAccountImage = async (userID: any, data: any) => {
    try {
        const config: any = {
            "content-type": "multipart/form-data"
        }
        return await axios.patch(`${url}/api/v1/${userID}/update-details`, data, config).then((res: any) => {
            return res.data.data
        })
    } catch (error: any) {
        throw new Error(error.message)
    }
}