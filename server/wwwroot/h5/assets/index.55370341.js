import{h as e}from"./http.70d49d85.js";const r={async get(){return await e.get("/rest/teams")},async getById(t){return await e.get(`/rest/teams/getById/${t}`)},async save(t){return await e.post("/rest/teams",t)},async remove(t){return await e.delete(`/rest/teams/${t}`)},async update(t,a){return await e.put(`/rest/teams/${t}`,a)}};export{r as t};
