import{_ as i}from"./COnKf4XA.js";import{_ as c,N as d,T as p,c as a,e as _,t as n,a as o,d as s,b as m,w as k,o as l}from"./DapnXSll.js";const g={setup(){return{authStore:d()}},data(){return{error:null,transaction:{}}},mounted(){const r=(this._.provides[p]||this.$route).query;if(console.log(r),r.error)this.error=r.error;else{this.transaction={order_id:r.order_id,amount:r.amount,token:r.token,rrn:r.rrn,created_at:new Date().toLocaleString()};const t=r.auth_token;localStorage.setItem("auth_token",t),this.authStore.setToken(t)}}},f={class:"container"},y={key:0,class:"error"},S={key:1,class:"message"},x={key:2},T={class:"transaction-details"};function v(r,t,N,h,e,b){const u=i;return l(),a("div",f,[e.error?(l(),a("h1",y,"Error")):_("",!0),e.error?(l(),a("p",S,n(e.error),1)):(l(),a("div",x,[t[5]||(t[5]=o("h1",null,"Transaction Successful",-1)),t[6]||(t[6]=o("p",{class:"message"},"Your transaction was completed successfully. Here are the details:",-1)),o("div",T,[o("p",null,[t[0]||(t[0]=o("strong",null,"Order ID:",-1)),s(" "+n(e.transaction.order_id),1)]),o("p",null,[t[1]||(t[1]=o("strong",null,"Amount:",-1)),s(" "+n(e.transaction.amount),1)]),o("p",null,[t[2]||(t[2]=o("strong",null,"Token:",-1)),s(" "+n(e.transaction.token),1)]),o("p",null,[t[3]||(t[3]=o("strong",null,"RRN:",-1)),s(" "+n(e.transaction.rrn),1)]),o("p",null,[t[4]||(t[4]=o("strong",null,"Transaction Date:",-1)),s(" "+n(e.transaction.created_at),1)])])])),m(u,{to:"/",class:"back-button"},{default:k(()=>t[7]||(t[7]=[s("Back to Home")])),_:1})])}const D=c(g,[["render",v],["__scopeId","data-v-a9935202"]]);export{D as default};
