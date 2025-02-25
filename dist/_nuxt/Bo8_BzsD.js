import{_ as h,u as v,h as y,q as k,c as n,a as r,F as u,r as _,o as i,x as L,t as c,n as R,y as b}from"./DJIPEWz_.js";const x={class:"container"},$={class:"user-list"},B=["src","alt"],C={class:"user-info"},A={class:"user-name"},E={class:"user-email"},F={class:"roles-container"},S=["onClick","disabled"],U={key:0},w={key:1},I={__name:"users-management",setup(M){const{$axios:d}=v(),l=y([]),g=b();function m(e){return e.map(t=>({name:t,active:!0,loading:!1}))}async function p(){try{const e=await d.get("user/users/list");l.value=e.data.users_list.map(t=>({...t,roles:m(t.roles)}))}catch(e){console.error("Fetch users list error:",e.response?e.response.data:e)}}async function f(e,t){const a=l.value.find(s=>s.email===e);if(a){const s=a.roles[t];if(s){s.loading=!0;try{const o=await d.post(`permissionRoleSetting/toggleRoles/${e}`,{role:s.name});o.data.success?s.active=!s.active:console.error("Error toggling role:",o.data.message)}catch(o){console.error("Toggle role error:",o.response?o.response.data:o)}finally{s.loading=!1}}}}return k(()=>{p()}),(e,t)=>(i(),n("div",x,[t[0]||(t[0]=r("h1",{class:"header"},"Users List",-1)),r("div",$,[(i(!0),n(u,null,_(l.value,a=>(i(),n("div",{key:a.id,class:"user-card"},[r("img",{src:a.image?`${L(g).public.API_BASE_URL}${a.image.path}`:"/default-avatar.png",alt:a.name,class:"user-avatar"},null,8,B),r("div",C,[r("h2",A,c(a.name),1),r("p",E,c(a.email),1),r("div",F,[(i(!0),n(u,null,_(a.roles,(s,o)=>(i(),n("button",{key:o,class:R(["role-button",s.active?"role-active":"role-inactive"]),onClick:N=>f(a.email,o),disabled:s.loading},[s.loading?(i(),n("span",w,"Loading...")):(i(),n("span",U,c(s.name),1))],10,S))),128))])])]))),128))])]))}},z=h(I,[["__scopeId","data-v-7acdf4f3"]]);export{z as default};
