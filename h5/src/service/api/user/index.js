//login.ts
import http from '@/service/http'

const userApi = {
  async login(form) {
    return await http.post(`/login`, form)
  },
  async signup(form) {
    return await http.post(`/signup`, form)
  },
}

export default userApi
