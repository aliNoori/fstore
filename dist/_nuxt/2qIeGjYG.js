import{_ as g,h as x,u as y,q as N,c,b as l,a as e,F as _,r as $,o as d,n as b,t as n,w as j,d as S,W as k,R as w,e as B}from"./CwEgGED3.js";const D={class:"orders-container"},F={class:"order-header"},L={class:"order-title"},O={class:"order-date"},P={class:"order-body"},V={class:"order-footer"},C={class:"order-status"},I={class:"order-actions"},M={__name:"my-orders",setup(R){const i=x([]),{$axios:u}=y(),p=t=>Math.floor(t).toLocaleString("fa-IR"),r=t=>{const a=["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];return t.toString().replace(/[0-9]/g,o=>a[o])},m=t=>{const a=new Date(t),o=k.toJalaali(a);return`${r(o.jy)}/${r(o.jm)}/${r(o.jd)}`},f=t=>t==="pending"?"پرداخت نشده":t==="completed"?"پرداخت شده":t,h=async()=>{try{const t=await u.get("user/my/orders");i.value=t.data.orders}catch(t){console.error("Failed to fetch orders data:",t)}};return N(()=>{h()}),(t,a)=>{const o=w,v=B;return d(),c(_,null,[l(o),e("div",D,[(d(!0),c(_,null,$(i.value,s=>(d(),c("div",{key:s.id,class:b(["order-card",{"pending-order":s.status==="pending","complete-order":s.status==="completed"}])},[e("div",F,[e("div",L," سفارش شماره: # "+n(s.order_number),1),e("div",O,"تاریخ ایجاد سفارش: "+n(m(s.created_at)),1)]),e("div",P,[e("p",null,"اقلام سفارش: "+n(r(s.items.length)),1),e("p",null,"مبلغ پرداخت شده: "+n(r(p(s.total_amount)))+" تومان",1)]),e("div",V,[e("div",C,n(f(s.status)),1),e("div",I,[l(v,{to:`/order/${s.id}`},{default:j(()=>a[0]||(a[0]=[S("نمایش جزییات")])),_:2},1032,["to"])])])],2))),128))])],64)}}},z=g(M,[["__scopeId","data-v-d6b80a8d"]]);export{z as default};
