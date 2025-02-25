import{_ as d,c as l,a as t,t as s,F as p,r as _,f as m,d as a,b as v,w as h,e as g,o as r}from"./CwEgGED3.js";const y={data(){return{invoice:null,isLoading:!0,user:null}},methods:{async createInvoice(){try{const o=JSON.parse(localStorage.getItem("order_number")),e=await this.$axios.get(`invoice/create/${o}`);this.invoice=e.data.invoice}catch(o){console.error("Invoice error:",o.response?o.response.data:o)}finally{}},async fetchUser(){try{const o=await this.$axios.get("user/profile");this.user=o.data,this.isLoading=!1}catch(o){console.error("Fetch user error:",o.response?o.response.data:o)}}},mounted(){this.createInvoice(),this.fetchUser()}},f={class:"body"},b={key:0},x={key:1,class:"invoice-container"},I={class:"invoice-header"},S={class:"user-details"},k={class:"invoice-items"},N=["src","alt"],$={class:"discount-cell"},L={key:0},P={class:"invoice-summary"},w={class:"summary-item"},B={class:"summary-item"},D={class:"summary-item"},T={class:"total"};function U(o,e,V,C,n,E){const u=g;return r(),l("div",f,[n.isLoading?(r(),l("div",b," Loading... ")):(r(),l("div",x,[t("div",I,[e[2]||(e[2]=t("div",{class:"store-details"},[t("h2",null,"Store Name")],-1)),t("div",S,[t("p",null,"Invoice #: "+s(n.invoice.invoice_number),1),e[0]||(e[0]=t("p",null,"Date: ",-1)),t("p",null,"User: "+s(n.user.name),1),e[1]||(e[1]=t("p",null,"Phone: (123) 456-7890",-1)),t("p",null,"Email: "+s(n.user.email),1)])]),t("div",k,[t("table",null,[e[4]||(e[4]=t("thead",null,[t("tr",null,[t("th",null,"#"),t("th",null,"Image"),t("th",null,"Product"),t("th",null,"Quantity"),t("th",null,"Price"),t("th",null,"Total"),t("th",null,"Discount"),t("th",null,"PriceWithDiscount")])],-1)),t("tbody",null,[(r(!0),l(p,null,_(n.invoice.items,(i,c)=>(r(),l("tr",{key:c},[t("td",null,s(c+1),1),t("td",null,[t("img",{src:i.product.image?`${o.$config.public.API_BASE_URL}${i.product.image.path}`:"/default-product-image.jpg",alt:i.product.name,class:"product-image"},null,8,N)]),t("td",null,s(i.product.name),1),t("td",null,s(i.quantity),1),t("td",null,"$"+s(i.price),1),t("td",null,"$"+s(i.total),1),t("td",$,"$"+s(i.discount),1),t("td",null,"$"+s(i.price_with_discount),1)]))),128)),n.invoice.items.length?m("",!0):(r(),l("tr",L,e[3]||(e[3]=[t("td",{colspan:"8"},"No items found",-1)])))])])]),t("div",P,[t("div",w,[e[5]||(e[5]=t("span",null,"Subtotal:",-1)),a(" $"+s(n.invoice.sub_total_amount),1)]),t("div",B,[t("span",null,"Tax ("+s(n.invoice.tax_rate)+"%):",1),a(" $"+s(n.invoice.tax),1)]),t("div",D,[e[6]||(e[6]=t("span",null,"Shipping Cost:",-1)),a(" $"+s(n.invoice.shipping_cost),1)]),t("div",T," Total: $"+s(n.invoice.total_amount),1)]),v(u,{to:"/select-payment-methods",class:"invoice_add_address"},{default:h(()=>e[7]||(e[7]=[a(" SelectPaymentMethods ")])),_:1})]))])}const A=d(y,[["render",U],["__scopeId","data-v-63d20b6f"]]);export{A as default};
