import{h as a}from"./http.70d49d85.js";const r={async getMatches(){return await a.get("/rest/matches")},async saveMatch(t){return await a.post("/rest/matches",t)},async removeMatch(t){return await a.delete(`/rest/matches/${t}`)},async updateMatch(t,e){return await a.put(`/rest/matches/${t}`,e)}};export{r as m};