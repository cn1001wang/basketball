import{d as g,q as f,n as y,J as k,y as x,I as b,E as C,h as n,k as e,i,v as l,H as D,c as j,G as w,o as a,D as u}from"./vendor.eba449fb.js";/* empty css               */import{r as d}from"./index.2124cb28.js";import"./http.70d49d85.js";import{t as F}from"./index.55370341.js";const B={class:"page-header"},E=e("div",{class:"page-header-action"},null,-1),T=e("div",null,"\u7403\u961F",-1),I={class:"page-header-action"},N={class:"main-bg"},V=["onClick"],A={class:"flex-1 ml-4"},$={class:"team-name"},q={class:"team-desc"},z=e("span",null," | ",-1),G=e("span",null,"2\u573A 2\u80DC 0\u8D1F",-1),P=g({setup(H){function _(c){d.push(`/team/detail/${c}`)}function r(){d.push("/team/add")}const m=f(),s=y();async function o(){s.value=await F.get()}return o(),k(()=>m,async()=>{o()}),(c,J)=>{const p=x,h=b,v=C;return a(),n(l,null,[e("div",B,[E,T,e("div",I,[i(p,{name:"plus",size:"22",onClick:r})])]),e("div",N,[e("ul",null,[(a(!0),n(l,null,D(s.value,t=>(a(),n("li",{class:"team-item",onClick:L=>_(t._id)},[i(h,{width:"56",height:"56",fit:"cover",radius:"8",src:t.logo||"https://itianwangmlmw.oss-cn-shanghai.aliyuncs.com/cdn/outsource/basketball/logo.png"},null,8,["src"]),e("div",A,[e("p",$,u(t.name),1),e("div",q,[e("span",null,u(t.players.length)+"\u540D\u961F\u5458",1),z,G])])],8,V))),256))]),!s.value||!s.value.length?(a(),j(v,{key:0,description:"\u6682\u65E0\u7403\u961F"})):w("",!0)])],64)}}});export{P as default};