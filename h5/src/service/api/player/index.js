import http from '@/service/http'

const playerApi = {
  async get() {
    return await http.get(`/rest/players`)
  },
  async getById(id) {
    return await http.get(`/rest/players/${id}`)
  },
  async save(data) {
    return await http.post(`/rest/players`, data)
  },
  async remove(id) {
    return await http.delete(`/rest/players/${id}`)
  },
  async update(id, data) {
    return await http.put(`/rest/players/${id}`, data)
  },
}

export default playerApi
