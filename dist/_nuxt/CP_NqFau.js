import{_ as v,u as y,h as k,m as b,c as n,b as R,a as o,F as c,r as m,o as r,z as $,t as d,n as B,A as x,q as A}from"./BQ5TF2ZA.js";const C={class:"container"},L={class:"user-list"},S=["src","alt"],E={class:"user-info-admin"},F={class:"user-name"},N={class:"user-email"},w={class:"roles-container"},z=["onClick","disabled"],I={key:0},M={key:1},U={__name:"users-management",setup(V){const{$axios:u}=y(),l=k([]),p=x();function g(s){return s.map(t=>({name:t,active:!0,loading:!1}))}async function f(){try{const s=await u.get("user/users/list");l.value=s.data.users_list.map(t=>({...t,roles:g(t.roles)}))}catch(s){console.error("Fetch users list error:",s.response?s.response.data:s)}}async function h(s,t){const i=l.value.find(e=>e.email===s);if(i){const e=i.roles[t];if(e){e.loading=!0;try{const a=await u.post(`permissionRoleSetting/toggleRoles/${s}`,{role:e.name});a.data.success?e.active=!e.active:console.error("Error toggling role:",a.data.message)}catch(a){console.error("Toggle role error:",a.response?a.response.data:a)}finally{e.loading=!1}}}}return b(()=>{f()}),(s,t)=>{const i=A;return r(),n(c,null,[R(i),o("div",C,[t[0]||(t[0]=o("h1",{class:"header"},"لیست کاربران",-1)),o("div",L,[(r(!0),n(c,null,m(l.value,e=>(r(),n("div",{key:e.id,class:"user-card"},[o("img",{src:e.image?`${$(p).public.API_BASE_URL}${e.image.path}`:"/default-avatar.png",alt:e.name,class:"user-avatar-admin"},null,8,S),o("div",E,[o("h2",F,d(e.name),1),o("p",N,d(e.email),1),o("div",w,[(r(!0),n(c,null,m(e.roles,(a,_)=>(r(),n("button",{key:_,class:B(["role-button",a.active?"role-active":"role-inactive"]),onClick:q=>h(e.email,_),disabled:a.loading},[a.loading?(r(),n("span",M,"در حال بارگزاری ...")):(r(),n("span",I,d(a.name),1))],10,z))),128))])])]))),128))])])],64)}}},P=v(U,[["__scopeId","data-v-13ed51c1"]]);export{P as default};
