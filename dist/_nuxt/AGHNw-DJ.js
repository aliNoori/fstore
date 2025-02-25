import{u as $,X as A,h,q as C,H as I,c as d,b as B,a as s,t as l,f as m,x as f,F as k,r as L,W as M,o as a,y as O,R as P}from"./CwEgGED3.js";const R={key:0,class:"order-container"},j={class:"order-details special-background"},N={class:"order-info"},D={class:"order-status"},w={class:"total-amount"},E={class:"order-date"},U={class:"order-actions"},V={key:0,class:"address-details"},q={key:1},F={key:2,class:"shipping-method"},H=["src","alt"],J={key:3},W={key:4,class:"order-items"},X=["src"],z={key:5},Q={__name:"[id]",setup(G){const{$axios:b}=$(),u=A(),g=O(),n=h(null),p=t=>Math.floor(t).toLocaleString("fa-IR"),r=t=>{const e=["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];return t.toString().replace(/[0-9]/g,i=>e[i])},y=t=>{const e=new Date(t),i=M.toJalaali(e);return`${r(i.jy)}/${r(i.jm)}/${r(i.jd)}`},_=t=>t==="pending"?"پرداخت نشده":t==="completed"?"پرداخت شده":t,c=h(!1),S=()=>!!localStorage.getItem("auth_token"),v=async()=>{if(c.value=S(),c.value)try{const t=await b.get(`user/order/${u.params.id}`);n.value=t.data.order,console.log("جزئیات سفارش:",n.value)}catch(t){console.error("خطا در دریافت جزئیات سفارش:",t)}};return C(()=>{u.params.id&&v()}),I(()=>u.params.id,t=>{t&&v()}),(t,e)=>{const i=P;return a(),d(k,null,[B(i),n.value?(a(),d("div",R,[s("div",j,[s("div",N,[s("h3",null,"کد سفارش : #"+l(n.value.order_number),1),s("p",D,"وضعیت: "+l(_(n.value.status)),1),s("p",w,"مبلغ کل: "+l(r(p(n.value.total_amount)))+" تومان",1),s("p",E,"تاریخ ایجاد سفارش: "+l(y(n.value.created_at)),1),s("div",U,[n.value.status==="pending"?(a(),d("button",{key:0,class:"order-btn complete-order-btn",onClick:e[0]||(e[0]=(...o)=>t.completeOrder&&t.completeOrder(...o))},e[6]||(e[6]=[s("span",null,"✔ تکمیل سفارش",-1)]))):m("",!0),n.value.status==="pending"?(a(),d("button",{key:1,class:"order-btn cancel-order-btn",onClick:e[1]||(e[1]=(...o)=>t.cancelOrder&&t.cancelOrder(...o))},e[7]||(e[7]=[s("span",null,"✖ لغو سفارش",-1)]))):m("",!0)])])]),n.value.address?(a(),d("div",V,[e[9]||(e[9]=s("h2",null,"آدرس ارسال:",-1)),s("p",null,l(r(n.value.address.street))+", "+l(n.value.address.city),1),s("p",null,l(n.value.address.state)+", "+l(r(n.value.address.postal_code)),1),s("p",null,l(n.value.address.country),1),s("button",{class:"edit-address-btn",onClick:e[2]||(e[2]=(...o)=>t.editAddress&&t.editAddress(...o))},e[8]||(e[8]=[s("span",null,"ویرایش آدرس",-1)]))])):(a(),d("div",q,[s("button",{class:"add-address-btn",onClick:e[3]||(e[3]=(...o)=>t.addAddress&&t.addAddress(...o))},e[10]||(e[10]=[s("span",null,"افزودن آدرس",-1)]))])),n.value.shipping_method?(a(),d("div",F,[e[12]||(e[12]=s("h2",null,"روش ارسال:",-1)),s("img",{src:`${f(g).public.API_BASE_URL}${n.value.shipping_method.image.path}`,alt:n.value.shipping_method.name},null,8,H),s("p",null,l(n.value.shipping_method.name),1),s("p",null,l(r(n.value.shipping_method.description)),1),s("p",null,"هزینه ارسال: "+l(r(n.value.shipping_method.cost))+" تومان",1),s("p",null,l(r(n.value.shipping_method.delivery_time)),1),s("button",{class:"edit-shipping-method-btn",onClick:e[4]||(e[4]=(...o)=>t.editShippingMethod&&t.editShippingMethod(...o))},e[11]||(e[11]=[s("span",null,"ویرایش روش ارسال",-1)]))])):(a(),d("div",J,[s("button",{class:"add-shipping-method-btn",onClick:e[5]||(e[5]=(...o)=>t.addShippingMethod&&t.addShippingMethod(...o))},e[13]||(e[13]=[s("span",null,"افزودن روش ارسال",-1)]))])),n.value.items?(a(),d("div",W,[e[14]||(e[14]=s("h2",null,"اقلام سفارش:",-1)),s("ul",null,[(a(!0),d(k,null,L(n.value.items,o=>(a(),d("li",{key:o.id},[s("img",{src:`${f(g).public.API_BASE_URL}${o.product.image.file_path}`,alt:"Product Image",class:"product-image"},null,8,X),s("p",null,"محصول: "+l(o.product.name),1),s("p",null,"قیمت: "+l(r(p(o.price)))+" تومان",1),s("p",null,"تعداد: "+l(r(o.quantity)),1),s("p",null,"مبلغ کل: "+l(r(p(o.total)))+" تومان",1)]))),128))])])):(a(),d("div",z,e[15]||(e[15]=[s("p",null,"اقلام سفارش یافت نشد.",-1)])))])):m("",!0)],64)}}};export{Q as default};
