import{R as dt,S as ft,_ as pt,u as mt,Q as vt,g as K,m as bt,z as gt,c as Q,a as g,t as V,n as rt,i as yt,d as ht,e as it,q as st,h as wt,v as kt,F as ut,r as ct,o as J,s as _t}from"./DEMYdqu9.js";var lt={exports:{}};(function(nt,Z){(function(_,c){nt.exports=c()})(dt,function(){return function(_){function c(o){if(e[o])return e[o].exports;var u=e[o]={exports:{},id:o,loaded:!1};return _[o].call(u.exports,u,u.exports,c),u.loaded=!0,u.exports}var e={};return c.m=_,c.c=e,c.p="dist/",c(0)}([function(_,c,e){function o(s){return s&&s.__esModule?s:{default:s}}var u=Object.assign||function(s){for(var E=1;E<arguments.length;E++){var P=arguments[E];for(var R in P)Object.prototype.hasOwnProperty.call(P,R)&&(s[R]=P[R])}return s},y=e(1),x=(o(y),e(6)),a=o(x),m=e(7),i=o(m),d=e(8),l=o(d),v=e(9),S=o(v),z=e(10),H=o(z),p=e(11),r=o(p),h=e(14),T=o(h),M=[],X=!1,w={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},q=function(){var s=arguments.length>0&&arguments[0]!==void 0&&arguments[0];if(s&&(X=!0),X)return M=(0,r.default)(M,w),(0,H.default)(M,w.once),M},B=function(){M=(0,T.default)(),q()},n=function(){M.forEach(function(s,E){s.node.removeAttribute("data-aos"),s.node.removeAttribute("data-aos-easing"),s.node.removeAttribute("data-aos-duration"),s.node.removeAttribute("data-aos-delay")})},t=function(s){return s===!0||s==="mobile"&&S.default.mobile()||s==="phone"&&S.default.phone()||s==="tablet"&&S.default.tablet()||typeof s=="function"&&s()===!0},f=function(s){w=u(w,s),M=(0,T.default)();var E=document.all&&!window.atob;return t(w.disable)||E?n():(w.disableMutationObserver||l.default.isSupported()||(console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `),w.disableMutationObserver=!0),document.querySelector("body").setAttribute("data-aos-easing",w.easing),document.querySelector("body").setAttribute("data-aos-duration",w.duration),document.querySelector("body").setAttribute("data-aos-delay",w.delay),w.startEvent==="DOMContentLoaded"&&["complete","interactive"].indexOf(document.readyState)>-1?q(!0):w.startEvent==="load"?window.addEventListener(w.startEvent,function(){q(!0)}):document.addEventListener(w.startEvent,function(){q(!0)}),window.addEventListener("resize",(0,i.default)(q,w.debounceDelay,!0)),window.addEventListener("orientationchange",(0,i.default)(q,w.debounceDelay,!0)),window.addEventListener("scroll",(0,a.default)(function(){(0,H.default)(M,w.once)},w.throttleDelay)),w.disableMutationObserver||l.default.ready("[data-aos]",B),M)};_.exports={init:f,refresh:q,refreshHard:B}},function(_,c){},,,,,function(_,c){(function(e){function o(t,f,s){function E(b){var A=N,U=C;return N=C=void 0,W=b,O=t.apply(U,A)}function P(b){return W=b,j=setTimeout(G,f),F?E(b):O}function R(b){var A=b-L,U=b-W,at=f-A;return I?B(at,D-U):at}function Y(b){var A=b-L,U=b-W;return L===void 0||A>=f||A<0||I&&U>=D}function G(){var b=n();return Y(b)?et(b):void(j=setTimeout(G,R(b)))}function et(b){return j=void 0,k&&N?E(b):(N=C=void 0,O)}function ot(){j!==void 0&&clearTimeout(j),W=0,N=L=C=j=void 0}function tt(){return j===void 0?O:et(n())}function $(){var b=n(),A=Y(b);if(N=arguments,C=this,L=b,A){if(j===void 0)return P(L);if(I)return j=setTimeout(G,f),E(L)}return j===void 0&&(j=setTimeout(G,f)),O}var N,C,D,O,j,L,W=0,F=!1,I=!1,k=!0;if(typeof t!="function")throw new TypeError(d);return f=m(f)||0,y(s)&&(F=!!s.leading,I="maxWait"in s,D=I?q(m(s.maxWait)||0,f):D,k="trailing"in s?!!s.trailing:k),$.cancel=ot,$.flush=tt,$}function u(t,f,s){var E=!0,P=!0;if(typeof t!="function")throw new TypeError(d);return y(s)&&(E="leading"in s?!!s.leading:E,P="trailing"in s?!!s.trailing:P),o(t,f,{leading:E,maxWait:f,trailing:P})}function y(t){var f=typeof t>"u"?"undefined":i(t);return!!t&&(f=="object"||f=="function")}function x(t){return!!t&&(typeof t>"u"?"undefined":i(t))=="object"}function a(t){return(typeof t>"u"?"undefined":i(t))=="symbol"||x(t)&&w.call(t)==v}function m(t){if(typeof t=="number")return t;if(a(t))return l;if(y(t)){var f=typeof t.valueOf=="function"?t.valueOf():t;t=y(f)?f+"":f}if(typeof t!="string")return t===0?t:+t;t=t.replace(S,"");var s=H.test(t);return s||p.test(t)?r(t.slice(2),s?2:8):z.test(t)?l:+t}var i=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d="Expected a function",l=NaN,v="[object Symbol]",S=/^\s+|\s+$/g,z=/^[-+]0x[0-9a-f]+$/i,H=/^0b[01]+$/i,p=/^0o[0-7]+$/i,r=parseInt,h=(typeof e>"u"?"undefined":i(e))=="object"&&e&&e.Object===Object&&e,T=(typeof self>"u"?"undefined":i(self))=="object"&&self&&self.Object===Object&&self,M=h||T||Function("return this")(),X=Object.prototype,w=X.toString,q=Math.max,B=Math.min,n=function(){return M.Date.now()};_.exports=u}).call(c,function(){return this}())},function(_,c){(function(e){function o(n,t,f){function s(k){var b=$,A=N;return $=N=void 0,L=k,D=n.apply(A,b)}function E(k){return L=k,O=setTimeout(Y,t),W?s(k):D}function P(k){var b=k-j,A=k-L,U=t-b;return F?q(U,C-A):U}function R(k){var b=k-j,A=k-L;return j===void 0||b>=t||b<0||F&&A>=C}function Y(){var k=B();return R(k)?G(k):void(O=setTimeout(Y,P(k)))}function G(k){return O=void 0,I&&$?s(k):($=N=void 0,D)}function et(){O!==void 0&&clearTimeout(O),L=0,$=j=N=O=void 0}function ot(){return O===void 0?D:G(B())}function tt(){var k=B(),b=R(k);if($=arguments,N=this,j=k,b){if(O===void 0)return E(j);if(F)return O=setTimeout(Y,t),s(j)}return O===void 0&&(O=setTimeout(Y,t)),D}var $,N,C,D,O,j,L=0,W=!1,F=!1,I=!0;if(typeof n!="function")throw new TypeError(i);return t=a(t)||0,u(f)&&(W=!!f.leading,F="maxWait"in f,C=F?w(a(f.maxWait)||0,t):C,I="trailing"in f?!!f.trailing:I),tt.cancel=et,tt.flush=ot,tt}function u(n){var t=typeof n>"u"?"undefined":m(n);return!!n&&(t=="object"||t=="function")}function y(n){return!!n&&(typeof n>"u"?"undefined":m(n))=="object"}function x(n){return(typeof n>"u"?"undefined":m(n))=="symbol"||y(n)&&X.call(n)==l}function a(n){if(typeof n=="number")return n;if(x(n))return d;if(u(n)){var t=typeof n.valueOf=="function"?n.valueOf():n;n=u(t)?t+"":t}if(typeof n!="string")return n===0?n:+n;n=n.replace(v,"");var f=z.test(n);return f||H.test(n)?p(n.slice(2),f?2:8):S.test(n)?d:+n}var m=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},i="Expected a function",d=NaN,l="[object Symbol]",v=/^\s+|\s+$/g,S=/^[-+]0x[0-9a-f]+$/i,z=/^0b[01]+$/i,H=/^0o[0-7]+$/i,p=parseInt,r=(typeof e>"u"?"undefined":m(e))=="object"&&e&&e.Object===Object&&e,h=(typeof self>"u"?"undefined":m(self))=="object"&&self&&self.Object===Object&&self,T=r||h||Function("return this")(),M=Object.prototype,X=M.toString,w=Math.max,q=Math.min,B=function(){return T.Date.now()};_.exports=o}).call(c,function(){return this}())},function(_,c){function e(m){var i=void 0,d=void 0;for(i=0;i<m.length;i+=1)if(d=m[i],d.dataset&&d.dataset.aos||d.children&&e(d.children))return!0;return!1}function o(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function u(){return!!o()}function y(m,i){var d=window.document,l=o(),v=new l(x);a=i,v.observe(d.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}function x(m){m&&m.forEach(function(i){var d=Array.prototype.slice.call(i.addedNodes),l=Array.prototype.slice.call(i.removedNodes),v=d.concat(l);if(e(v))return a()})}Object.defineProperty(c,"__esModule",{value:!0});var a=function(){};c.default={isSupported:u,ready:y}},function(_,c){function e(d,l){if(!(d instanceof l))throw new TypeError("Cannot call a class as a function")}function o(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(c,"__esModule",{value:!0});var u=function(){function d(l,v){for(var S=0;S<v.length;S++){var z=v[S];z.enumerable=z.enumerable||!1,z.configurable=!0,"value"in z&&(z.writable=!0),Object.defineProperty(l,z.key,z)}}return function(l,v,S){return v&&d(l.prototype,v),S&&d(l,S),l}}(),y=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,x=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,a=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,m=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,i=function(){function d(){e(this,d)}return u(d,[{key:"phone",value:function(){var l=o();return!(!y.test(l)&&!x.test(l.substr(0,4)))}},{key:"mobile",value:function(){var l=o();return!(!a.test(l)&&!m.test(l.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),d}();c.default=new i},function(_,c){Object.defineProperty(c,"__esModule",{value:!0});var e=function(u,y,x){var a=u.node.getAttribute("data-aos-once");y>u.position?u.node.classList.add("aos-animate"):typeof a<"u"&&(a==="false"||!x&&a!=="true")&&u.node.classList.remove("aos-animate")},o=function(u,y){var x=window.pageYOffset,a=window.innerHeight;u.forEach(function(m,i){e(m,a+x,y)})};c.default=o},function(_,c,e){function o(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(c,"__esModule",{value:!0});var u=e(12),y=o(u),x=function(a,m){return a.forEach(function(i,d){i.node.classList.add("aos-init"),i.position=(0,y.default)(i.node,m.offset)}),a};c.default=x},function(_,c,e){function o(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(c,"__esModule",{value:!0});var u=e(13),y=o(u),x=function(a,m){var i=0,d=0,l=window.innerHeight,v={offset:a.getAttribute("data-aos-offset"),anchor:a.getAttribute("data-aos-anchor"),anchorPlacement:a.getAttribute("data-aos-anchor-placement")};switch(v.offset&&!isNaN(v.offset)&&(d=parseInt(v.offset)),v.anchor&&document.querySelectorAll(v.anchor)&&(a=document.querySelectorAll(v.anchor)[0]),i=(0,y.default)(a).top,v.anchorPlacement){case"top-bottom":break;case"center-bottom":i+=a.offsetHeight/2;break;case"bottom-bottom":i+=a.offsetHeight;break;case"top-center":i+=l/2;break;case"bottom-center":i+=l/2+a.offsetHeight;break;case"center-center":i+=l/2+a.offsetHeight/2;break;case"top-top":i+=l;break;case"bottom-top":i+=a.offsetHeight+l;break;case"center-top":i+=a.offsetHeight/2+l}return v.anchorPlacement||v.offset||isNaN(m)||(d=m),i+d};c.default=x},function(_,c){Object.defineProperty(c,"__esModule",{value:!0});var e=function(o){for(var u=0,y=0;o&&!isNaN(o.offsetLeft)&&!isNaN(o.offsetTop);)u+=o.offsetLeft-(o.tagName!="BODY"?o.scrollLeft:0),y+=o.offsetTop-(o.tagName!="BODY"?o.scrollTop:0),o=o.offsetParent;return{top:y,left:u}};c.default=e},function(_,c){Object.defineProperty(c,"__esModule",{value:!0});var e=function(o){return o=o||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(o,function(u){return{node:u}})};c.default=e}])})})(lt);var xt=lt.exports;const jt=ft(xt),Ot={key:0,class:"product-container"},St={class:"product-details"},Mt={class:"product-info","data-aos":"fade-up"},Et={class:"description"},zt={class:"price"},At={key:0,class:"cart-badge"},Lt={class:"product-image","data-aos":"zoom-in"},Nt=["src","alt"],Tt={class:"product-comments","data-aos":"fade-left"},qt={class:"rating-section"},Pt={class:"star-rating"},$t=["onClick"],Ct=["disabled"],Dt={key:0},It={class:"comment"},Ht={class:"comment-header"},Bt=["src"],Rt={class:"comment-user-info"},Wt={class:"user-name"},Ft={class:"comment-rating"},Ut={class:"comment-text"},Vt={key:1},Yt={__name:"[id]",setup(nt){const{$axios:Z}=mt(),_=vt(),c=_t(),e=K(null),o=K(""),u=K(0),y=K(null),x=K(0);K(null);const a=p=>{const r=["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];return p.toString().replace(/[0-9]/g,h=>r[h])},m=p=>Math.floor(p).toLocaleString("fa-IR"),i=K(!1),d=()=>!!localStorage.getItem("auth_token");async function l(){if(i.value=d(),i.value)try{const p=await Z.get(`cart/items/${_.params.id}/info`);y.value=p.data,x.value=y.value.quantity,console.log(p.data)}catch(p){console.error("خطا در دریافت اطلاعات:",p)}else console.log("کاربر لاگین نیست.")}async function v(){try{const p=await Z.get(`product/show/${_.params.id}`);e.value=p.data.data,console.log("جزئیات محصول:",e.value)}catch(p){console.error("خطا در دریافت جزئیات محصول:",p)}}async function S(p){if(i.value=d(),i.value)try{const r=await Z.post(`cart/item/add/${p}`);r.status===200?(console.log("محصول به سبد خرید اضافه شد:",r.data),x.value+=1):r.status===400?(console.log("تعداد درخواستی بیشتر از موجودی محصول است",r.data),alert("تعداد درخواستی بیشتر از موجودی محصول است")):r.status===404?(console.log("محصول مورد نظر یافت نشد",r.data),alert("محصول مورد نظر یافت نشد")):r.status===500?(console.log("خطایی در افزودن محصول به سبد خرید رخ داده است",r.data),alert("خطایی در افزودن محصول به سبد خرید رخ داده است")):(console.log("خطا:",r.data),alert("خطایی رخ داده است"))}catch(r){if(r.response&&r.response.status)switch(r.response.status){case 400:console.error("تعداد درخواستی بیشتر از موجودی محصول است:",r.response.data),alert("تعداد درخواستی بیشتر از موجودی محصول است");break;case 404:console.error("محصول مورد نظر یافت نشد:",r.response.data),alert("محصول مورد نظر یافت نشد");break;case 500:console.error("خطایی در افزودن محصول به سبد خرید رخ داده است:",r.response.data),alert("خطایی در افزودن محصول به سبد خرید رخ داده است");break;default:console.error("خطا:",r.response.data),alert("خطایی رخ داده است")}else console.error("خطا در افزودن محصول به سبد خرید:",r),alert("خطایی در افزودن محصول به سبد خرید رخ داد.")}else console.log("لطفا لاگین نمایید."),alert("لطفا لاگین نمایید.")}async function z(){var p,r,h;if(o.value&&u.value){const T=document.querySelector("button");T.classList.add("loading");try{(await Z.post(`product/review/${e.value.id}`,{review:o.value,rating:u.value})).status===200&&(alert("نظر شما با موفقیت ثبت شد!"),e.value.comments.push({text:o.value,author:"شما",rating:u.value}),o.value="",u.value=0)}catch(M){alert(((h=(r=(p=M.response)==null?void 0:p.data)==null?void 0:r.error)==null?void 0:h.details)||"خطا در ثبت نظر.")}finally{T.classList.remove("loading")}}}function H(p){u.value=p}return bt(()=>{_.params.id&&(v(),l()),jt.init({duration:1e3,easing:"ease-in-out"})}),gt(()=>_.params.id,p=>{p&&(v(),l())}),(p,r)=>e.value?(J(),Q("div",Ot,[g("div",St,[g("div",Mt,[g("h1",null,V(e.value.name),1),g("p",Et,V(e.value.description),1),g("p",zt,"قیمت: "+V(a(m(e.value.price)))+" تومان",1),g("p",{class:rt(["stock",{"out-of-stock":e.value.stock===0}])}," موجودی: "+V(e.value.stock>0?a(e.value.stock):"ناموجود"),3),g("button",{onClick:r[0]||(r[0]=yt(h=>S(e.value.id),["prevent"])),class:"add-to-cart-btn"},[r[2]||(r[2]=g("i",{class:"fas fa-shopping-cart"},null,-1)),r[3]||(r[3]=ht(" افزودن به سبد خرید ")),x.value>0?(J(),Q("span",At,V(a(x.value)),1)):it("",!0)])]),g("div",Lt,[g("img",{src:e.value.image?`${st(c).public.API_BASE_URL}${e.value.image.path}`:"/default-product-image.jpg",alt:e.value.name},null,8,Nt)])]),g("div",Tt,[r[7]||(r[7]=g("h2",null,"ثبت نظر:",-1)),wt(g("textarea",{"onUpdate:modelValue":r[1]||(r[1]=h=>o.value=h),placeholder:"لطفا نظر خود را در مورد محصول بنویسید...",rows:"4"},null,512),[[kt,o.value]]),g("div",qt,[r[4]||(r[4]=g("label",{for:"rating"},"ثبت امتیاز:",-1)),g("div",Pt,[(J(),Q(ut,null,ct(5,h=>g("span",{key:h,class:rt(["star",{active:h<=u.value}]),onClick:T=>H(h)}," ★ ",10,$t)),64))])]),g("button",{onClick:z,disabled:!o.value||!u.value}," ثبت نظر ",8,Ct),e.value.reviews&&e.value.reviews.length>0?(J(),Q("div",Dt,[r[5]||(r[5]=g("h3",null,"نظرات کاربران:",-1)),g("ul",null,[(J(!0),Q(ut,null,ct(e.value.reviews,(h,T)=>(J(),Q("li",{key:h.id},[g("div",It,[g("div",Ht,[g("img",{src:h.user.image?`${st(c).public.API_BASE_URL}${h.user.image.path}`:"/default-avatar.png",alt:"User Image",class:"user-avatar"},null,8,Bt),g("div",Rt,[g("p",Wt,V(h.user.name),1),g("p",Ft,"امتیاز: "+V(h.rating),1)])]),g("p",Ut,V(h.review),1)])]))),128))])])):(J(),Q("div",Vt,r[6]||(r[6]=[g("p",null,"هنوز نظری ثبت نشده است.",-1)])))])])):it("",!0)}},Kt=pt(Yt,[["__scopeId","data-v-33353819"]]);export{Kt as default};
