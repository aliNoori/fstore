import{_ as u,g as p,u as _,m as l,c,F as v,r as h,o as n,a as s,t}from"./BAnSoR52.js";const m={class:"coupons-container"},f={class:"coupon-header"},y={class:"coupon-title"},x={class:"coupon-date"},g={class:"coupon-body"},D={class:"coupon-footer"},k={class:"coupon-status"},B={__name:"my-coupons",setup(C){const a=p([]),{$axios:r}=_(),d=async()=>{try{const e=await r.get("user/my/coupons");a.value=e.data.coupons}catch(e){console.error("Failed to fetch coupons:",e)}};return l(()=>{d()}),(e,i)=>(n(),c("div",m,[(n(!0),c(v,null,h(a.value,o=>(n(),c("div",{key:o.id,class:"coupon-card"},[s("div",f,[s("div",y,t(o.code),1),s("div",x,"Expires: "+t(new Date(o.expire_date).toLocaleString()),1)]),s("div",g,[s("p",null,"Discount: "+t(o.discount_amount)+" "+t(o.discount_type),1),s("p",null,"Description: "+t(o.description),1)]),s("div",D,[s("div",k,t(o.is_used?"Used":"Not Used"),1),i[0]||(i[0]=s("div",{class:"coupon-actions"},[s("a",{href:"#"},"Use Coupon")],-1))])]))),128))]))}},N=u(B,[["__scopeId","data-v-4cb35e52"]]);export{N as default};
