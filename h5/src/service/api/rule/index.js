//login.ts
import http from '@/service/http'

const ruleApi = {
  async get() {
    return await http.get(`/rest/rules`)
  },
  async getById(id) {
    return await http.get(`/rest/rules/getById/${id}`)
  },
  async save(data) {
    return await http.post(`/rest/rules`, data)
  },
  async remove(id) {
    return await http.delete(`/rest/rules/${id}`)
  },
  async update(id, data) {
    return await http.put(`/rest/rules/${id}`, data)
  },
}

export default ruleApi
