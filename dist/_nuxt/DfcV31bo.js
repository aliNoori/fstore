import{_ as p,U as u,g as m,V as g,c as f,a as o,i as w,j as a,v as i,d as l,b as h,w as v,o as k}from"./DO28nGMZ.js";import{_ as x}from"./9Pu0FPh4.js";const y={setup(){const s=u(),t=m();return{authStore:s,router:t}},data(){return{email:"",password:""}},methods:{async handleLogin(){try{const t=(await this.$axios.post("user/login",{email:this.email,password:this.password})).data.token;this.authStore.setToken(t),localStorage.setItem("auth_token",this.authStore.token),await this.$router.push("/")}catch{alert("خطایی در بارگذاری اطلاعات رخ داد.")}}}},_={class:"body"},c={class:"login-container"},S={class:"signup"};function V(s,t,b,B,r,n){const d=g("router-link");return k(),f("div",_,[t[8]||(t[8]=o("img",{src:x,alt:"صفحه اصلی"},null,-1)),o("div",c,[t[6]||(t[6]=o("img",{src:"https://example.com/your-logo.png",alt:"لوگوی برند"},null,-1)),o("form",{onSubmit:t[2]||(t[2]=w((...e)=>n.handleLogin&&n.handleLogin(...e),["prevent"]))},[a(o("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>r.email=e),placeholder:"ایمیل",required:""},null,512),[[i,r.email]]),a(o("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>r.password=e),placeholder:"رمز عبور",required:""},null,512),[[i,r.password]]),t[3]||(t[3]=o("button",{type:"submit"},"ورود",-1))],32),t[7]||(t[7]=o("div",{class:"forgot-password"},[o("a",{href:"#"},"رمز عبور خود را فراموش کرده‌اید؟")],-1)),o("div",S,[t[5]||(t[5]=l(" جدید در سایت؟ ")),h(d,{to:"/register"},{default:v(()=>t[4]||(t[4]=[l("همین حالا ثبت‌نام کنید")])),_:1})])])])}const T=p(y,[["render",V],["__scopeId","data-v-1d9fac22"]]);export{T as default};
