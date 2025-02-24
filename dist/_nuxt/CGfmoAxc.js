import{_ as c,c as a,a as n,F as m,r as u,i as h,o as l,n as p,j as y,l as _,t as i}from"./CXZtXMO-.js";const g={data(){return{onlinePaymentMethods:[],selectedOnlinePaymentMethod:null}},async mounted(){await this.loadOnlineMethods()},methods:{async loadOnlineMethods(){try{const s=await this.$axios.get("/onlineMethodGateway/list");this.onlinePaymentMethods=s.data.onlinePaymentMethods}catch(s){console.error("Failed to load onlinePaymentMethods:",s)}},async handleSubmit(){if(!this.selectedOnlinePaymentMethod){console.error("No onlinePaymentMethod selected");return}try{const s=JSON.parse(localStorage.getItem("order_number")),t=await this.$axios.post(`user/processPayment/${s}/${this.selectedOnlinePaymentMethod}`);console.log("url :",t.data.url),window.location.href=t.data.url}catch(s){console.error("Failed to selected onlinePaymentMethods :",s)}}}},f={id:"online-payment-method-page"},M={class:"cards-container"},O=["onClick"],P=["value"],b=["src","alt"];function v(s,t,w,S,o,r){return l(),a("div",f,[t[3]||(t[3]=n("h2",null,"Online Payment Method Page",-1)),n("div",M,[(l(!0),a(m,null,u(o.onlinePaymentMethods,e=>(l(),a("div",{key:e.id,class:p(["card",{selected:o.selectedOnlinePaymentMethod===e.id}]),onClick:d=>o.selectedOnlinePaymentMethod=e.id},[n("label",null,[y(n("input",{type:"radio",value:e.id,"onUpdate:modelValue":t[0]||(t[0]=d=>o.selectedOnlinePaymentMethod=d),required:"",hidden:""},null,8,P),[[_,o.selectedOnlinePaymentMethod]]),n("h3",null,i(e.name),1),n("img",{src:e.image?`${s.$config.public.API_BASE_URL}${e.image.path}`:"/default-payment-image.jpg",alt:e.name,class:"online-payment-image"},null,8,b),n("p",null,"Terminal ID : "+i(e.terminal_id),1),n("p",null,"Gateway Name : "+i(e.gateway),1)])],10,O))),128))]),n("form",{onSubmit:t[1]||(t[1]=h((...e)=>r.handleSubmit&&r.handleSubmit(...e),["prevent"]))},t[2]||(t[2]=[n("button",{type:"submit"},"Go to Payment",-1)]),32)])}const $=c(g,[["render",v],["__scopeId","data-v-48e2cd51"]]);export{$ as default};
