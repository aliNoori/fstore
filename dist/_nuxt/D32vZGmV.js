import{_ as pe}from"./FAPUPOa6.js";import{_ as _e,f as me,g as c,u as he,m as ge,c as a,a as e,F as h,r as y,e as p,d as f,t as n,q as l,n as k,o as r,b as ye,w as fe,i as z,h as q,j as E,s as ke}from"./BspxFrwk.js";const be={class:"progress-container"},Ce={class:"steps-wrapper"},we={class:"step-name"},$e={class:"step-content"},Se={key:0,class:"page card"},Oe={class:"items"},Pe={class:"image"},Ae=["src","alt"],Ne={class:"product-details"},Fe={class:"product-name"},Ie={class:"product-price"},Ue={class:"product-quantity"},We={class:"buttons"},qe=["onClick"],Ee={class:"controls"},Le={key:1,class:"page addresses"},Me={id:"address-selection-page"},Be={class:"address-cards-container"},Re=["onClick"],Ve={class:"address-content"},je={class:"address-buttons"},xe=["onClick"],De=["onClick"],Je={class:"controls"},Ge={key:2,class:"page shipping-methods"},Te={id:"shipping-method-selection-page"},ze={class:"shipping-cards-container"},He=["onClick"],Ke=["value"],Qe={key:0,class:"checkmark-shipping"},Xe={class:"controls"},Ye={key:3,class:"page invoice"},Ze={class:"body"},et={key:0},tt={class:"invoice-container"},st={class:"invoice-header"},ot={class:"user-details"},nt={class:"invoice-items"},lt=["src","alt"],at={key:0},rt={class:"invoice-summary"},it={class:"total"},dt={class:"controls"},ct={key:4,class:"page payment"},ut={id:"payment-method-selection-page"},vt={class:"payment-cards-container"},pt=["onClick"],_t=["value"],mt={class:"header-payment-card"},ht=["src","alt"],gt={key:0},yt={key:1},ft={key:0,class:"checkmark"},kt={class:"controls"},bt={key:5},Ct={class:"page online-payment-methods"},wt={id:"online-method-selection-page"},$t={class:"online-cards-container"},St=["onClick"],Ot=["value"],Pt=["src","alt"],At={key:0,class:"checkmark"},Nt={class:"controls"},Ft={key:6},It={class:"page offline-payment-methods"},Ut={class:"offline-method-selection-page"},Wt={class:"wallet-card-container"},qt={class:"controls"},Et={key:7},Lt={class:"page offline-payment-methods"},Mt={class:"offline-method-selection-page"},Bt={class:"coupons-card-container"},Rt=["onClick"],Vt={class:"coupon-header"},jt={class:"coupon-title"},xt={class:"coupon-date"},Dt={class:"coupon-body"},Jt={class:"coupon-footer"},Gt={class:"coupon-status"},Tt={class:"controls"},zt={__name:"steps-to-order",setup(Ht){const L=me(),F=[{number:1,name:"سبد"},{number:2,name:"آدرس"},{number:3,name:"ارسال"},{number:4,name:"فاکتور"},{number:5,name:"درگاه"},{number:6,name:"پرداخت"}],u=c(1),g=()=>{u.value<F.length&&u.value++},b=()=>{u.value>1&&u.value--},H=s=>s==="Online"?"آنلاین":s==="Wallet"?"کیف پول":s==="OtherWays"?"از طرق دیگر":s,K=s=>s==="Online"?"پرداخت از طریق درگاه های بانکی":s==="Wallet"?"پرداخت از طریق کیف پول":s==="OtherWays"?"پرداخت از طریق کارت جایزه و ...":s,Q=s=>s==="parsian"?"پارسیان":s==="mellat"?"ملت":s==="melli"?"ملی":s,{$axios:v,$toPersian:i,$toPersianDate:M,$formatPrice:_}=he(),S=c({}),B=ke(),X=async()=>{try{const s=await v.get("cart/items/show");S.value=s.data}catch(s){console.error("Error fetching cart items:",s)}},Y=async s=>{try{(await v.post(`cart/item/remove/${s}`)).status===200?S.value.cart.items.forEach(P=>{P.product.id===s&&(P.quantity>1?P.quantity--:S.value.cart.items=S.value.cart.items.filter(o=>o.product.id!==s))}):alert("Error removing the item from the cart.")}catch(t){console.error("Error removing from cart:",t)}},R=c([]),Z=async()=>{try{const s=await v.get("user/addresses");R.value=s.data.addresses}catch(s){console.error("Failed to load addresses:",s)}},O=c(null),V=c([]),ee=async()=>{if(!O.value){console.error("No address selected");return}try{const s=await v.post(`user/create/order/${O.value}`);V.value=s.data.order,localStorage.setItem("order_number",JSON.stringify(V.value.order_number)),console.log("Address added to order:",s.data.order)}catch(s){console.error("Failed to add address to order:",s)}},te=s=>{L.push(`/edit-address/${s}`)},se=s=>{O.value=s,console.log(`آدرس با شناسه ${s} انتخاب شد.`)},oe=async()=>{await L.push("/add-new-address")},j=c([]),C=c(null),ne=async()=>{try{const s=await v.get("/shippingMethod/list");j.value=s.data.shippingMethods}catch(s){console.error("Failed to load shippingMethods:",s)}},le=async()=>{if(!C.value){console.error("No shippingMethod selected");return}try{const s=JSON.parse(localStorage.getItem("order_number")),t=await v.post(`user/addShipping/${C.value}/order/${s}`);console.log("ShippingMethod added to order:",t.data)}catch(s){console.error("Failed to add shippingMethod to order:",s)}},m=c({}),I=c(!0),U=c({}),ae=async()=>{try{const s=JSON.parse(localStorage.getItem("order_number")),t=await v.get(`invoice/create/${s}`);m.value=t.data.invoice}catch(s){console.error("Invoice error:",s.response?s.response.data:s)}finally{I.value=!1}},re=async()=>{try{const s=await v.get("user/profile");U.value=s.data,I.value=!1}catch(s){console.error("Fetch user error:",s.response?s.response.data:s)}},A=c(null),x=c([]),w=c(null),ie=async()=>{try{const s=await v.get("/paymentMethod/list");x.value=s.data.paymentMethods}catch(s){console.error("Failed to load shippingMethods:",s)}},de=async()=>{if(!w.value){console.error("No shippingMethod selected");return}try{const s=await v.post(`user/manageSelectedPayment/${w.value}`);A.value=s.data.action,s.data.action==="Online"?(console.log("action1 :",s.data.action),await ce()):s.data.action==="Wallet"?(console.log("action2 :",s.data.action),await ue()):s.data.action==="OtherWays"&&(console.log("action3 :",s.data.action),await ve())}catch(s){console.error("Failed to selected paymentMethod :",s)}},D=c([]),$=c(null),ce=async()=>{try{const s=await v.get("/onlineMethodGateway/list");D.value=s.data.onlinePaymentMethods}catch(s){console.error("Failed to load onlineMethods:",s)}},W=async()=>{if(!$.value){console.error("No OnlineMethod selected");return}try{const s=JSON.parse(localStorage.getItem("order_number")),t=await v.post(`user/processPayment/${s}/${$.value}`);console.log("url :",t.data.url),window.location.href=t.data.url}catch(s){console.error("Failed to selected onlinePaymentMethods :",s)}},N=c({}),J=c({}),G=c(null),T=c(null),ue=async()=>{try{const s=await v.get("user/my/wallet");N.value=s.data.wallet}catch(s){console.error("خطا در دریافت اطلاعات کیف پول:",s)}},ve=async()=>{try{const s=await v.get("user/my/coupons");J.value=s.data.coupons}catch(s){console.error("خطا در دریافت اطلاعات  کپن های کاربر:",s)}};return ge(()=>{X()}),(s,t)=>{const P=pe;return r(),a(h,null,[e("div",be,[e("div",Ce,[(r(),a(h,null,y(F,(o,d)=>e("div",{key:d,class:"step-container"},[e("div",{class:k(["step-circle",{"step-active":d+1<=u.value},{"step-raised":d+1===u.value}])},[e("span",null,n(l(i)(o.number)),1)],2),e("div",we,[e("span",null,n(o.name),1)]),d<F.length-1?(r(),a("div",{key:0,class:k(["step-line",{"line-active":d+1<u.value}])},null,2)):p("",!0)])),64))])]),e("div",$e,[u.value===1?(r(),a("div",Se,[t[13]||(t[13]=e("h2",null,"سبد خرید",-1)),e("div",Oe,[(r(!0),a(h,null,y(S.value.cart.items,o=>(r(),a("div",{key:o.id,class:"item-card"},[e("div",Pe,[e("img",{src:o.product.image?`${l(B).public.API_BASE_URL}${o.product.image.path}`:"/default-product-image.jpg",alt:o.product.name},null,8,Ae)]),e("div",Ne,[e("div",Fe,n(o.product.name),1),e("div",Ie,"قیمت:"+n(l(i)(l(_)(o.product.price))),1),e("div",Ue,"تعداد:"+n(l(i)(o.quantity)),1)]),e("div",We,[ye(P,{to:`/product/${o.product.id}`},{default:fe(()=>t[12]||(t[12]=[e("button",{class:"product-info-btn"},"اطلاعات محصول",-1)])),_:2},1032,["to"]),e("button",{onClick:d=>Y(o.product.id),class:"rm-item-card-btn"},"حذف از سبد خرید",8,qe)])]))),128))]),e("div",Ee,[e("button",{onClick:t[0]||(t[0]=()=>{Z(),g()})},"ثبت آدرس")])])):p("",!0),u.value===2?(r(),a("div",Le,[t[17]||(t[17]=e("h2",null,"ثبت آدرس",-1)),e("div",Me,[e("div",Be,[(r(!0),a(h,null,y(R.value,o=>(r(),a("div",{key:o.id,class:k(["address-card",{selected:O.value===o.id}]),onClick:d=>O.value=o.id},[e("div",Ve,[e("h3",null,n(l(i)(o.street)),1),e("p",null,n(o.city)+", "+n(o.state)+", "+n(o.country),1)]),e("div",je,[e("button",{onClick:z(d=>te(o.id),["stop"]),class:"edit-address-btn"},t[14]||(t[14]=[e("i",{class:"fas fa-edit"},null,-1),f(" ویرایش ")]),8,xe),e("button",{onClick:z(d=>se(o.id),["stop"]),class:"select-address-btn"},t[15]||(t[15]=[e("i",{class:"fas fa-check-circle"},null,-1),f(" انتخاب ")]),8,De)])],10,Re))),128)),e("div",{class:"add-address-card",onClick:oe},t[16]||(t[16]=[e("div",{class:"add-address-icon"},[e("i",{class:"fas fa-plus"},"+")],-1),e("p",null,"افزودن آدرس جدید",-1)]))])]),e("div",Je,[e("button",{onClick:t[1]||(t[1]=()=>{ee(),ne(),g()})},"ثبت روش ارسال"),e("button",{onClick:b},"برگشت به سبد خرید")])])):p("",!0),u.value===3?(r(),a("div",Ge,[t[18]||(t[18]=e("h2",null,"نوع ارسال",-1)),e("div",Te,[e("div",ze,[(r(!0),a(h,null,y(j.value,o=>(r(),a("div",{key:o.id,class:k(["shipping-card",{selected:C.value===o.id}]),onClick:d=>C.value=o.id},[e("label",null,[q(e("input",{type:"radio",value:o.id,"onUpdate:modelValue":t[2]||(t[2]=d=>C.value=d),required:"",hidden:""},null,8,Ke),[[E,C.value]]),e("h3",null,n(o.name),1),e("p",null,n(l(i)(o.description)),1),e("p",null,"هزینه : "+n(l(i)(o.cost)),1),e("p",null,"مدت زمان تحویل :"+n(l(i)(o.delivery_time)),1),C.value===o.id?(r(),a("span",Qe,"✓")):p("",!0)])],10,He))),128))]),e("div",Xe,[e("button",{onClick:t[3]||(t[3]=()=>{le().then(re).then(ae).then(g).catch(o=>console.error(o))})},"صدور فاکتور "),e("button",{onClick:b},"برگشت به انتخاب آدرس")])])])):p("",!0),u.value===4?(r(),a("div",Ye,[t[30]||(t[30]=e("h2",null,"صدور فاکتور",-1)),e("div",Ze,[I.value?(r(),a("div",et," Loading...")):p("",!0),e("div",tt,[e("div",st,[t[24]||(t[24]=e("div",{class:"store-details"},[e("h2",null,"فروشگاه ایرانی")],-1)),e("div",ot,[e("p",null,[t[19]||(t[19]=e("strong",null,"شماره فاکتور:",-1)),f(" "+n(l(i)(m.value.invoice_number)),1)]),e("p",null,[t[20]||(t[20]=e("strong",null,"تاریخ:",-1)),f(" "+n(l(i)(l(M)(m.value.created_at))),1)]),e("p",null,[t[21]||(t[21]=e("strong",null,"خریدار:",-1)),f(" "+n(U.value.name),1)]),e("p",null,[t[22]||(t[22]=e("strong",null,"تلفن:",-1)),f(" "+n(l(i)("058-362-10992")),1)]),e("p",null,[t[23]||(t[23]=e("strong",null,"پست الکترونیکی:",-1)),f(" "+n(U.value.email),1)])])]),e("div",nt,[e("table",null,[t[26]||(t[26]=e("thead",null,[e("tr",null,[e("th",null,"#"),e("th",null,"تصویر"),e("th",null,"محصول"),e("th",null,"تعداد"),e("th",null,"قیمت"),e("th",null,"مجموع"),e("th",null,"تخفیف"),e("th",null,"قیمت نهایی")])],-1)),e("tbody",null,[(r(!0),a(h,null,y(m.value.items,(o,d)=>(r(),a("tr",{key:d},[e("td",null,n(d+1),1),e("td",null,[e("img",{src:o.product.image?`${l(B).public.API_BASE_URL}${o.product.image.path}`:"/default-product-image.jpg",alt:o.product.name,class:"product-image"},null,8,lt)]),e("td",null,n(o.product.name),1),e("td",null,n(l(i)(o.quantity)),1),e("td",null,n(l(i)(l(_)(o.price))),1),e("td",null,n(l(i)(l(_)(o.total))),1),e("td",null,n(l(i)(l(_)(o.discount))),1),e("td",null,n(l(i)(l(_)(o.price_with_discount))),1)]))),128)),m.value.items.length?p("",!0):(r(),a("tr",at,t[25]||(t[25]=[e("td",{colspan:"8"},"محصولی موجود نیست",-1)])))])])]),e("div",rt,[e("div",null,[t[27]||(t[27]=e("span",null,"جمع کل:",-1)),e("strong",null,n(l(i)(l(_)(m.value.sub_total_amount))),1)]),e("div",null,[e("span",null,"مالیات ("+n(l(i)(l(_)(m.value.tax_rate)))+"%):",1),e("strong",null,n(l(i)(l(_)(m.value.tax))),1)]),e("div",null,[t[28]||(t[28]=e("span",null,"هزینه ارسال:",-1)),e("strong",null,n(l(i)(l(_)(m.value.shipping_cost))),1)]),e("div",it,[t[29]||(t[29]=e("span",null,"مجموع کل:",-1)),e("strong",null,n(l(i)(l(_)(m.value.total_amount))),1)])])])]),e("div",dt,[e("button",{onClick:t[4]||(t[4]=()=>{ie().then(g).catch(o=>console.error(o))})},"انتخاب روش پرداخت "),e("button",{onClick:b},"برگست به روش ارسال")])])):p("",!0),u.value===5?(r(),a("div",ct,[t[32]||(t[32]=e("h2",null,"انتخاب روش پرداخت",-1)),e("div",ut,[e("div",vt,[(r(!0),a(h,null,y(x.value,o=>(r(),a("div",{key:o.id,class:k(["payment-card",{selected:w.value===o.id}]),onClick:d=>w.value=o.id},[e("label",null,[q(e("input",{type:"radio",value:o.id,"onUpdate:modelValue":t[5]||(t[5]=d=>w.value=d),required:"",hidden:""},null,8,_t),[[E,w.value]]),e("div",mt,[e("h3",null,n(H(o.name)),1),e("img",{src:o.image?`${s.$config.public.API_BASE_URL}${o.image.path}`:"/default-payment-image.jpg",alt:o.name},null,8,ht)]),e("p",null,n(K(o.name)),1),e("p",null,[t[31]||(t[31]=f("فعال/غیرفعال : ")),o.is_active===1?(r(),a("span",gt,"فعال")):(r(),a("span",yt,"غیرفعال"))]),w.value===o.id?(r(),a("span",ft,"✓")):p("",!0)])],10,pt))),128))])]),e("div",kt,[e("button",{onClick:t[6]||(t[6]=()=>{de().then(g).catch(o=>console.error(o))})},"انتخاب درگاه پرداخت "),e("button",{onClick:b},"برگشت به صدور فاکتور")])])):p("",!0),u.value===6&&A.value==="Online"?(r(),a("div",bt,[e("div",Ct,[t[33]||(t[33]=e("h2",null,"انتخاب درگاه پرداخت",-1)),e("div",wt,[e("div",$t,[(r(!0),a(h,null,y(D.value,o=>(r(),a("div",{key:o.id,class:k(["online-card",{selected:$.value===o.id}]),onClick:d=>$.value=o.id},[q(e("input",{type:"radio",value:o.id,"onUpdate:modelValue":t[7]||(t[7]=d=>$.value=d),required:"",hidden:""},null,8,Ot),[[E,$.value]]),e("h3",null,n(Q(o.gateway)),1),e("img",{src:o.image?`${s.$config.public.API_BASE_URL}${o.image.path}`:"/default-payment-image.jpg",alt:o.name},null,8,Pt),$.value===o.id?(r(),a("span",At,"✓")):p("",!0)],10,St))),128))]),e("div",Nt,[e("button",{onClick:t[8]||(t[8]=()=>{W().then(g).catch(o=>console.error(o))})},"اتصال به درگاه "),e("button",{onClick:b},"برگشت به انتخاب روش پرداخت")])])])])):u.value===6&&A.value==="Wallet"?(r(),a("div",Ft,[e("div",It,[t[36]||(t[36]=e("h2",null,"انتخاب درگاه پرداخت",-1)),e("div",Ut,[e("div",Wt,[t[35]||(t[35]=e("div",null,[e("p",null,"کیف پول")],-1)),e("div",{class:k(["wallet-card",{selected:T.value===N.value.id}]),onClick:t[9]||(t[9]=o=>T.value=N.value.id)},[t[34]||(t[34]=e("span",null,"موجودی: ",-1)),e("strong",null,n(l(i)(l(_)(N.value.balance)))+" تومان",1)],2)]),e("div",qt,[e("button",{onClick:t[10]||(t[10]=()=>{W().then(g).catch(o=>console.error(o))})},"پرداخت سفارش "),e("button",{onClick:b},"برگشت به انتخاب روش پرداخت")])])])])):u.value===6&&A.value==="OtherWays"?(r(),a("div",Et,[e("div",Lt,[t[39]||(t[39]=e("h2",null,"انتخاب درگاه پرداخت",-1)),e("div",Mt,[e("div",Bt,[t[38]||(t[38]=e("p",null,"کارت های اعتباری",-1)),(r(!0),a(h,null,y(J.value,o=>(r(),a("div",{key:o.id,class:k(["coupon-card",{selected:G.value===o.id}]),onClick:d=>G.value=o.id},[e("div",Vt,[e("div",jt,n(l(i)(o.code)),1),e("div",xt,"تاریخ اعتبار: "+n(l(i)(l(M)(o.created_at))),1)]),e("div",Dt,[e("p",null,"تخفیف : "+n(l(i)(o.discount_amount))+" "+n(o.discount_type),1),e("p",null,"توضیحات : "+n(o.description),1)]),e("div",Jt,[e("div",Gt,n(o.is_used?"استفاده شده":"اعتبار دارد"),1),t[37]||(t[37]=e("div",{class:"coupon-actions"},[e("a",{href:"#"},"Use Coupon")],-1))])],10,Rt))),128))]),e("div",Tt,[e("button",{onClick:t[11]||(t[11]=()=>{W().then(g).catch(o=>console.error(o))})},"پرداخت سفارش "),e("button",{onClick:b},"برگشت به انتخاب روش پرداخت")])])])])):p("",!0)])],64)}}},Xt=_e(zt,[["__scopeId","data-v-850566e0"]]);export{Xt as default};
