import{_ as p,u as i,f as y,g as v,c as m,a as e,h as l,v as r,i as f,o as x}from"./DapnXSll.js";const b={class:"body"},g={__name:"add-new-address",setup(c){const{$axios:d}=i(),n=y(),s=v({street:"",city:"",state:"",postal_code:"",country:""}),u=async()=>{try{const a=new FormData;a.append("street",s.value.street),a.append("city",s.value.city),a.append("state",s.value.state),a.append("postal_code",s.value.postal_code),a.append("country",s.value.country);const t=await d.post("user/add/address",a);console.log(t.data),t.data?(alert("Address Registration successful!"),await n.push("/add-address-to-order")):alert("Address Registration failed: "+t.data.message)}catch(a){console.error("Address Registration failed:",a),alert("An error occurred during address registration. Please try again.")}};return(a,t)=>(x(),m("div",b,[e("form",{onSubmit:f(u,["prevent"]),enctype:"multipart/form-data"},[t[10]||(t[10]=e("h2",null,"Address Register Form",-1)),e("p",null,[t[5]||(t[5]=e("label",{for:"street"},"Street",-1)),l(e("input",{type:"text",id:"street","onUpdate:modelValue":t[0]||(t[0]=o=>s.value.street=o)},null,512),[[r,s.value.street]])]),e("p",null,[t[6]||(t[6]=e("label",{for:"city"},"City",-1)),l(e("input",{type:"text",id:"city","onUpdate:modelValue":t[1]||(t[1]=o=>s.value.city=o)},null,512),[[r,s.value.city]])]),e("p",null,[t[7]||(t[7]=e("label",{for:"state"},"State",-1)),l(e("input",{type:"text",id:"state","onUpdate:modelValue":t[2]||(t[2]=o=>s.value.state=o)},null,512),[[r,s.value.state]])]),e("p",null,[t[8]||(t[8]=e("label",{for:"postal_code"},"Postal Code",-1)),l(e("input",{type:"text",id:"postal_code","onUpdate:modelValue":t[3]||(t[3]=o=>s.value.postal_code=o)},null,512),[[r,s.value.postal_code]])]),e("p",null,[t[9]||(t[9]=e("label",{for:"country"},"Country",-1)),l(e("input",{type:"text",id:"country","onUpdate:modelValue":t[4]||(t[4]=o=>s.value.country=o)},null,512),[[r,s.value.country]])]),t[11]||(t[11]=e("button",{type:"submit"},"Save",-1))],32)]))}},A=p(g,[["__scopeId","data-v-dc4012c6"]]);export{A as default};
