import{d as _,g as f,F as C,B,C as F,h as w,i as a,w as l,p as y,j as g,o as v,u as s,k as p,l as V}from"./vendor.871c335e.js";import{s as t}from"./index.e984ddd3.js";import"./http.eceb79a4.js";import{u as h}from"./index.0d991bc5.js";import{_ as x,r as b}from"./index.68a1c8b4.js";const d=n=>(y("data-v-36744ed0"),n=n(),g(),n),D={class:"py-5"},E=d(()=>p("h1",{class:"text-center py-2"},"\u65B0\u7528\u6237\u6CE8\u518C",-1)),j=d(()=>p("div",{class:"py-4"},null,-1)),k=V("\u6CE8\u518C\u65B0\u7528\u6237"),S=_({setup(n){const e=f({username:"",password:"",passwordConfirm:""});async function i(){if(!e.username)return t({type:"fail",message:"\u8BF7\u8F93\u5165\u7528\u6237\u540D"});if(!e.password)return t({type:"fail",message:"\u8BF7\u8F93\u5165\u5BC6\u7801"});if(e.password.length<6)return t({type:"fail",message:"\u8BF7\u8F93\u5165\u8D85\u8FC7\u516D\u4F4D\u7684\u5BC6\u7801"});if(e.password!=e.passwordConfirm)return t({type:"fail",message:"\u4E24\u6B21\u5BC6\u7801\u8F93\u5165\u4E0D\u4E00\u81F4"});await h.signup(e),t({type:"success",message:"\u6CE8\u518C\u6210\u529F\uFF01"}),b.push("/login")}return(I,u)=>{const r=C,m=B,c=F;return v(),w("div",D,[E,a(c,{inset:""},{default:l(()=>[a(r,{modelValue:s(e).username,"onUpdate:modelValue":u[0]||(u[0]=o=>s(e).username=o),name:"username",label:"\u7528\u6237\u540D",placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D"},null,8,["modelValue"]),a(r,{modelValue:s(e).password,"onUpdate:modelValue":u[1]||(u[1]=o=>s(e).password=o),name:"password",label:"\u5BC6\u7801",placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",type:"password"},null,8,["modelValue"]),a(r,{modelValue:s(e).passwordConfirm,"onUpdate:modelValue":u[2]||(u[2]=o=>s(e).passwordConfirm=o),name:"passwordConfirm",label:"\u786E\u8BA4\u5BC6\u7801",placeholder:"\u8BF7\u518D\u8F93\u5165\u4E00\u904D\u5BC6\u7801",type:"password"},null,8,["modelValue"]),j,a(m,{type:"success",block:"",onClick:i},{default:l(()=>[k]),_:1})]),_:1})])}}});var q=x(S,[["__scopeId","data-v-36744ed0"]]);export{q as default};
