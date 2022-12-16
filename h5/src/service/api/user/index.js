//login.ts
import http from '@/service/http'

const userApi = {
  async login(form) {
    return await http.post(`/login`, form)
  },
}

export default userApi
