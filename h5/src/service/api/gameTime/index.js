import http from '@/service/http'

const gameTimeApi = {
  async add(data) {
    return await http.post(`/rest/gameTimes`, data)
  },
  async getTimesByGameId(gameId) {
    return await http.get(`/rest/gameTimes/getTimesByGameId?gameId=${gameId}`)
  },
  //   async remove(id) {
  //     return await http.delete(`/rest/gameTimes/${id}`)
  //   },
}

export default gameTimeApi
