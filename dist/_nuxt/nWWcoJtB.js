import{c,b as n,a as o,P as f,h as g,f as l,v as d,w as u,d as a,F as w,Q as h,e as v,_ as k,R as x,o as S,m as y}from"./k-3Yaxe7.js";import{_ as b}from"./DlAUqK2U.js";const L={setup(){const e=h(),t=v();return{authStore:e,router:t}},data(){return{email:"",password:""}},methods:{async handleLogin(){try{const t=(await this.$axios.post("user/login",{email:this.email,password:this.password})).data.token;this.authStore.setToken(t),localStorage.setItem("auth_token",this.authStore.token),await this.$router.push("/")}catch{alert("خطایی در بارگذاری اطلاعات رخ داد.")}}}},V={class:"body"},B={class:"login-container"},N={class:"forgot-password"},T={class:"signup"};function q(e,t,C,F,r,i){const p=y,m=k,_=x("router-link");return S(),c(w,null,[n(p),o("div",V,[t[7]||(t[7]=o("div",{class:"store-info"},[o("img",{src:f,alt:"Store Logo",class:"store-logo"}),o("div",{class:"store-details"},[o("h2",null,"ورود به فروشگاه آنلاین")])],-1)),o("div",B,[o("form",{onSubmit:t[2]||(t[2]=g((...s)=>i.handleLogin&&i.handleLogin(...s),["prevent"]))},[l(o("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=s=>r.email=s),placeholder:"ایمیل",required:""},null,512),[[d,r.email]]),l(o("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=s=>r.password=s),placeholder:"رمز عبور",required:""},null,512),[[d,r.password]]),t[3]||(t[3]=o("button",{type:"submit"},"ورود",-1))],32),o("div",N,[n(m,{to:"/forgot-password"},{default:u(()=>t[4]||(t[4]=[a("رمز عبور خود را فراموش کرده‌اید؟")])),_:1})]),o("div",T,[t[6]||(t[6]=a(" جدید در سایت؟ ")),n(_,{to:"/register"},{default:u(()=>t[5]||(t[5]=[a("همین حالا ثبت‌نام کنید")])),_:1})])])])],64)}const R=b(L,[["render",q],["__scopeId","data-v-82cf1095"]]);export{R as default};
