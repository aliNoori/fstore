import{m as i,g as r,o as d,c as l,a as t,_ as p}from"./CXZtXMO-.js";const c={class:"container"},m={class:"header"},u={class:"cards"},v={class:"card"},f={class:"card"},g={class:"card"},b=i({__name:"admin-panel",setup(k){const o=r();function n(e){o.push(e)}return(e,s)=>(d(),l("div",c,[t("header",m,[s[4]||(s[4]=t("h1",{class:"title"},"Admin Panel",-1)),t("button",{class:"btn",onClick:s[0]||(s[0]=a=>n("add-item"))},"Add Item")]),t("section",u,[t("div",v,[s[5]||(s[5]=t("div",{class:"icon-wrapper"},[t("i",{class:"icon fa fa-users"})],-1)),s[6]||(s[6]=t("h2",{class:"card-title"},"Users",-1)),s[7]||(s[7]=t("p",{class:"card-description"},"Manage all registered users and control their access.",-1)),t("button",{class:"btn-secondary",onClick:s[1]||(s[1]=a=>n("/admin/users-management"))},"View Details")]),t("div",f,[s[8]||(s[8]=t("div",{class:"icon-wrapper"},[t("i",{class:"icon fa fa-shopping-cart"})],-1)),s[9]||(s[9]=t("h2",{class:"card-title"},"Orders",-1)),s[10]||(s[10]=t("p",{class:"card-description"},"Track and manage customer orders with ease.",-1)),t("button",{class:"btn-secondary",onClick:s[2]||(s[2]=a=>n("/admin/orders-management"))},"View Details")]),t("div",g,[s[11]||(s[11]=t("div",{class:"icon-wrapper"},[t("i",{class:"icon fa fa-box"})],-1)),s[12]||(s[12]=t("h2",{class:"card-title"},"Products",-1)),s[13]||(s[13]=t("p",{class:"card-description"},"Add, update, and manage inventory seamlessly.",-1)),t("button",{class:"btn-secondary",onClick:s[3]||(s[3]=a=>n("/admin/products-management"))},"View Details")])])]))}}),y=p(b,[["__scopeId","data-v-9f6243c8"]]);export{y as default};
