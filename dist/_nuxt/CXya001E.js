import{_ as m,u as w,g as p,m as v,c as n,a as t,t as o,q as l,F as y,r as f,o as r,n as h}from"./B4ua99p3.js";const g={class:"wallet-container"},x={class:"wallet-card"},k={class:"wallet-balance"},B={class:"transaction-list"},D={class:"transaction-type"},W={__name:"my-wallet",setup($){const{$axios:_,$toPersian:c,$formatPrice:i}=w(),d=p({}),u=p([]);return v(async()=>{try{const a=await _.get("user/my/wallet");d.value=a.data.wallet,u.value=a.data.wallet.transactions}catch(a){console.error("خطا در دریافت اطلاعات کیف پول:",a)}}),(a,s)=>(r(),n("div",g,[t("div",x,[s[1]||(s[1]=t("div",{class:"wallet-header"},[t("h2",null,"کیف پول من")],-1)),t("div",k,[s[0]||(s[0]=t("span",null,"موجودی: ",-1)),t("strong",null,o(l(c)(l(i)(d.value.balance)))+" تومان",1)])]),t("div",B,[s[2]||(s[2]=t("h3",{class:"transaction-title"},"تراکنش‌ها",-1)),t("ul",null,[(r(!0),n(y,null,f(u.value,e=>(r(),n("li",{key:e.id,class:"transaction-item"},[t("span",D,o(e.type==="deposit"?"واریز":"برداشت"),1),t("span",{class:h(["transaction-amount",e.type==="deposit"?"deposit":"withdrawal"])},o(l(c)(l(i)(e.amount)))+" تومان ",3)]))),128))])])]))}},N=m(W,[["__scopeId","data-v-12c1ee00"]]);export{N as default};
