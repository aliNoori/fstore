import{_ as c,c as a,a as s,F as m,r as h,i as u,o as i,n as p,j as y,l as g,t as l}from"./CXZtXMO-.js";const _={data(){return{paymentMethods:[],selectedPaymentMethod:null}},async mounted(){await this.loadShippingMethods()},methods:{async loadShippingMethods(){try{const t=await this.$axios.get("/paymentMethod/list");this.paymentMethods=t.data.paymentMethods}catch(t){console.error("Failed to load shippingMethods:",t)}},async handleSubmit(){if(!this.selectedPaymentMethod){console.error("No shippingMethod selected");return}try{const t=await this.$axios.post(`user/manageSelectedPayment/${this.selectedPaymentMethod}`);console.log(t.data.action),console.log("PaymentMethod :",t.data.action),t.data.action==="Online"&&this.$router.push("/online-payment-method")}catch(t){console.error("Failed to selected paymentMethod :",t)}}}},M={id:"payment-method-page"},P={class:"cards-container"},f=["onClick"],v=["value"],S=["src","alt"];function b(t,o,k,w,n,d){return i(),a("div",M,[o[3]||(o[3]=s("h2",null,"Select Your Payment Method",-1)),s("div",P,[(i(!0),a(m,null,h(n.paymentMethods,e=>(i(),a("div",{key:e.id,class:p(["card",{selected:n.selectedPaymentMethod===e.id}]),onClick:r=>n.selectedPaymentMethod=e.id},[s("label",null,[y(s("input",{type:"radio",value:e.id,"onUpdate:modelValue":o[0]||(o[0]=r=>n.selectedPaymentMethod=r),required:"",hidden:""},null,8,v),[[g,n.selectedPaymentMethod]]),s("h3",null,l(e.name),1),s("img",{src:e.image?`${t.$config.public.API_BASE_URL}${e.image.path}`:"/default-payment-image.jpg",alt:e.name,class:"payment-image"},null,8,S),s("p",null,l(e.description),1),s("p",null,"Is Active: "+l(e.is_active),1)])],10,f))),128))]),s("form",{onSubmit:o[1]||(o[1]=u((...e)=>d.handleSubmit&&d.handleSubmit(...e),["prevent"]))},o[2]||(o[2]=[s("button",{type:"submit"},"Add Payment Method To Order",-1)]),32)])}const x=c(_,[["render",b],["__scopeId","data-v-90382b48"]]);export{x as default};
