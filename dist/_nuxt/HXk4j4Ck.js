import{u as S,Q as _,g as c,m as A,z as $,c as d,a as s,t as l,e as m,q as h,F as C,r as I,P,o as a,s as L}from"./BanCC350.js";const M={key:0,class:"order-container"},O={class:"order-details special-background"},j={class:"order-info"},B={class:"order-status"},R={class:"total-amount"},D={class:"order-date"},N={class:"order-actions"},w={key:0,class:"address-details"},E={key:1},U={key:2,class:"shipping-method"},q=["src","alt"],F={key:3},V={key:4,class:"order-items"},z=["src"],J={key:5},H={__name:"[id]",setup(Q){const{$axios:f}=S(),u=_(),g=L(),n=c(null),p=t=>Math.floor(t).toLocaleString("fa-IR"),r=t=>{const e=["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];return t.toString().replace(/[0-9]/g,o=>e[o])},k=t=>{const e=new Date(t),o=P.toJalaali(e);return`${r(o.jy)}/${r(o.jm)}/${r(o.jd)}`},b=t=>t==="pending"?"پرداخت نشده":t==="completed"?"پرداخت شده":t,i=c(!1),y=()=>!!localStorage.getItem("auth_token"),v=async()=>{if(i.value=y(),i.value)try{const t=await f.get(`user/order/${u.params.id}`);n.value=t.data.order,console.log("جزئیات سفارش:",n.value)}catch(t){console.error("خطا در دریافت جزئیات سفارش:",t)}};return A(()=>{u.params.id&&i.value&&v()}),$(()=>u.params.id,t=>{t&&i.value&&v()}),(t,e)=>n.value?(a(),d("div",M,[s("div",O,[s("div",j,[s("h3",null,"کد سفارش : #"+l(n.value.order_number),1),s("p",B,"وضعیت: "+l(b(n.value.status)),1),s("p",R,"مبلغ کل: "+l(r(p(n.value.total_amount)))+" تومان",1),s("p",D,"تاریخ ایجاد سفارش: "+l(k(n.value.created_at)),1),s("div",N,[n.value.status==="pending"?(a(),d("button",{key:0,class:"order-btn complete-order-btn",onClick:e[0]||(e[0]=(...o)=>t.completeOrder&&t.completeOrder(...o))},e[6]||(e[6]=[s("span",null,"✔ تکمیل سفارش",-1)]))):m("",!0),n.value.status==="pending"?(a(),d("button",{key:1,class:"order-btn cancel-order-btn",onClick:e[1]||(e[1]=(...o)=>t.cancelOrder&&t.cancelOrder(...o))},e[7]||(e[7]=[s("span",null,"✖ لغو سفارش",-1)]))):m("",!0)])])]),n.value.address?(a(),d("div",w,[e[9]||(e[9]=s("h2",null,"آدرس ارسال:",-1)),s("p",null,l(r(n.value.address.street))+", "+l(n.value.address.city),1),s("p",null,l(n.value.address.state)+", "+l(r(n.value.address.postal_code)),1),s("p",null,l(n.value.address.country),1),s("button",{class:"edit-address-btn",onClick:e[2]||(e[2]=(...o)=>t.editAddress&&t.editAddress(...o))},e[8]||(e[8]=[s("span",null,"ویرایش آدرس",-1)]))])):(a(),d("div",E,[s("button",{class:"add-address-btn",onClick:e[3]||(e[3]=(...o)=>t.addAddress&&t.addAddress(...o))},e[10]||(e[10]=[s("span",null,"افزودن آدرس",-1)]))])),n.value.shipping_method?(a(),d("div",U,[e[12]||(e[12]=s("h2",null,"روش ارسال:",-1)),s("img",{src:`${h(g).public.API_BASE_URL}${n.value.shipping_method.image.path}`,alt:n.value.shipping_method.name},null,8,q),s("p",null,l(n.value.shipping_method.name),1),s("p",null,l(r(n.value.shipping_method.description)),1),s("p",null,"هزینه ارسال: "+l(r(n.value.shipping_method.cost))+" تومان",1),s("p",null,l(r(n.value.shipping_method.delivery_time)),1),s("button",{class:"edit-shipping-method-btn",onClick:e[4]||(e[4]=(...o)=>t.editShippingMethod&&t.editShippingMethod(...o))},e[11]||(e[11]=[s("span",null,"ویرایش روش ارسال",-1)]))])):(a(),d("div",F,[s("button",{class:"add-shipping-method-btn",onClick:e[5]||(e[5]=(...o)=>t.addShippingMethod&&t.addShippingMethod(...o))},e[13]||(e[13]=[s("span",null,"افزودن روش ارسال",-1)]))])),n.value.items?(a(),d("div",V,[e[14]||(e[14]=s("h2",null,"اقلام سفارش:",-1)),s("ul",null,[(a(!0),d(C,null,I(n.value.items,o=>(a(),d("li",{key:o.id},[s("img",{src:`${h(g).public.API_BASE_URL}${o.product.image.file_path}`,alt:"Product Image",class:"product-image"},null,8,z),s("p",null,"محصول: "+l(o.product.name),1),s("p",null,"قیمت: "+l(r(p(o.price)))+" تومان",1),s("p",null,"تعداد: "+l(r(o.quantity)),1),s("p",null,"مبلغ کل: "+l(r(p(o.total)))+" تومان",1)]))),128))])])):(a(),d("div",J,e[15]||(e[15]=[s("p",null,"اقلام سفارش یافت نشد.",-1)])))])):m("",!0)}};export{H as default};
