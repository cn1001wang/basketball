//login.ts
import http from '@/service/http'

const gameEventApi = {
  async getEventsByGameId(gameId) {
    return await http.get(`/rest/gameEvents/getEventsByGameId?gameId=${gameId}`)
    // return await http.get('/rest/gameEvents')
  },
  async getById(id) {
    return await http.get(`/rest/gameEvents/getById/${id}`)
  },
  async add(data) {
    return await http.post(`/rest/gameEvents`, data)
  },
  async remove(id) {
    return await http.delete(`/rest/gameEvents/${id}`)
  },
}

export default gameEventApi
