import{_ as f,u as v,h as p,q as y,c as n,b as h,a,t as o,x as l,F as _,r as x,o as r,n as b,R as g}from"./CwEgGED3.js";const B={class:"wallet-container"},$={class:"wallet-card"},k={class:"wallet-balance"},D={class:"transaction-list"},N={class:"transaction-type"},W={__name:"my-wallet",setup(F){const{$axios:m,$toPersian:c,$formatPrice:i}=v(),d=p({}),u=p([]);return y(async()=>{try{const s=await m.get("user/my/wallet");d.value=s.data.wallet,u.value=s.data.wallet.transactions}catch(s){console.error("خطا در دریافت اطلاعات کیف پول:",s)}}),(s,t)=>{const w=g;return r(),n(_,null,[h(w),a("div",B,[a("div",$,[t[1]||(t[1]=a("div",{class:"wallet-header"},[a("h2",null,"کیف پول")],-1)),a("div",k,[t[0]||(t[0]=a("span",null,"موجودی: ",-1)),a("strong",null,o(l(c)(l(i)(d.value.balance)))+" تومان",1)])]),a("div",D,[t[2]||(t[2]=a("h3",{class:"transaction-title"},"تراکنش‌ها",-1)),a("ul",null,[(r(!0),n(_,null,x(u.value,e=>(r(),n("li",{key:e.id,class:"transaction-item"},[a("span",N,o(e.type==="deposit"?"واریز":"برداشت"),1),a("span",{class:b(["transaction-amount",e.type==="deposit"?"deposit":"withdrawal"])},o(l(c)(l(i)(e.amount)))+" تومان ",3)]))),128))])])])],64)}}},V=f(W,[["__scopeId","data-v-a7cbfd1a"]]);export{V as default};
