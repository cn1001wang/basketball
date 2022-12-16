//login.ts
import http from '@/service/http'

const gameApi = {
  async getByMatchId(matchId) {
    return await http.get(`/rest/games/get?matchId=${matchId}`)
  },
  async getById(id) {
    return await http.get(`/rest/games/${id}`)
  },
  async save(data) {
    return await http.post(`/rest/games`, data)
  },
  async remove(id) {
    return await http.delete(`/rest/games/${id}`)
  },
  async update(id, data) {
    return await http.put(`/rest/games/${id}`, data)
  },
}

export default gameApi
