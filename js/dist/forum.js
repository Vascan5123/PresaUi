module.exports=function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=21)}([function(t,e){t.exports=flarum.core.compat["common/app"]},function(t,e){t.exports=flarum.core.compat["helpers/listItems"]},function(t,e){t.exports=flarum.core.compat.extend},function(t,e){t.exports=flarum.core.compat["components/IndexPage"]},,function(t,e){t.exports=flarum.core.compat["components/DiscussionListItem"]},function(t,e){t.exports=flarum.core.compat["utils/DiscussionControls"]},function(t,e){t.exports=flarum.core.compat["components/Dropdown"]},function(t,e){t.exports=flarum.core.compat["helpers/icon"]},function(t,e){t.exports=flarum.core.compat["components/Link"]},function(t,e){t.exports=flarum.core.compat["helpers/highlight"]},function(t,e){t.exports=flarum.core.compat["utils/abbreviateNumber"]},function(t,e,n){"use strict";(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.a=n}).call(this,n(17))},function(t,e){t.exports=flarum.core.compat["components/LinkButton"]},function(t,e){t.exports=flarum.core.compat["utils/extractText"]},function(t,e){t.exports=flarum.core.compat["utils/humanTime"]},function(t,e){t.exports=flarum.core.compat["helpers/avatar"]},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e){t.exports=flarum.core.compat["components/Button"]},function(t,e){t.exports=flarum.core.compat["components/DiscussionList"]},,function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),s=n(2),i=n(5),a=n.n(i),c=n(6),u=n.n(c),l=n(7),p=n.n(l),f=n(8),d=n.n(f),h=n(9),b=n.n(h),v=(n(14),n(15),n(16),n(1)),y=n.n(v),g=n(10),x=n.n(g),j=n(11),S=n.n(j),N=n(12),O="object"==typeof self&&self&&self.Object===Object&&self,I=(N.a||O||Function("return this")()).Symbol;var w=function(t,e){for(var n=-1,o=null==t?0:t.length,r=Array(o);++n<o;)r[n]=e(t[n],n,t);return r},A=Array.isArray,D=Object.prototype,L=D.hasOwnProperty,P=D.toString,R=I?I.toStringTag:void 0;var _=function(t){var e=L.call(t,R),n=t[R];try{t[R]=void 0;var o=!0}catch(t){}var r=P.call(t);return o&&(e?t[R]=n:delete t[R]),r},k=Object.prototype.toString;var B=function(t){return k.call(t)},C=I?I.toStringTag:void 0;var T=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":C&&C in Object(t)?_(t):B(t)};var M=function(t){return null!=t&&"object"==typeof t};var E=function(t){return"symbol"==typeof t||M(t)&&"[object Symbol]"==T(t)},q=I?I.prototype:void 0,F=q?q.toString:void 0;var U=function t(e){if("string"==typeof e)return e;if(A(e))return w(e,t)+"";if(E(e))return F?F.call(e):"";var n=e+"";return"0"==n&&1/e==-1/0?"-0":n};var $=function(t){return null==t?"":U(t)},z=/[\\^$.*+?()[\]{}|]/g,G=RegExp(z.source);var H=function(t){return(t=$(t))&&G.test(t)?t.replace(z,"\\$&"):t},J=(n(18),n(13)),K=n.n(J),Q=n(3),V=n.n(Q);n(19);r.a.initializers.add("vascan/presa-ui",(function(){Object(s.override)(a.a.prototype,"view",(function(){var t=this.attrs.discussion,e=(t.user(),t.isUnread()),n=t.isRead(),o=!this.showRepliesCount()&&e,s=0,i=u.a.controls(t,this).toArray(),a=this.elementAttrs();if(this.attrs.params.q){var c=t.mostRelevantPost();c&&(s=c.number()),console.log(this.attrs.params.q);var l=H(this.attrs.params.q);this.highlightRegExp=new RegExp(l+"|"+l.trim().replace(/\s+/g,"|"),"gi")}else s=Math.min(t.lastPostNumber(),(t.lastReadPostNumber()||0)+1);return m("div",a,i.length?p.a.component({icon:"fas fa-ellipsis-v",className:"DiscussionListItem-controls",buttonClassName:"Button Button--icon Button--flat Slidable-underneath Slidable-underneath--right"},i):"",m("span",{className:"Slidable-underneath Slidable-underneath--left Slidable-underneath--elastic"+(e?"":" disabled"),onclick:this.markAsRead.bind(this)},d()("fas fa-check")),m("div",{className:"DiscussionListItem-content Slidable-content"+(e?" unread":"")+(n?" read":"")},m("ul",{className:"DiscussionListItem-badges badges"},y()(t.badges().toArray())),m(b.a,{href:r.a.route.discussion(t,s),className:"DiscussionListItem-main"},m("ul",{className:"DiscussionListItem-info"},y()(this.infoItems().toArray())[y()(this.infoItems().toArray()).length-1]),m("h3",{className:"DiscussionListItem-title"},x()(t.title(),this.highlightRegExp)),m("ul",{className:"DiscussionListItem-info"},y()(this.infoItems().toArray())[0])),m("span",{tabindex:"0",role:"button",className:"DiscussionListItem-count",onclick:this.markAsRead.bind(this),title:o?r.a.translator.trans("core.forum.discussion_list.mark_as_read_tooltip"):""},S()(t[o?"unreadCount":"replyCount"]()))))})),Object(s.extend)(V.a.prototype,"viewItems",(function(t){for(var e=V.a.prototype.sidebarItems().items.nav.content.children,n=0;n<e.length;n++)"separator"===e[n].itemName&&e.splice(0,n+1);console.log(e);for(var o=0;o<e.length;o++)t.add(e[o].children[0],K.a.component({icon:e[o].attrs.model.data.attributes.icon,href:"/press/t/"+e[o].attrs.model.data.attributes.slug,className:"Button Button--primary",itemClassName:"App-primaryControl"},e[o].children[0]))}))}))}]);
//# sourceMappingURL=forum.js.map