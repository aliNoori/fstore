import{m as x,u as y,U as S,a0 as N,h as _,q as B,o as u,c as i,b as c,a as e,f as V,t as s,d as a,x as r,w as $,F as b,R as q,e as w,_ as C}from"./C435aXWD.js";const D={class:"transaction-container"},P={class:"transaction"},R={key:0,class:"error"},T={key:1,class:"message"},A={key:2},E={class:"transaction-details"},F=x({__name:"your-transaction-receive",setup(I){const{$toPersian:d,$toPersianDate:p,$formatPrice:m}=y(),v=S(),k=N(),l=_(null),n=_({});return B(()=>{const o=k.query;if(console.log(o),o.error)l.value=o.error;else{n.value={order_id:o.order_id,amount:o.amount,token:o.token,rrn:o.rrn,created_at:new Date().toLocaleString()};const t=o.auth_token;localStorage.setItem("auth_token",t),v.setToken(t)}}),(o,t)=>{const f=q,g=w;return u(),i(b,null,[c(f),e("div",D,[e("div",P,[l.value?(u(),i("h1",R,"Error")):V("",!0),l.value?(u(),i("p",T,s(l.value),1)):(u(),i("div",A,[t[5]||(t[5]=e("h1",null,"تراکنش موفق",-1)),t[6]||(t[6]=e("p",{class:"message"},"تراکنش شما با موفقیت به انجام رسید",-1)),e("div",E,[e("p",null,[t[0]||(t[0]=e("strong",null,"شناسه سفارش :",-1)),a(" "+s(r(d)(n.value.order_id)),1)]),e("p",null,[t[1]||(t[1]=e("strong",null,"مبلغ سفارش :",-1)),a(" "+s(r(m)(n.value.amount)),1)]),e("p",null,[t[2]||(t[2]=e("strong",null,"کد رهگیری :",-1)),a(" "+s(r(d)(n.value.token)),1)]),e("p",null,[t[3]||(t[3]=e("strong",null,"شماره پیگیری :",-1)),a(" "+s(r(d)(n.value.rrn)),1)]),e("p",null,[t[4]||(t[4]=e("strong",null,"تاریخ تراکنش :",-1)),a(" "+s(r(p)(n.value.created_at)),1)])])])),c(g,{to:"/",class:"back-button"},{default:$(()=>t[7]||(t[7]=[a("برگشت به صفحه اصلی")])),_:1})])])],64)}}}),M=C(F,[["__scopeId","data-v-5a7399f7"]]);export{M as default};
