import axios from "axios";

const $host = axios.create({
    baseURL: "http://localhost:5002/api"
})

const $authHost = axios.create({
    baseURL: "http://localhost:5002/api"
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    console.log(config)
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}