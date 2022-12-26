//login.ts
import http from '@/service/http'

const teamApi = {
  async get() {
    return await http.get(`/rest/teams`)
  },
  async getById(id) {
    return await http.get(`/rest/teams/getById/${id}`)
  },
  async save(data) {
    return await http.post(`/rest/teams`, data)
  },
  async remove(id) {
    return await http.delete(`/rest/teams/${id}`)
  },
  async update(id, data) {
    return await http.put(`/rest/teams/${id}`, data)
  },
}

export default teamApi
