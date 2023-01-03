import axios from 'axios'
import router from '../router/index.ts'
import { showDialog } from 'vant'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/admin/api',
  // baseURL: 'http://localhost:3000/admin/api'
})
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err.response.data.message) {
      if (err.response.status === 401) {
        router.push('/login')
      } else {
        showDialog({
          title: '温馨提示',
          message: err.response.data.message,
        })
      }
    }
    return Promise.reject(err)
  }
)

export default http
