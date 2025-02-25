import{_ as c,c as a,a as d,F as u,r as h,d as i,o as n,n as m,t as l,f as A}from"./DJIPEWz_.js";const p={data(){return{order:[],addresses:[],selectedAddress:null}},async mounted(){await this.loadAddresses()},methods:{async loadAddresses(){try{const r=await this.$axios.get("user/addresses");this.addresses=r.data.addresses}catch(r){console.error("Failed to load addresses:",r)}},async handleSubmit(){if(!this.selectedAddress){console.error("No address selected");return}try{const r=await this.$axios.post(`user/create/order/${this.selectedAddress}`);this.order=r.data.order,localStorage.setItem("order_number",JSON.stringify(this.order.order_number)),console.log("Address added to order:",r.data.order),this.$router.push("/add-shipping-method-to-order")}catch(r){console.error("Failed to add address to order:",r)}},addNewAddress(){this.$router.push("/add-new-address")}}},f={id:"address-selection-page"},_={class:"address-cards-container"},b=["onClick"],y={class:"address-content"},k={key:0,class:"fas fa-check-circle check-icon"},w={class:"buttons-container"};function N(r,s,g,v,t,o){return n(),a("div",f,[s[4]||(s[4]=d("h2",null,"Select Your Address",-1)),d("div",_,[(n(!0),a(u,null,h(t.addresses,e=>(n(),a("div",{key:e.id,class:m(["address-card",{selected:t.selectedAddress===e.id}]),onClick:S=>t.selectedAddress=e.id},[d("div",y,[d("h3",null,l(e.street),1),d("p",null,l(e.city)+", "+l(e.state)+", "+l(e.country),1)]),t.selectedAddress===e.id?(n(),a("i",k)):A("",!0)],10,b))),128))]),d("div",w,[d("button",{onClick:s[0]||(s[0]=(...e)=>o.handleSubmit&&o.handleSubmit(...e)),class:"submit-button"},s[2]||(s[2]=[d("i",{class:"fas fa-check"},null,-1),i(" Add Address To Order ")])),d("button",{onClick:s[1]||(s[1]=(...e)=>o.addNewAddress&&o.addNewAddress(...e)),type:"button",class:"new-address-button"},s[3]||(s[3]=[d("i",{class:"fas fa-plus"},null,-1),i(" Add New Address ")]))])])}const C=c(p,[["render",N],["__scopeId","data-v-af96ea07"]]);export{C as default};
