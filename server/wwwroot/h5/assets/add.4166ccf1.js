import{d as B,g as F,N as f,F as _,C as E,K as D,h as g,i as u,w as l,v as b,s as r,o as v,u as o}from"./vendor.eba449fb.js";/* empty css              *//* empty css               */import{r as m}from"./index.9c83f1b4.js";import{m as x}from"./index.a4a4f348.js";import"./http.035739e7.js";const N=B({setup(h){const e=F({name:"",logo:""});function i(){m.back()}async function n(){if(!e.name)return r({type:"fail",message:"\u8BF7\u8F93\u5165\u8D5B\u4E8B\u540D"});await x.saveMatch(e),r({type:"success",message:"\u521B\u5EFA\u6210\u529F\uFF01"}),m.back()}return(V,a)=>{const p=f,s=_,c=E,d=D;return v(),g(b,null,[u(p,{title:"\u521B\u5EFA\u8D5B\u4E8B","left-text":"\u8FD4\u56DE","right-text":"\u5B58\u50A8","left-arrow":"",onClickLeft:i,onClickRight:n}),u(d,{onSubmit:n},{default:l(()=>[u(c,{inset:""},{default:l(()=>[u(s,{modelValue:o(e).name,"onUpdate:modelValue":a[0]||(a[0]=t=>o(e).name=t),name:"\u8D5B\u4E8B\u540D\u79F0",label:"\u8D5B\u4E8B\u540D\u79F0",placeholder:"\u8BF7\u8F93\u5165\u8D5B\u4E8B\u540D\u79F0",rules:[{required:!0,message:"\u8BF7\u586B\u5199\u8D5B\u4E8B\u540D\u79F0"}]},null,8,["modelValue"]),u(s,{modelValue:o(e).logo,"onUpdate:modelValue":a[1]||(a[1]=t=>o(e).logo=t),type:"password",name:"\u56FE\u6807",label:"\u56FE\u6807",placeholder:"\u56FE\u6807",rules:[{required:!0,message:"\u8BF7\u586B\u5199\u56FE\u6807"}]},null,8,["modelValue"])]),_:1})]),_:1})],64)}}});export{N as default};