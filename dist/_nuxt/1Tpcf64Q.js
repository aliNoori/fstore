import{r as f,u as v,j as h,c,b as x,a as s,F as u,k as y,o as r,m as k,t as e,x as a}from"./C3VuUFzH.js";import{_ as B}from"./DlAUqK2U.js";const $={class:"coupons-container"},b={class:"coupon-header"},g={class:"coupon-title"},C={class:"coupon-date"},F={class:"coupon-body"},N={class:"coupon-footer"},D={class:"coupon-status"},P={__name:"user-coupons",setup(S){const i=f([]),{$axios:_,$toPersian:n,$toPersianDate:p}=v(),l=async()=>{try{const t=await _.get("user/my/coupons");i.value=t.data.coupons}catch(t){console.error("Failed to fetch coupons:",t)}};return h(()=>{l()}),(t,d)=>{const m=k;return r(),c(u,null,[x(m),s("div",$,[(r(!0),c(u,null,y(i.value,o=>(r(),c("div",{key:o.id,class:"coupon-card"},[s("div",b,[s("div",g,e(a(n)(o.code)),1),s("div",C,"تاریخ اعتبار: "+e(a(n)(a(p)(o.expire_date))),1)]),s("div",F,[s("p",null,"تخفیف : "+e(a(n)(o.discount_amount))+" "+e(o.discount_type),1),s("p",null,"توضیحات : "+e(o.description),1)]),s("div",N,[s("div",D,e(o.is_used?"استفاده شده":"اعتبار دارد"),1),d[0]||(d[0]=s("div",{class:"coupon-actions"},[s("a",{href:"#"},"Use Coupon")],-1))])]))),128))])],64)}}},w=B(P,[["__scopeId","data-v-27ace8db"]]);export{w as default};
