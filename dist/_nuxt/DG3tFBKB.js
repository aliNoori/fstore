import{c as i,a as t,s as a,h as d,f as m,v as b,t as u,o as l}from"./BgHRWrjF.js";import{_ as c}from"./DlAUqK2U.js";const p={data(){return{email:"",error:null,status:null}},methods:{async submitForm(){try{const r=await this.$axios.post("password/email",{email:this.email});this.status=r.data.message,this.error=null}catch(r){this.error=r.response.data.error,this.status=null}}}},f={class:"flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-gray-100"},g={class:"w-full max-w-md bg-white rounded-2xl shadow-lg p-8"},x={class:"mb-4"},h={key:0,class:"mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"},y={class:"list-disc text-right"},v={key:1,class:"mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"};function _(r,e,w,k,s,n){return l(),i("div",f,[t("div",g,[e[4]||(e[4]=t("h1",{class:"text-2xl font-semibold text-center text-gray-700 mb-6"},"بازنشانی رمز عبور",-1)),t("form",{onSubmit:e[1]||(e[1]=d((...o)=>n.submitForm&&n.submitForm(...o),["prevent"]))},[t("div",x,[e[2]||(e[2]=t("label",{for:"email",class:"block text-right text-gray-600 mb-2"},"ایمیل",-1)),m(t("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>s.email=o),type:"email",id:"email",name:"email",class:"input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300",required:""},null,512),[[b,s.email]])]),e[3]||(e[3]=t("button",{type:"submit",class:"w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"}," ارسال لینک بازنشانی ",-1))],32),s.error?(l(),i("div",h,[t("ul",y,[t("li",null,u(s.error),1)])])):a("",!0),s.status?(l(),i("div",v,u(s.status),1)):a("",!0)])])}const V=c(p,[["render",_],["__scopeId","data-v-66707cfb"]]);export{V as default};
