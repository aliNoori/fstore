import{_ as p,c as r,a as o,F as h,r as c,i as u,o as n,n as g,j as m,l as S,t as d}from"./CwEgGED3.js";const M={data(){return{shippingMethods:[],selectedShippingMethod:null}},async mounted(){await this.loadShippingMethods()},methods:{async loadShippingMethods(){try{const i=await this.$axios.get("/shippingMethod/list");this.shippingMethods=i.data.shippingMethods}catch(i){console.error("Failed to load shippingMethods:",i)}},async handleSubmit(){if(!this.selectedShippingMethod){console.error("No shippingMethod selected");return}try{const i=JSON.parse(localStorage.getItem("order_number")),e=await this.$axios.post(`user/addShipping/${this.selectedShippingMethod}/order/${i}`);console.log("ShippingMethod added to order:",e.data),this.$router.push("/create-invoice")}catch(i){console.error("Failed to add shippingMethod to order:",i)}}}},_={id:"shipping-method-page"},v={class:"cards-container"},y=["onClick"],b=["value"];function f(i,e,k,w,s,l){return n(),r("div",_,[e[3]||(e[3]=o("h2",null,"Select Your Shipping Method",-1)),o("div",v,[(n(!0),r(h,null,c(s.shippingMethods,t=>(n(),r("div",{key:t.id,class:g(["card",{selected:s.selectedShippingMethod===t.id}]),onClick:a=>s.selectedShippingMethod=t.id},[o("label",null,[m(o("input",{type:"radio",value:t.id,"onUpdate:modelValue":e[0]||(e[0]=a=>s.selectedShippingMethod=a),required:"",hidden:""},null,8,b),[[S,s.selectedShippingMethod]]),o("h3",null,d(t.name),1),o("p",null,d(t.description),1),o("p",null,"Cost: "+d(t.cost),1),o("p",null,"Estimated Delivery: "+d(t.delivery_time),1)])],10,y))),128))]),o("form",{onSubmit:e[1]||(e[1]=u((...t)=>l.handleSubmit&&l.handleSubmit(...t),["prevent"]))},e[2]||(e[2]=[o("button",{type:"submit"},"Add Shipping Method To Order",-1)]),32)])}const C=p(M,[["render",f],["__scopeId","data-v-c981cb11"]]);export{C as default};
