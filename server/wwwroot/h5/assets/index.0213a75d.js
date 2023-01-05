import{d as f,r as h,c as d,o as m,a as g,b as E,I as v,e as y,f as A}from"./vendor.eba449fb.js";const I=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}};I();var _=(t,s)=>{const o=t.__vccOpts||t;for(const[a,e]of s)o[a]=e;return o};const L=f({name:"App"});function b(t,s,o,a,e,r){const n=h("router-view");return m(),d(n)}var P=_(L,[["render",b]]);const O="modulepreload",p={},R="/",i=function(s,o){return!o||o.length===0?s():Promise.all(o.map(a=>{if(a=`${R}${a}`,a in p)return;p[a]=!0;const e=a.endsWith(".css"),r=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${r}`))return;const n=document.createElement("link");if(n.rel=e?"stylesheet":O,e||(n.as="script",n.crossOrigin=""),n.href=a,document.head.appendChild(n),e)return new Promise((u,l)=>{n.addEventListener("load",u),n.addEventListener("error",l)})})).then(()=>s())},T=[{path:"/Login",name:"Login",component:()=>i(()=>import("./Login.3e6a7ffb.js"),["assets/Login.3e6a7ffb.js","assets/Login.e2bed473.css","assets/index.083647f0.css","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css","assets/http.1b1d5323.js","assets/index.2b0ff90f.js"])},{path:"/Signup",name:"Signup",component:()=>i(()=>import("./Signup.d38495d9.js"),["assets/Signup.d38495d9.js","assets/Signup.cd78afa4.css","assets/index.083647f0.css","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css","assets/http.1b1d5323.js","assets/index.2b0ff90f.js"])},{path:"/",name:"Home",redirect:"/game",component:()=>i(()=>import("./Home.1d0d3274.js"),["assets/Home.1d0d3274.js","assets/Home.99d51645.css","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css"]),children:[{path:"game",name:"game",component:()=>i(()=>import("./List.543e743d.js"),["assets/List.543e743d.js","assets/List.7b3b8440.css","assets/index.a5d75224.css","assets/index.e24870a9.css","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css","assets/index.298bcb96.js","assets/http.1b1d5323.js","assets/index.99d686af.js","assets/dayjs.min.5f938ecc.js","assets/_commonjsHelpers.0592d25c.js"]),meta:{tab:0}},{path:"team",name:"team",component:()=>i(()=>import("./Team.70bd8f52.js"),["assets/Team.70bd8f52.js","assets/Team.06d2cf27.css","assets/index.e24870a9.css","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css","assets/http.1b1d5323.js","assets/index.c934965c.js"]),meta:{tab:1}},{path:"setting",name:"setting",component:()=>i(()=>import("./Setting.09ea5e44.js"),["assets/Setting.09ea5e44.js","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css"]),meta:{tab:2}}]},{path:"/match/add",name:"MatchAdd",component:()=>i(()=>import("./add.fa4eac4f.js"),["assets/add.fa4eac4f.js","assets/index.083647f0.css","assets/index.66b21258.css","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css","assets/index.298bcb96.js","assets/http.1b1d5323.js"])},{path:"/game/add",name:"GameAdd",component:()=>i(()=>import("./Add.6506bbf8.js"),["assets/Add.6506bbf8.js","assets/Add.4ca6678b.css","assets/index.083647f0.css","assets/index.b0536d7e.css","assets/index.66b21258.css","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css","assets/http.1b1d5323.js","assets/index.99d686af.js","assets/dayjs.min.5f938ecc.js","assets/_commonjsHelpers.0592d25c.js","assets/index.c934965c.js"]),props:t=>({matchId:t.query.matchId,matchName:t.query.matchName})},{path:"/team/add",name:"TeamAdd",component:()=>i(()=>import("./Add.725b0492.js"),["assets/Add.725b0492.js","assets/index.083647f0.css","assets/index.66b21258.css","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css","assets/http.1b1d5323.js","assets/index.c934965c.js","assets/index.d6e5684e.js","assets/_commonjsHelpers.0592d25c.js"])},{path:"/team/edit",name:"TeamEdit",component:()=>i(()=>import("./Add.725b0492.js"),["assets/Add.725b0492.js","assets/index.083647f0.css","assets/index.66b21258.css","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css","assets/http.1b1d5323.js","assets/index.c934965c.js","assets/index.d6e5684e.js","assets/_commonjsHelpers.0592d25c.js"]),props:t=>({teamId:t.query.teamId})},{path:"/team/detail/:id",name:"TeamDetail",component:()=>i(()=>import("./Detail.b8153ef5.js"),["assets/Detail.b8153ef5.js","assets/Detail.2cd9a5be.css","assets/index.b0536d7e.css","assets/index.e24870a9.css","assets/index.66b21258.css","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css","assets/http.1b1d5323.js","assets/index.c934965c.js"]),props:!0},{path:"/player/add",name:"PlayerAdd",component:()=>i(()=>import("./Add.8a5d1fa1.js"),["assets/Add.8a5d1fa1.js","assets/Add.776c03cf.css","assets/index.a5d75224.css","assets/index.083647f0.css","assets/index.66b21258.css","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css","assets/http.1b1d5323.js","assets/index.d6e5684e.js","assets/_commonjsHelpers.0592d25c.js"]),props:t=>({teamId:t.query.teamId,playerId:t.query.playerId})},{path:"/game/action",name:"GameAction",component:()=>i(()=>import("./Action.0c82e4e9.js"),["assets/Action.0c82e4e9.js","assets/Action.ab5625a3.css","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css","assets/http.1b1d5323.js","assets/index.99d686af.js","assets/gameEventType.f52d3598.js"]),props:t=>({id:t.query.id})},{path:"/game/result",name:"GameResult",component:()=>i(()=>import("./Result.34bda2e4.js"),["assets/Result.34bda2e4.js","assets/Result.6d5df373.css","assets/index.66b21258.css","assets/vendor.eba449fb.js","assets/vendor.aeb38271.css","assets/gameEventType.f52d3598.js","assets/http.1b1d5323.js","assets/index.99d686af.js"]),props:t=>({id:t.query.id})}],D=g({history:E(),routes:T});const j={props:{radius:[String,Number],size:[String,Number],logo:String,round:Boolean},data(){return{}}};function V(t,s,o,a,e,r){const n=v;return m(),d(n,{width:o.size,height:o.size,fit:"cover",radius:o.radius,round:o.round,src:o.logo||"https://itianwangmlmw.oss-cn-shanghai.aliyuncs.com/cdn/outsource/basketball/logo.png"},null,8,["width","height","radius","round","src"])}var S=_(j,[["render",V]]);const c=y(P);c.component("team-logo",S);c.use(D);c.use(A());c.mount("#app");export{_,S as a,D as r};
