!function(e){function t(t){for(var r,a,u=t[0],c=t[1],f=t[2],l=0,d=[];l<u.length;l++)a=u[l],o[a]&&d.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(s&&s(t);d.length;)d.shift()();return i.push.apply(i,f||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,u=1;u<n.length;u++){var c=n[u];0!==o[c]&&(r=!1)}r&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={16:0},i=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise(function(t,r){n=o[e]=[t,r]});t.push(n[2]=r);var i,u=document.createElement("script");u.charset="utf-8",u.timeout=120,a.nc&&u.setAttribute("nonce",a.nc),u.src=function(e){return a.p+"js/"+({1:"base64-js",2:"buffer",3:"readable-stream"}[e]||e)+"."+{1:"a1851a7e160da8a0916d",2:"8dec8640fef053e8a368",3:"b4f51893fe826c2c431f",38:"dd56d2cafdde31cafa26",39:"872055f8c574ebb0655a"}[e]+".js"}(e);var c=new Error;i=function(t){u.onerror=u.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",c.name="ChunkLoadError",c.type=r,c.request=i,n[1](c)}o[e]=void 0}};var f=setTimeout(function(){i({type:"timeout",target:u})},12e4);u.onerror=u.onload=i,document.head.appendChild(u)}return Promise.all(t)},a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a.oe=function(e){throw console.error(e),e};var u=window.webpackJsonp=window.webpackJsonp||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var f=0;f<u.length;f++)t(u[f]);var s=c;i.push([0,0,17,5,15,23,26,35,37,4,6,7,8,9,10,11,12,13,14,18,19,20,21,22,24,25,27,28,29,30,31,32,33,34,36]),n()}({0:function(e,t,n){e.exports=n("Vtdi")},"9+wM":function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=n("HlzF"),o=Object.values;function i(e){var t=e.loader,n={effects:!0,ambience:!0};function i(e,n){if(n){var o=t.resources[n].data;return o.mute(e),o}return void 0===e?r.Howler._muted:r.Howler.mute(e)}function a(e){return o(t.resources).filter(function(e){return e.metadata&&"sound"===e.metadata.type}).filter(e)}return document.addEventListener("visibilitychange",function(){return i(document.hidden)}),{play:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=t.resources[e].data;return r.play(),r.rate=n,r},mute:i,volume:function(e){return r.Howler.volume(e)},getBy:a,stop:function(e){var n=t.resources[e].data;return n.stop(),n},get effects(){return n.effects},set effects(e){a(function(e){return"effects"===e.metadata.subType}).forEach(function(t){return t.data.mute(!e)}),n.effects=e},get ambience(){return n.ambience},set ambience(e){a(function(e){return"ambience"===e.metadata.subType}).forEach(function(t){return t.data.mute(!e)}),n.ambience=e}}}},Bmwb:function(e,t,n){"use strict";(function(e){n.d(t,"a",function(){return p});n("NBl8");var r=n("IqKQ"),o=n("uhBA"),i=n.n(o),a=n("9+wM"),u=n("yEsC"),c=n("zYDz"),f=n("UmTu"),s=Object.defineProperties,l=Object.assign,d=Object.freeze;function p(){var t=new r.Application({resolution:devicePixelRatio,antialias:!0}),n=Object(u.a)(t),o=Object(a.a)(t),p={};s(t,{resource:{get:function(){return n}},sound:{get:function(){return o}},scenes:{get:function(){return p}}});var h=new i.a;return l(t,{on:function(e,t){h.on(e,t)},once:function(e,t){h.once(e,t)},off:function(e,t){h.off(e,t)},emit:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];h.emit.apply(h,[e].concat(n))},resize:function(){Object(c.a)(t),t.emit("resize")}}),e.addEventListener("resize",t.resize),e.addEventListener("orientationchange",t.resize),Object(f.e)("#preload").remove(),Object(f.e)("#app").prepend(t.view),t.resize(),d(t)}}).call(this,n("yLpj"))},NBl8:function(e,t,n){},Vtdi:function(e,t,n){"use strict";n.r(t),function(e){n("LSZE"),n("ls82");var t=n("Bmwb");function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function o(e,t,n,r,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void n(e)}u.done?t(c):Promise.resolve(c).then(r,o)}function i(){var a;return a=regeneratorRuntime.mark(function o(){var i,a,u,c;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,document.title="For Every Gamer | 61 Studio",e.app=Object(t.a)(),o.next=5,Promise.all([Promise.all([n.e(0),n.e(3),n.e(1),n.e(2),n.e(39)]).then(n.bind(null,"Sz3g")),Promise.all([n.e(0),n.e(3),n.e(1),n.e(2),n.e(38)]).then(n.bind(null,"OA2e"))]);case 5:return i=o.sent,a=r(i,2),u=a[0],c=a[1],o.next=11,app.resource.load(u,c);case 11:u.create(),c.create(),app.resize(),o.next=19;break;case 16:o.prev=16,o.t0=o.catch(0),console.error(o.t0);case 19:case"end":return o.stop()}},o,null,[[0,16]])}),(i=function(){var e=this,t=arguments;return new Promise(function(n,r){var i=a.apply(e,t);function u(e){o(i,n,r,u,c,"next",e)}function c(e){o(i,n,r,u,c,"throw",e)}u(void 0)})}).apply(this,arguments)}!function(){i.apply(this,arguments)}()}.call(this,n("yLpj"))},yEsC:function(e,t,n){"use strict";n.d(t,"a",function(){return f});var r=n("IqKQ"),o=n("HlzF"),i=n("J9Y1");function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){u(e,t,n[t])})}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function f(e){var t=e.loader;return t.pre(function(e,t){if(function(e){return!e||e.loadType!==r.LoaderResource.LOAD_TYPE.AUDIO}(e))return t();var n=r.LoaderResource.STATUS_FLAGS.LOADING;e._setFlag(n,!0);var i=e.metadata;e.data=new o.Howl(a({},i,{onload:function(){e.complete(),t()},onloaderror:function(n,r){console.error(e),e.abort(r),t()}}))}).pre(s),t.on("progress",function(){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];(e=app).emit.apply(e,["loading"].concat(n))}),{get:function(e){return t.resources[e]},load:function(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return n.map(function(e){return(0,e.reserve)()}).forEach(function(e){var n=e.filter(function(e){return"sound"===e.type}).map(function(e){var t=new r.LoaderResource(e.name,"",{loadType:r.LoaderResource.LOAD_TYPE.AUDIO});return t.metadata=e,t}),o=e.filter(function(e){return"sound"!==e.type});return t.add([].concat(c(o),c(n)))}),new Promise(function(e){return t.load(e)})},fetch:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var o=n.filter(function(e){return!t.resources[e]});return t.add(o),new Promise(function(e){if(0===o.length){var r=n.map(function(e){return t.resources[e]});return e(r)}t.load(function(t,r){var o=n.map(function(e){return r[e]});e(o)})})},reset:function(){t.reset()}}}function s(e,t){if(!e||"font"!==e.name)return t();Object(i.load)(a({},e.metadata,{active:function(){e.complete(),t()},inactive:function(){console.error(e),t()}}))}},zYDz:function(e,t,n){"use strict";n.d(t,"a",function(){return o});n("UmTu"),n("k7+O");function r(){var e,t={width:(e=document.documentElement).clientWidth,height:e.clientHeight};return t.width/t.height>16/9?t.width=t.height*(16/9):t.height=t.width/(16/9),t}function o(e){var t,n,o,i,a=r();t=e.view.parentElement,o=(n=a).width,i=n.height,t&&(t.style.width=o+"px",t.style.height=i+"px"),function(e,t){var n=t.width,r=t.height;e.width=n,e.height=r}(e.view,a),e.renderer.resize(a.width,a.height),e.stage.children.forEach(function(e){var t=1920,n=1080;e.scale.x=a.width/t,e.scale.y=a.height/n})}}});