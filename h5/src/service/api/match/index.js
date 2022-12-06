//login.ts
import http from '@/service/http'

const matchApi = {
  async getMatches() {
    return await http.get(`/rest/matches`)
  },
  async saveMatch(data) {
    return await http.post(`/rest/matches`, data)
  },
  async removeMatch(id) {
    return await http.delete(`/rest/matches/${id}`)
  },
  async updateMatch(id, data) {
    return await http.put(`/rest/matches/${id}`, data)
  },
}

export default matchApi
