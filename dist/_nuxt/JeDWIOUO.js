import{u as x,Q as y,e as b,r as f,c as k,b as S,a,P as T,h as U,f as n,v as r,t as i,F as V,o as R,m as A}from"./BgHRWrjF.js";import{_ as D}from"./DlAUqK2U.js";const F={class:"body"},H={style:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"}},I={class:"avatar-preview"},B=["src"],C="نام خود را وارد کنید.",_="یک نام کاربری منحصربه‌فرد وارد کنید.",L="آدرس ایمیل خود را وارد کنید.",N="یک رمز عبور قوی انتخاب کنید.",P="رمز عبور را برای تأیید تکرار کنید.",q={__name:"register",setup(z){const{$axios:u}=x(),p=y(),v=b(),d=f(null),t=f({name:"",username:"",email:"",password:"",password_confirmation:""}),c=s=>{const e=s.target.files[0];if(e){const l=new FileReader;l.onload=o=>{d.value=o.target.result},l.readAsDataURL(e)}},g=()=>{document.querySelector("#avatar").click()},w=async()=>{try{const s=new FormData;s.append("name",t.value.name),s.append("username",t.value.username),s.append("email",t.value.email),s.append("password",t.value.password),s.append("password_confirmation",t.value.password_confirmation);const e=document.querySelector("#avatar").files[0];e&&s.append("image",e);const l=await u.post("user/create",s,{headers:{"Content-Type":"multipart/form-data"}});if(console.log(l.data),l.data){alert("Registration successful!");const o=await u.post("user/login",{email:t.value.email,password:t.value.password}),m=l.data.token;p.setToken(m),localStorage.setItem("auth_token",p.token),console.log(p.token),console.log("Login successful:",m),await v.push("/")}else alert("Registration failed: "+l.data.message)}catch(s){console.error("Registration failed:",s),alert("An error occurred during registration. Please try again.")}};return(s,e)=>{const l=A;return R(),k(V,null,[S(l),a("div",F,[e[14]||(e[14]=a("div",{class:"store-info"},[a("img",{src:T,alt:"Store Logo",class:"store-logo"}),a("div",{class:"store-details"},[a("h2",null,"فروشگاه آنلاین ")])],-1)),a("form",{onSubmit:U(w,["prevent"]),enctype:"multipart/form-data"},[e[12]||(e[12]=a("h2",null,"فرم ثبت‌نام کاربر",-1)),a("p",H,[e[5]||(e[5]=a("label",{for:"avatar"},"آپلود آواتار",-1)),a("input",{type:"file",id:"avatar",ref:"avatarInput",onChange:c,accept:"image/*"},null,544),e[6]||(e[6]=a("span",{class:"help-text"},"یک فایل تصویر برای آواتار خود انتخاب کنید.",-1))]),a("div",I,[a("img",{style:{"font-family":"'Vazirmatn', sans-serif","font-size":".7rem"},src:d.value||"https://example.com/default-avatar.png",alt:"پیش‌نمایش آواتار",onClick:g},null,8,B)]),a("p",null,[e[7]||(e[7]=a("label",{for:"name"},"نام",-1)),n(a("input",{type:"text",id:"name","onUpdate:modelValue":e[0]||(e[0]=o=>t.value.name=o)},null,512),[[r,t.value.name]]),a("span",{class:"help-text"},i(C))]),a("p",null,[e[8]||(e[8]=a("label",{for:"username"},"نام کاربری",-1)),n(a("input",{type:"text",id:"username","onUpdate:modelValue":e[1]||(e[1]=o=>t.value.username=o)},null,512),[[r,t.value.username]]),a("span",{class:"help-text"},i(_))]),a("p",null,[e[9]||(e[9]=a("label",{for:"email"},"ایمیل",-1)),n(a("input",{type:"email",id:"email","onUpdate:modelValue":e[2]||(e[2]=o=>t.value.email=o)},null,512),[[r,t.value.email]]),a("span",{class:"help-text"},i(L))]),a("p",null,[e[10]||(e[10]=a("label",{for:"password"},"رمز عبور",-1)),n(a("input",{type:"password",id:"password","onUpdate:modelValue":e[3]||(e[3]=o=>t.value.password=o)},null,512),[[r,t.value.password]]),a("span",{class:"help-text"},i(N))]),a("p",null,[e[11]||(e[11]=a("label",{for:"password2"},"تایید رمز عبور",-1)),n(a("input",{type:"password",id:"password_confirmation","onUpdate:modelValue":e[4]||(e[4]=o=>t.value.password_confirmation=o)},null,512),[[r,t.value.password_confirmation]]),a("span",{class:"help-text"},i(P))]),e[13]||(e[13]=a("button",{type:"submit"},"ذخیره",-1))],32)])],64)}}},j=D(q,[["__scopeId","data-v-54e309ab"]]);export{j as default};
