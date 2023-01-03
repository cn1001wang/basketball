import{d as A,n as k,L as H,o as _,h as f,k as a,v as V,i as u,u as o,D as g,w,H as E,p as I,j as S,y as G,I as ue,P as U,M as L,O as M,G as R,l as q,s as N,B as ie,g as de,N as re,F as me,Q as ce,R as pe,U as ve,V as _e,C as fe,W as ye,X as he}from"./vendor.eba449fb.js";/* empty css              *//* empty css               *//* empty css               */import{_ as Y,a as J,r as O}from"./index.9c83f1b4.js";import{h as $}from"./http.035739e7.js";import{g as ge}from"./index.13c09190.js";import{d as Q}from"./dayjs.min.5f938ecc.js";import{t as W}from"./index.56ff4e43.js";import"./_commonjsHelpers.0592d25c.js";const be={async get(){return await $.get("/rest/rules")},async getById(l){return await $.get(`/rest/rules/getById/${l}`)},async save(l){return await $.post("/rest/rules",l)},async remove(l){return await $.delete(`/rest/rules/${l}`)},async update(l,v){return await $.put(`/rest/rules/${l}`,v)}};const X=l=>(I("data-v-9d03036a"),l=l(),S(),l),Ce=X(()=>a("p",{class:"chose-team-name"},"\u9009\u62E9\u7403\u961F",-1)),Fe={class:"chose-team-name"},ke=X(()=>a("div",{class:"text-center",style:{"line-height":"52px"}},"\u9009\u62E9\u7403\u961F",-1)),xe=["onClick"],Be={class:"flex-1 ml-4"},Ve={class:"team-name"},we={class:"team-desc"},Pe=A({props:{modelValue:String,name:String},emits:["update:modelValue","update:name","change"],setup(l,{emit:v}){const d=l,y=k();(function(){W.get().then(c=>{y.value=c})})();const t=k(!1),F=H(()=>y.value?y.value.find(c=>c._id===d.modelValue):{});function b(){t.value=!0}function x(c){v("update:modelValue",c._id),v("update:name",c.name),v("change",c),t.value=!1}return(c,C)=>{const i=G,s=J,m=ue,B=U;return _(),f(V,null,[a("div",{class:"text-center pr-3 pl-4",onClick:C[0]||(C[0]=h=>b())},[l.modelValue?(_(),f(V,{key:1},[u(s,{size:"36",radius:"8",logo:o(F).logo},null,8,["logo"]),a("p",Fe,g(o(F).name),1)],64)):(_(),f(V,{key:0},[u(i,{name:"add-o",size:"36",color:"#ababab"}),Ce],64))]),u(B,{show:t.value,"onUpdate:show":C[1]||(C[1]=h=>t.value=h),closeable:"",position:"bottom",style:{height:"80%"}},{default:w(()=>[ke,a("div",null,[(_(!0),f(V,null,E(y.value,h=>(_(),f("div",{key:h.id,class:"team-item",onClick:D=>x(h)},[u(m,{width:"40",height:"40",fit:"cover",radius:"8",src:h.logo||"https://itianwangmlmw.oss-cn-shanghai.aliyuncs.com/cdn/outsource/basketball/logo.png"},null,8,["src"]),a("div",Be,[a("p",Ve,g(h.name),1),a("p",we,"\u961F\u5458\uFF1A"+g(h.players?h.players.length:0),1)])],8,xe))),128))])]),_:1},8,["show"])],64)}}});var K=Y(Pe,[["__scopeId","data-v-9d03036a"]]);const $e=l=>(I("data-v-48120d92"),l=l(),S(),l),De=$e(()=>a("p",{class:"text-center",style:{"line-height":"52px"}},"\u9009\u62E9\u961F\u670D\u989C\u8272",-1)),Ae={class:"color-wrap"},Ee=["onClick"],Ue=A({props:{modelValue:String},emits:["update:modelValue"],setup(l,{emit:v}){const d=k(!1);function y(){d.value=!0}const t=["#fff","#F44336","#4CAF50","#2962FF","#000"];function F(b){v("update:modelValue",b),d.value=!1}return(b,x)=>{const c=U;return _(),f(V,null,[a("i",{class:"iconfont icon-jersey",style:L({color:l.modelValue}),onClick:y},null,4),u(c,{show:d.value,"onUpdate:show":x[0]||(x[0]=C=>d.value=C),closeable:"",position:"bottom",style:{height:"30%"}},{default:w(()=>[De,a("div",Ae,[(_(),f(V,null,E(t,C=>a("div",{style:L({backgroundColor:C}),class:"color-item",onClick:i=>F(C)},null,12,Ee)),64))])]),_:1},8,["show"])],64)}}});var Z=Y(Ue,[["__scopeId","data-v-48120d92"]]);const P=l=>(I("data-v-6bc74738"),l=l(),S(),l),Te={key:0},je={class:"team-title"},Ie={class:"title-name"},Se=P(()=>a("div",{class:"flex-1"},null,-1)),Ne=P(()=>a("span",{class:"text-grey mr-2"},"\u8BF7\u9009\u62E9",-1)),Ye={class:"title-item"},ze={style:{width:"4em",color:"#666"}},He=P(()=>a("div",{class:"flex-1"},null,-1)),Ge={class:"text-grey"},Le={class:"van-picker__toolbar"},Me=P(()=>a("div",{style:{width:"60px"}},null,-1)),Re=P(()=>a("div",{class:"van-picker__title van-ellipsis"},"\u9009\u62E9\u7403\u5458\u51FA\u573A",-1)),qe={class:"player-wrap"},Je={style:{width:"4em",color:"#666"}},Oe=P(()=>a("div",{class:"flex-1"},null,-1)),Qe=q(" \u51FA\u573A "),We=P(()=>a("div",{class:"mx-3"},null,-1)),Xe=q(" \u9996\u53D1 "),Ke=A({props:{team:{type:Object,required:!0},isTeama:{type:Boolean},activePlayers:{type:Array,required:!0},lineup:{type:Array,required:!0}},emits:["update:activePlayers","update:lineup"],setup(l,{emit:v}){const d=l,y=[{name:"\u65E0",value:""},{name:"\u5F97\u5206\u540E\u536B",value:"SG"},{name:"\u63A7\u7403\u540E\u536B",value:"PG"},{name:"\u5C0F\u524D\u950B",value:"SF"},{name:"\u5927\u524D\u950B",value:"PF"},{name:"\u4E2D\u950B",value:"C"}];function t(i){let s=y.find(m=>m.value===i);return s==null?void 0:s.name}const F=k(!1),b=k([]);(async()=>{let i=await W.getById(d.team.id);b.value=i.players,console.log(b.value)})();function x(i){return b.value.find(s=>s._id===i)}function c(i){let s=[...d.lineup],m=[...d.activePlayers];m.includes(i._id)?(m=m.filter(B=>B!==i._id),s.includes(i._id)&&(s=s.filter(B=>B!==i._id),v("update:lineup",s))):m.push(i._id),v("update:activePlayers",m)}function C(i){let s=[...d.lineup],m=[...d.activePlayers];if(console.log(s.length),s.length==5)return N({type:"fail",message:"\u6BCF\u961F\u9996\u53D1\u6700\u591A5\u540D\u7403\u5458"});s.includes(i._id)?s=s.filter(B=>B!==i._id):(s.push(i._id),m.includes(i._id)||(m.push(i._id),v("update:activePlayers",m))),v("update:lineup",s)}return(i,s)=>{const m=J,B=G,h=ie,D=U;return _(),f(V,null,[b.value.length?(_(),f("div",Te,[a("p",je,g(l.isTeama?"\u4E3B":"\u5BA2")+"\u961F\u7403\u5458\uFF08\u51FA\u573A"+g(l.team.lineup.length)+"\u4EBA\uFF5C\u9996\u53D1 "+g(l.team.activePlayers.length)+"\u4EBA\uFF09 ",1),a("div",{class:"title-item",onClick:s[0]||(s[0]=r=>F.value=!0)},[u(m,{size:"24",radius:"8",logo:l.team.logo},null,8,["logo"]),a("div",Ie,g(l.team.name),1),Se,Ne,u(B,{name:"arrow",color:"#999"})]),(_(!0),f(V,null,E(l.activePlayers,r=>(_(),f("div",Ye,[a("div",ze,g(x(r).number)+"\u53F7",1),a("span",null,g(x(r).name),1),He,a("div",Ge,g(t(x(r).position)),1),a("div",{class:M(["text-grey ml-4",[l.lineup.includes(r)?"text-success":"text-grey"]])},g(l.lineup.includes(r)?"\u9996\u53D1":"\u51FA\u573A"),3)]))),256))])):R("",!0),u(D,{show:F.value,"onUpdate:show":s[2]||(s[2]=r=>F.value=r),round:"",style:{height:"80%"},position:"bottom"},{default:w(()=>[a("div",Le,[Me,Re,a("button",{type:"button",class:"van-picker__confirm van-haptics-feedback",onClick:s[1]||(s[1]=r=>F.value=!1)}," \u786E\u8BA4 ")]),a("div",qe,[(_(!0),f(V,null,E(b.value,r=>(_(),f("div",{class:M(["player-item",[l.activePlayers.includes(r._id)&&"active-item"]])},[a("div",Je,g(r.number)+"\u53F7",1),a("span",null,g(r.name),1),Oe,u(h,{type:l.activePlayers.includes(r._id)?"primary":"default",size:"small",onClick:T=>c(r)},{default:w(()=>[Qe]),_:2},1032,["type","onClick"]),We,u(h,{type:l.lineup.includes(r._id)?"success":"default",size:"small",onClick:T=>C(r)},{default:w(()=>[Xe]),_:2},1032,["type","onClick"])],2))),256))])]),_:1},8,["show"])],64)}}});var ee=Y(Ke,[["__scopeId","data-v-6bc74738"]]);const Ze={class:"main-bg"},et={class:"bg-light-f2 py-4 mb-4"},tt={class:"text-center py-2 fs-xl"},at={class:"d-flex jc-between ai-center"},lt={class:"d-flex pl-3"},nt=a("div",{class:"fs-xxl"},"VS",-1),st={class:"d-flex pr-2"},ot={class:"bg-white mb-4"},ut={key:0,class:"main-bg"},it=a("div",{class:"py-2"},null,-1),gt=A({props:{matchId:String,matchName:String},setup(l){const v=l,d=k(0);let y=Q();const t=de({match:v.matchId,dateTime:Q().format("YYYY-MM-DD HH:mm"),rule:"",place:"",teama:{id:"",name:"",color:"",activePlayers:[],lineup:[],players:[]},teamb:{id:"",name:"",color:"",activePlayers:[],lineup:[],players:[]}}),F=k(["1"]),b=k([y.format("YYYY"),y.format("MM"),y.format("DD")]),x=k([y.format("HH"),y.format("mm")]),c=k([]),C=H(()=>{var p;return(p=c.value.find(e=>e.value===t.rule))==null?void 0:p.text}),i=k(!1),s=k(!1);(async()=>{let p=await be.get();c.value=p.map(e=>({text:e.name,value:e._id})),t.rule=p[0]._id})();function m(){}function B({selectedValues:p}){t.rule=p[0],s.value=!1}function h(p){t.teama.activePlayers=p.players.map(e=>e._id),t.teama.lineup=p.players.slice(0,5).map(e=>e._id),t.teama.players=p.players}function D(p){t.teamb.activePlayers=p.players.map(e=>e._id),t.teamb.lineup=p.players.slice(0,5).map(e=>e._id),t.teamb.players=p.players}function r(){d.value==0?O.back():d.value=0}async function T(){if(d.value==0){if(!t.teama.id||!t.teamb.id)return N({type:"fail",message:"\u8BF7\u9009\u62E9\u6BD4\u8D5B\u961F\u4F0D"});d.value=1}else await ge.save(t),N({type:"success",message:"\u521B\u5EFA\u6210\u529F\uFF01"}),O.back()}return(p,e)=>{const te=re,j=me,ae=ce,le=pe,ne=ve,z=U,se=_e,oe=fe;return _(),f(V,null,[u(te,{title:"\u521B\u5EFA\u6BD4\u8D5B","left-text":d.value?"\u4E0A\u4E00\u6B65":"\u53D6\u6D88","right-text":d.value?"\u5F00\u59CB":"\u4E0B\u4E00\u6B65","left-arrow":"",onClickLeft:r,onClickRight:T},null,8,["left-text","right-text"]),ye(a("div",Ze,[a("div",et,[a("p",tt,g(v.matchName),1),a("div",at,[a("div",lt,[u(K,{modelValue:o(t).teama.id,"onUpdate:modelValue":e[0]||(e[0]=n=>o(t).teama.id=n),name:o(t).teama.name,"onUpdate:name":e[1]||(e[1]=n=>o(t).teama.name=n),onChange:h},null,8,["modelValue","name"]),u(Z,{modelValue:o(t).teama.color,"onUpdate:modelValue":e[2]||(e[2]=n=>o(t).teama.color=n)},null,8,["modelValue"])]),nt,a("div",st,[u(Z,{modelValue:o(t).teamb.color,"onUpdate:modelValue":e[3]||(e[3]=n=>o(t).teamb.color=n)},null,8,["modelValue"]),u(K,{modelValue:o(t).teamb.id,"onUpdate:modelValue":e[4]||(e[4]=n=>o(t).teamb.id=n),name:o(t).teamb.name,"onUpdate:name":e[5]||(e[5]=n=>o(t).teamb.name=n),onChange:D},null,8,["modelValue","name"])])])]),a("div",ot,[u(oe,{inset:""},{default:w(()=>[u(j,{modelValue:o(t).dateTime,"onUpdate:modelValue":e[6]||(e[6]=n=>o(t).dateTime=n),"is-link":"",readonly:"",name:"dateTime",label:"\u6BD4\u8D5B\u65F6\u95F4",placeholder:"\u70B9\u51FB\u9009\u62E9\u6BD4\u8D5B\u65F6\u95F4",onClick:e[7]||(e[7]=n=>i.value=!0)},null,8,["modelValue"]),u(z,{show:i.value,"onUpdate:show":e[11]||(e[11]=n=>i.value=n),position:"bottom"},{default:w(()=>[u(ne,{title:"\u6BD4\u8D5B\u65F6\u95F4",tabs:["\u9009\u62E9\u65E5\u671F","\u9009\u62E9\u65F6\u95F4"],onConfirm:m,onCancel:e[10]||(e[10]=n=>i.value=!1)},{default:w(()=>[u(ae,{modelValue:b.value,"onUpdate:modelValue":e[8]||(e[8]=n=>b.value=n)},null,8,["modelValue"]),u(le,{modelValue:x.value,"onUpdate:modelValue":e[9]||(e[9]=n=>x.value=n)},null,8,["modelValue"])]),_:1})]),_:1},8,["show"]),u(j,{"model-value":o(C),"is-link":"",readonly:"",name:"rule",label:"\u6BD4\u8D5B\u89C4\u5219",placeholder:"\u9009\u62E9\u89C4\u5219",onClick:e[12]||(e[12]=n=>s.value=!0)},null,8,["model-value"]),u(z,{show:s.value,"onUpdate:show":e[15]||(e[15]=n=>s.value=n),position:"bottom"},{default:w(()=>[u(se,{modelValue:F.value,"onUpdate:modelValue":e[13]||(e[13]=n=>F.value=n),columns:c.value,onConfirm:B,onCancel:e[14]||(e[14]=n=>s.value=!1)},null,8,["modelValue","columns"])]),_:1},8,["show"]),u(j,{modelValue:o(t).place,"onUpdate:modelValue":e[16]||(e[16]=n=>o(t).place=n),label:"\u6BD4\u8D5B\u573A\u5730",placeholder:"\u8BF7\u8F93\u5165\u573A\u5730"},null,8,["modelValue"])]),_:1})])],512),[[he,d.value==0]]),d.value==1?(_(),f("div",ut,[u(ee,{activePlayers:o(t).teama.activePlayers,"onUpdate:activePlayers":e[17]||(e[17]=n=>o(t).teama.activePlayers=n),lineup:o(t).teama.lineup,"onUpdate:lineup":e[18]||(e[18]=n=>o(t).teama.lineup=n),team:o(t).teama,isTeama:""},null,8,["activePlayers","lineup","team"]),it,u(ee,{activePlayers:o(t).teamb.activePlayers,"onUpdate:activePlayers":e[19]||(e[19]=n=>o(t).teamb.activePlayers=n),lineup:o(t).teamb.lineup,"onUpdate:lineup":e[20]||(e[20]=n=>o(t).teamb.lineup=n),team:o(t).teamb},null,8,["activePlayers","lineup","team"])])):R("",!0)],64)}}});export{gt as default};
