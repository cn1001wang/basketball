const v=function({type:i,message:d,duration:a=2e3}){a=isNaN(a)?2e3:a;var e=document.createElement("div");e.className="van-popup van-popup--center van-toast van-toast--middle van-toast--success";let n=document.createElement("i");i==="success"?(n.className="van-badge__wrapper van-icon van-icon-success van-toast__icon",e.appendChild(n)):i==="fail"?(n.className="van-badge__wrapper van-icon van-icon-fail van-toast__icon",e.appendChild(n)):e.classList.add("van-toast--text");const s=document.createElement("span");s.className="van-toast__text",s.innerHTML=d,e.appendChild(s),document.body.appendChild(e),c&&clearTimeout(c);var c=setTimeout(function(){var t=.5;e.style.webkitTransition="-webkit-transform "+t+"s ease-in, opacity "+t+"s ease-in",e.style.opacity="0",o&&clearTimeout(o);var o=setTimeout(function(){document.body.removeChild(e)},t*1e3)},a)};export{v as s};