import{l as S,u as D,Q as T,r as a,q as l,j as w,Y as y,c as B,b as u,a as n,I,t as e,w as R,F as $,_ as q,o as A,m as C,d as P}from"./D1qeJo3Z.js";import{_ as V}from"./DlAUqK2U.js";const F={class:"transaction-container"},L={class:"transaction"},M={class:"transaction-details"},j={class:"payment-info"},E=S({__name:"user-transaction-receive",setup(O){const{$formatPrice:d,$toPersian:r,$toPersianDate:i}=D(),p=T(),m=y(),v=a(null),s=a({}),g=l(()=>r(s.value.order_id||"")),c=l(()=>d(s.value.amount||0)),k=l(()=>r(s.value.token||"")),_=l(()=>r(s.value.rrn||"")),f=l(()=>r(i(s.value.created_at||new Date))),b=l(()=>{const t=(s.value.card_number_masked||"").slice(-16).padStart(16,"*");return r(t)});return w(()=>{const o=m.query;if(console.log(o),o.error)v.value=o.error;else{s.value={order_id:o.order_id,amount:o.amount,token:o.token,rrn:o.rrn,card_number_masked:o.card_number_masked,created_at:new Date().toLocaleString()};const t=o.auth_token;p.setToken(t),localStorage.setItem("auth_token",t)}console.log("Transaction:",s.value)}),(o,t)=>{const x=C,N=q;return A(),B($,null,[u(x),n("div",F,[n("div",L,[t[16]||(t[16]=n("div",{class:"store-info"},[n("img",{src:I,alt:"Store Logo",class:"store-logo"}),n("div",{class:"store-details"},[n("h2",null,"نام فروشگاه"),n("p",null,"آدرس: خیابان مثال، شهر مثال"),n("p",null,"تلفن: ۰۱۲۳۴۵۶۷۸۹"),n("p",null,"ایمیل: example@example.com")])],-1)),n("div",M,[t[10]||(t[10]=n("h2",null,"جزئیات تراکنش",-1)),n("p",null,[t[0]||(t[0]=n("strong",null,"شناسه سفارش :",-1)),t[1]||(t[1]=n("span",{class:"dotted-line"},null,-1)),n("strong",null,e(g.value),1)]),n("p",null,[t[2]||(t[2]=n("strong",null,"مبلغ سفارش :",-1)),t[3]||(t[3]=n("span",{class:"dotted-line"},null,-1)),n("strong",null,e(c.value),1)]),n("p",null,[t[4]||(t[4]=n("strong",null,"کد رهگیری :",-1)),t[5]||(t[5]=n("span",{class:"dotted-line"},null,-1)),n("strong",null,e(k.value),1)]),n("p",null,[t[6]||(t[6]=n("strong",null,"شماره پیگیری :",-1)),t[7]||(t[7]=n("span",{class:"dotted-line"},null,-1)),n("strong",null,e(_.value),1)]),n("p",null,[t[8]||(t[8]=n("strong",null,"تاریخ تراکنش :",-1)),t[9]||(t[9]=n("span",{class:"dotted-line"},null,-1)),n("strong",null,e(f.value),1)])]),n("div",j,[t[13]||(t[13]=n("h2",null,"اطلاعات پرداخت",-1)),t[14]||(t[14]=n("p",null,[n("strong",null,"نوع پرداخت:"),n("span",{class:"dotted-line"}),n("strong",null," کارت بانکی")],-1)),n("p",null,[t[11]||(t[11]=n("strong",null,"شماره کارت:",-1)),t[12]||(t[12]=n("span",{class:"dotted-line"},null,-1)),n("strong",null,e(b.value),1)])]),u(N,{to:"/",class:"back-button"},{default:R(()=>t[15]||(t[15]=[P("برگشت به صفحه اصلی")])),_:1})])])],64)}}}),z=V(E,[["__scopeId","data-v-9da174ed"]]);export{z as default};
