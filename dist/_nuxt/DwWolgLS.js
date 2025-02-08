import{_ as te}from"./Biojq3fk.js";import{_ as se,f as oe,g as d,u as ne,m as le,c as l,a as e,F as m,r as _,e as v,d as g,t as n,o as a,n as k,q as B,b as ae,w as re,i as R,h as F,j as I,s as ie}from"./D_S-R7ao.js";const de={class:"progress-container"},ce={class:"steps-wrapper"},ue={class:"step-name"},pe={class:"step-content"},ve={key:0,class:"page card"},me={class:"items"},he={class:"image"},_e=["src","alt"],ge={class:"product-details"},ye={class:"product-name"},be={class:"product-price"},fe={class:"product-quantity"},ke={class:"buttons"},Ce=["onClick"],$e={class:"controls"},Se={key:1,class:"page addresses"},we={id:"address-selection-page"},Ae={class:"address-cards-container"},Ne=["onClick"],Pe={class:"address-content"},Fe={class:"address-buttons"},Ie=["onClick"],Oe=["onClick"],Ee={class:"controls"},Me={key:2,class:"page shipping-methods"},qe={id:"shipping-method-selection-page"},Ue={class:"shipping-cards-container"},Le=["onClick"],xe=["value"],Be={class:"controls"},Re={key:3,class:"page invoice"},Ve={class:"body"},je={key:0},Je={class:"invoice-container"},De={class:"invoice-header"},Te={class:"user-details"},ze={class:"invoice-items"},Ge=["src","alt"],He={key:0},Ke={class:"invoice-summary"},Qe={class:"total"},We={class:"controls"},Xe={key:4,class:"page payment"},Ye={id:"payment-method-selection-page"},Ze={class:"payment-cards-container"},et=["onClick"],tt=["value"],st={class:"header-payment-card"},ot=["src","alt"],nt={class:"controls"},lt={key:5,class:"page online-payment-methods"},at={id:"online-method-selection-page"},rt={class:"online-cards-container"},it=["onClick"],dt=["value"],ct=["src","alt"],ut={class:"controls"},pt={__name:"steps-to-order",setup(vt){const O=oe(),i=o=>{const t=["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];return o.toString().replace(/[0-9]/g,h=>t[h])},A=[{number:1,name:"سبد"},{number:2,name:"آدرس"},{number:3,name:"ارسال"},{number:4,name:"فاکتور"},{number:5,name:"درگاه"},{number:6,name:"پرداخت"}],c=d(1),y=()=>{c.value<A.length&&c.value++},C=()=>{c.value>1&&c.value--},{$axios:u}=ne(),$=d({}),E=ie(),V=async()=>{try{const o=await u.get("cart/items/show");$.value=o.data}catch(o){console.error("Error fetching cart items:",o)}},j=async o=>{try{(await u.post(`cart/item/remove/${o}`)).status===200?$.value.cart.items.forEach(h=>{h.product.id===o&&(h.quantity>1?h.quantity--:$.value.cart.items=$.value.cart.items.filter(s=>s.product.id!==o))}):alert("Error removing the item from the cart.")}catch(t){console.error("Error removing from cart:",t)}},M=d([]),J=async()=>{try{const o=await u.get("user/addresses");M.value=o.data.addresses}catch(o){console.error("Failed to load addresses:",o)}},S=d(null),q=d([]),D=async()=>{if(!S.value){console.error("No address selected");return}try{const o=await u.post(`user/create/order/${S.value}`);q.value=o.data.order,localStorage.setItem("order_number",JSON.stringify(q.value.order_number)),console.log("Address added to order:",o.data.order)}catch(o){console.error("Failed to add address to order:",o)}},T=o=>{O.push(`/edit-address/${o}`)},z=o=>{S.value=o,console.log(`آدرس با شناسه ${o} انتخاب شد.`)},G=async()=>{await O.push("/add-new-address")},U=d([]),b=d(null),H=async()=>{try{const o=await u.get("/shippingMethod/list");U.value=o.data.shippingMethods}catch(o){console.error("Failed to load shippingMethods:",o)}},K=async()=>{if(!b.value){console.error("No shippingMethod selected");return}try{const o=JSON.parse(localStorage.getItem("order_number")),t=await u.post(`user/addShipping/${b.value}/order/${o}`);console.log("ShippingMethod added to order:",t.data)}catch(o){console.error("Failed to add shippingMethod to order:",o)}},p=d({}),N=d(!0),P=d({}),Q=async()=>{try{const o=JSON.parse(localStorage.getItem("order_number")),t=await u.get(`invoice/create/${o}`);p.value=t.data.invoice}catch(o){console.error("Invoice error:",o.response?o.response.data:o)}finally{N.value=!1}},W=async()=>{try{const o=await u.get("user/profile");P.value=o.data,N.value=!1}catch(o){console.error("Fetch user error:",o.response?o.response.data:o)}},L=d([]),f=d(null),X=async()=>{try{const o=await u.get("/paymentMethod/list");L.value=o.data.paymentMethods}catch(o){console.error("Failed to load shippingMethods:",o)}},Y=async()=>{if(!f.value){console.error("No shippingMethod selected");return}try{const o=await u.post(`user/manageSelectedPayment/${f.value}`);console.log(o.data.action),console.log("PaymentMethod :",o.data.action),o.data.action==="Online"&&await Z()}catch(o){console.error("Failed to selected paymentMethod :",o)}},x=d([]),w=d(null),Z=async()=>{try{const o=await this.$axios.get("/onlineMethodGateway/list");x.value=o.data.onlinePaymentMethods}catch(o){console.error("Failed to load shippingMethods:",o)}},ee=async()=>{if(!w.value){console.error("No OnlineMethod selected");return}try{const o=JSON.parse(localStorage.getItem("order_number")),t=await this.$axios.post(`user/processPayment/${o}/${this.selectedOnlinePaymentMethod}`);console.log("url :",t.data.url),window.location.href=t.data.url}catch(o){console.error("Failed to selected onlinePaymentMethods :",o)}};return le(()=>{V()}),(o,t)=>{const h=te;return a(),l(m,null,[e("div",de,[e("div",ce,[(a(),l(m,null,_(A,(s,r)=>e("div",{key:r,class:"step-container"},[e("div",{class:k(["step-circle",{"step-active":r+1<=c.value},{"step-raised":r+1===c.value}])},[e("span",null,n(i(s.number)),1)],2),e("div",ue,[e("span",null,n(s.name),1)]),r<A.length-1?(a(),l("div",{key:0,class:k(["step-line",{"line-active":r+1<c.value}])},null,2)):v("",!0)])),64))])]),e("div",pe,[c.value===1?(a(),l("div",ve,[t[10]||(t[10]=e("h2",null,"سبد خرید",-1)),e("div",me,[(a(!0),l(m,null,_($.value.cart.items,s=>(a(),l("div",{key:s.id,class:"item-card"},[e("div",he,[e("img",{src:s.product.image?`${B(E).public.API_BASE_URL}${s.product.image.path}`:"/default-product-image.jpg",alt:s.product.name},null,8,_e)]),e("div",ge,[e("div",ye,n(s.product.name),1),e("div",be,"قیمت:"+n(i(s.product.price)),1),e("div",fe,"تعداد:"+n(i(s.quantity)),1)]),e("div",ke,[ae(h,{to:`/product/${s.product.id}`},{default:re(()=>t[9]||(t[9]=[e("button",{class:"product-info-btn"},"اطلاعات محصول",-1)])),_:2},1032,["to"]),e("button",{onClick:r=>j(s.product.id),class:"rm-item-card-btn"},"حذف از سبد خرید",8,Ce)])]))),128))]),e("div",$e,[e("button",{onClick:t[0]||(t[0]=()=>{J(),y()})},"ثبت آدرس")])])):v("",!0),c.value===2?(a(),l("div",Se,[t[14]||(t[14]=e("h2",null,"ثبت آدرس",-1)),e("div",we,[e("div",Ae,[(a(!0),l(m,null,_(M.value,s=>(a(),l("div",{key:s.id,class:k(["address-card",{selected:S.value===s.id}]),onClick:r=>S.value=s.id},[e("div",Pe,[e("h3",null,n(s.street),1),e("p",null,n(s.city)+", "+n(s.state)+", "+n(s.country),1)]),e("div",Fe,[e("button",{onClick:R(r=>T(s.id),["stop"]),class:"edit-address-btn"},t[11]||(t[11]=[e("i",{class:"fas fa-edit"},null,-1),g(" ویرایش ")]),8,Ie),e("button",{onClick:R(r=>z(s.id),["stop"]),class:"select-address-btn"},t[12]||(t[12]=[e("i",{class:"fas fa-check-circle"},null,-1),g(" انتخاب ")]),8,Oe)])],10,Ne))),128)),e("div",{class:"add-address-card",onClick:G},t[13]||(t[13]=[e("div",{class:"add-address-icon"},[e("i",{class:"fas fa-plus"},"+")],-1),e("p",null,"افزودن آدرس جدید",-1)]))])]),e("div",Ee,[e("button",{onClick:C},"برگشت به سبد خرید"),e("button",{onClick:t[1]||(t[1]=()=>{D(),H(),y()})},"ثبت روش ارسال")])])):v("",!0),c.value===3?(a(),l("div",Me,[t[15]||(t[15]=e("h2",null,"نوع ارسال",-1)),e("div",qe,[e("div",Ue,[(a(!0),l(m,null,_(U.value,s=>(a(),l("div",{key:s.id,class:k(["shipping-card",{selected:b.value===s.id}]),onClick:r=>b.value=s.id},[e("label",null,[F(e("input",{type:"radio",value:s.id,"onUpdate:modelValue":t[2]||(t[2]=r=>b.value=r),required:"",hidden:""},null,8,xe),[[I,b.value]]),e("h3",null,n(s.name),1),e("p",null,n(s.description),1),e("p",null,"Cost: "+n(s.cost),1),e("p",null,"Estimated Delivery: "+n(s.delivery_time),1)])],10,Le))),128))]),e("div",Be,[e("button",{onClick:C},"برگشت به انتخاب آدرس"),e("button",{onClick:t[3]||(t[3]=()=>{K().then(W).then(Q).then(y).catch(s=>console.error(s))})},"صدور فاکتور ")])])])):v("",!0),c.value===4?(a(),l("div",Re,[t[27]||(t[27]=e("h2",null,"صدور فاکتور",-1)),e("div",Ve,[N.value?(a(),l("div",je," Loading...")):v("",!0),e("div",Je,[e("div",De,[t[21]||(t[21]=e("div",{class:"store-details"},[e("h2",null,"فروشگاه ایرانی")],-1)),e("div",Te,[e("p",null,[t[16]||(t[16]=e("strong",null,"شماره فاکتور:",-1)),g(" "+n(p.value.invoice_number),1)]),e("p",null,[t[17]||(t[17]=e("strong",null,"تاریخ:",-1)),g(" "+n(p.value.date),1)]),e("p",null,[t[18]||(t[18]=e("strong",null,"خریدار:",-1)),g(" "+n(P.value.name),1)]),e("p",null,[t[19]||(t[19]=e("strong",null,"تلفن:",-1)),g(" "+n(i("058-362-10992")),1)]),e("p",null,[t[20]||(t[20]=e("strong",null,"پست الکترونیکی:",-1)),g(" "+n(P.value.email),1)])])]),e("div",ze,[e("table",null,[t[23]||(t[23]=e("thead",null,[e("tr",null,[e("th",null,"#"),e("th",null,"تصویر"),e("th",null,"محصول"),e("th",null,"تعداد"),e("th",null,"قیمت"),e("th",null,"مجموع"),e("th",null,"تخفیف"),e("th",null,"قیمت نهایی")])],-1)),e("tbody",null,[(a(!0),l(m,null,_(p.value.items,(s,r)=>(a(),l("tr",{key:r},[e("td",null,n(r+1),1),e("td",null,[e("img",{src:s.product.image?`${B(E).public.API_BASE_URL}${s.product.image.path}`:"/default-product-image.jpg",alt:s.product.name,class:"product-image"},null,8,Ge)]),e("td",null,n(s.product.name),1),e("td",null,n(i(s.quantity)),1),e("td",null,n(i(s.price)),1),e("td",null,n(i(s.total)),1),e("td",null,n(i(s.discount)),1),e("td",null,n(i(s.price_with_discount)),1)]))),128)),p.value.items.length?v("",!0):(a(),l("tr",He,t[22]||(t[22]=[e("td",{colspan:"8"},"محصولی موجود نیست",-1)])))])])]),e("div",Ke,[e("div",null,[t[24]||(t[24]=e("span",null,"جمع کل:",-1)),e("strong",null,n(i(p.value.sub_total_amount)),1)]),e("div",null,[e("span",null,"مالیات ("+n(i(p.value.tax_rate))+"%):",1),e("strong",null,n(i(p.value.tax)),1)]),e("div",null,[t[25]||(t[25]=e("span",null,"هزینه ارسال:",-1)),e("strong",null,n(i(p.value.shipping_cost)),1)]),e("div",Qe,[t[26]||(t[26]=e("span",null,"مجموع کل:",-1)),e("strong",null,n(i(p.value.total_amount)),1)])])])]),e("div",We,[e("button",{onClick:C},"برگست به روش ارسال"),e("button",{onClick:t[4]||(t[4]=()=>{X().then(y).catch(s=>console.error(s))})},"انتخاب روش پرداخت ")])])):v("",!0),c.value===5?(a(),l("div",Xe,[t[28]||(t[28]=e("h2",null,"انتخاب روش پرداخت",-1)),e("div",Ye,[e("div",Ze,[(a(!0),l(m,null,_(L.value,s=>(a(),l("div",{key:s.id,class:k(["payment-card",{selected:f.value===s.id}]),onClick:r=>f.value=s.id},[e("label",null,[F(e("input",{type:"radio",value:s.id,"onUpdate:modelValue":t[5]||(t[5]=r=>f.value=r),required:"",hidden:""},null,8,tt),[[I,f.value]]),e("div",st,[e("h3",null,n(s.name),1),e("img",{src:s.image?`${o.$config.public.API_BASE_URL}${s.image.path}`:"/default-payment-image.jpg",alt:s.name},null,8,ot)]),e("p",null,n(s.description),1),e("p",null,"Is Active: "+n(s.is_active),1)])],10,et))),128))])]),e("div",nt,[e("button",{onClick:C},"برگشت به صدور فاکتور"),e("button",{onClick:t[6]||(t[6]=()=>{Y().then(y).catch(s=>console.error(s))})},"انتخاب درگاه پرداخت ")])])):v("",!0),c.value===6?(a(),l("div",lt,[t[29]||(t[29]=e("h2",null,"انتخاب درگاه پرداخت",-1)),e("div",at,[e("div",rt,[(a(!0),l(m,null,_(x.value,s=>(a(),l("div",{key:s.id,class:k(["online-card",{selected:w.value===s.id}]),onClick:r=>w.value=s.id},[e("label",null,[F(e("input",{type:"radio",value:s.id,"onUpdate:modelValue":t[7]||(t[7]=r=>w.value=r),required:"",hidden:""},null,8,dt),[[I,w.value]]),e("h3",null,n(s.name),1),e("img",{src:s.image?`${o.$config.public.API_BASE_URL}${s.image.path}`:"/default-payment-image.jpg",alt:s.name},null,8,ct)])],10,it))),128))]),e("div",ut,[e("button",{onClick:C},"برگشت به انتخاب روش پرداخت"),e("button",{onClick:t[8]||(t[8]=()=>{ee().then(y).catch(s=>console.error(s))})},"اتصال به درگاه ")])])])):v("",!0)])],64)}}},_t=se(pt,[["__scopeId","data-v-90bcc87a"]]);export{_t as default};
