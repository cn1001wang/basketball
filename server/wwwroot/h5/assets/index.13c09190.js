import{h as t}from"./http.035739e7.js";const r={async getByMatchId(e){return await t.get(`/rest/games?matchId=${e}`)},async getById(e){return await t.get(`/rest/games/getById/${e}`)},async save(e){return await t.post("/rest/games",e)},async remove(e){return await t.delete(`/rest/games/${e}`)},async update(e,a){return await t.put(`/rest/games/${e}`,a)},async endGame(e){return await t.post(`/rest/games/endGame?gameId=${e}`)}};export{r as g};
