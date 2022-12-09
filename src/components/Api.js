import axios from "axios";

export async function get(url) {
    return await axios.get(url, {
        headers: {
            authorization: `bearer ${window.localStorage.getItem('token')}`
        }
    })
        .catch(err => {
            window.localStorage.removeItem('token')
            window.location.href = '/'
            return err
        })
}

export async function post(url, data) {
    return await axios.post(url, data, {
        headers: {
            authorization: `bearer ${window.localStorage.getItem('token')}`
        }
    })
        .catch(err => {
            window.localStorage.removeItem('token')
            window.location.href = '/'
            return err
        })
}