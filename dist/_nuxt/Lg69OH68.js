import{c as n,a as s,s as u,h as m,f as i,v as l,t as p,V as g,o as d}from"./BgHRWrjF.js";import{_ as f}from"./DlAUqK2U.js";const b={data(){return{email:"",password:"",passwordConfirmation:"",token:(this._.provides[g]||this.$route).query.token||"",error:null,status:null}},methods:{async submitForm(){try{const t=await this.$axios.post("password/reset",{email:this.email,password:this.password,password_confirmation:this.passwordConfirmation,token:this.token});this.status=t.data.message,this.error=null}catch(t){this.error=t.response.data.error,this.status=null}}}},c={class:"flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-gray-100"},w={class:"w-full max-w-md bg-white rounded-2xl shadow-lg p-8"},x=["value"],y={class:"mb-4"},h={class:"mb-4"},v={class:"mb-4"},_={key:0,class:"mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"},k={class:"list-disc text-right"},V={key:1,class:"mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"};function C(t,e,q,B,r,a){return d(),n("div",c,[s("div",w,[e[8]||(e[8]=s("h1",{class:"text-2xl font-semibold text-center text-gray-700 mb-6"},"بازنشانی رمز عبور",-1)),s("form",{onSubmit:e[3]||(e[3]=m((...o)=>a.submitForm&&a.submitForm(...o),["prevent"]))},[s("input",{type:"hidden",name:"token",value:r.token},null,8,x),s("div",y,[e[4]||(e[4]=s("label",{for:"email",class:"block text-right text-gray-600 mb-2"},"ایمیل",-1)),i(s("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>r.email=o),type:"email",id:"email",name:"email",class:"input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300",required:""},null,512),[[l,r.email]])]),s("div",h,[e[5]||(e[5]=s("label",{for:"password",class:"block text-right text-gray-600 mb-2"},"رمز عبور جدید",-1)),i(s("input",{"onUpdate:modelValue":e[1]||(e[1]=o=>r.password=o),type:"password",id:"password",name:"password",class:"input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300",required:""},null,512),[[l,r.password]])]),s("div",v,[e[6]||(e[6]=s("label",{for:"password_confirmation",class:"block text-right text-gray-600 mb-2"},"تایید رمز عبور",-1)),i(s("input",{"onUpdate:modelValue":e[2]||(e[2]=o=>r.passwordConfirmation=o),type:"password",id:"password_confirmation",name:"password_confirmation",class:"input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300",required:""},null,512),[[l,r.passwordConfirmation]])]),e[7]||(e[7]=s("button",{type:"submit",class:"w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition duration-300"}," بازنشانی رمز عبور ",-1))],32),r.error?(d(),n("div",_,[s("ul",k,[s("li",null,p(r.error),1)])])):u("",!0),r.status?(d(),n("div",V,p(r.status),1)):u("",!0)])])}const U=f(b,[["render",C],["__scopeId","data-v-e01c3993"]]);export{U as default};
