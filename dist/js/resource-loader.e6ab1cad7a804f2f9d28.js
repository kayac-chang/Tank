(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{"7dg0":function(t,e,r){"use strict";r.d(e,"a",function(){return b}),r.d(e,"b",function(){return T}),r.d(e,"c",function(){return S});var i=r("u62O"),s=r.n(i),n=r("1eSL"),o=r.n(n);
/*!
 * resource-loader - v3.0.1
 * https://github.com/pixijs/pixi-sound
 * Compiled Tue, 02 Jul 2019 14:06:18 UTC
 *
 * resource-loader is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */
function a(){}function h(t,e,r,i){var s=0,n=t.length;!function o(a){a||s===n?r&&r(a):i?setTimeout(function(){e(t[s++],o)},1):e(t[s++],o)}()}function u(t){return function(){if(null===t)throw new Error("Callback was already called.");var e=t;t=null,e.apply(this,arguments)}}function d(t,e){if(null==e)e=1;else if(0===e)throw new Error("Concurrency must not be zero");var r=0,i={_tasks:[],concurrency:e,saturated:a,unsaturated:a,buffer:e/4,empty:a,drain:a,error:a,started:!1,paused:!1,push:function(t,e){s(t,!1,e)},kill:function(){r=0,i.drain=a,i.started=!1,i._tasks=[]},unshift:function(t,e){s(t,!0,e)},process:function(){for(;!i.paused&&r<i.concurrency&&i._tasks.length;){var e=i._tasks.shift();0===i._tasks.length&&i.empty(),(r+=1)===i.concurrency&&i.saturated(),t(e.data,u(n(e)))}},length:function(){return i._tasks.length},running:function(){return r},idle:function(){return i._tasks.length+r===0},pause:function(){!0!==i.paused&&(i.paused=!0)},resume:function(){if(!1!==i.paused){i.paused=!1;for(var t=1;t<=i.concurrency;t++)i.process()}}};function s(t,e,r){if(null!=r&&"function"!=typeof r)throw new Error("task callback must be a function");if(i.started=!0,null==t&&i.idle())setTimeout(function(){return i.drain()},1);else{var s={data:t,callback:"function"==typeof r?r:a};e?i._tasks.unshift(s):i._tasks.push(s),setTimeout(function(){return i.process()},1)}}function n(t){return function(){r-=1,t.callback.apply(t,arguments),null!=arguments[0]&&i.error(arguments[0],t.data),r<=i.concurrency-i.buffer&&i.unsaturated(),i.idle()&&i.drain(),i.process()}}return i}var l={};function c(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function E(t,e,r){return e&&c(t.prototype,e),r&&c(t,r),t}var _=!(!window.XDomainRequest||"withCredentials"in new XMLHttpRequest),f=null;function p(){}var T=function(){function t(e,r,i){if("string"!=typeof e||"string"!=typeof r)throw new Error("Both name and url are required for constructing a resource.");i=i||{},this._flags=0,this._setFlag(t.STATUS_FLAGS.DATA_URL,0===r.indexOf("data:")),this.name=e,this.url=r,this.extension=this._getExtension(),this.data=null,this.crossOrigin=!0===i.crossOrigin?"anonymous":i.crossOrigin,this.timeout=i.timeout||0,this.loadType=i.loadType||this._determineLoadType(),this.xhrType=i.xhrType,this.metadata=i.metadata||{},this.error=null,this.xhr=null,this.children=[],this.type=t.TYPE.UNKNOWN,this.progressChunk=0,this._dequeue=p,this._onLoadBinding=null,this._elementTimer=0,this._boundComplete=this.complete.bind(this),this._boundOnError=this._onError.bind(this),this._boundOnProgress=this._onProgress.bind(this),this._boundOnTimeout=this._onTimeout.bind(this),this._boundXhrOnError=this._xhrOnError.bind(this),this._boundXhrOnTimeout=this._xhrOnTimeout.bind(this),this._boundXhrOnAbort=this._xhrOnAbort.bind(this),this._boundXhrOnLoad=this._xhrOnLoad.bind(this),this.onStart=new o.a,this.onProgress=new o.a,this.onComplete=new o.a,this.onAfterMiddleware=new o.a}t.setExtensionLoadType=function(e,r){O(t._loadTypeMap,e,r)},t.setExtensionXhrType=function(e,r){O(t._xhrTypeMap,e,r)};var e=t.prototype;return e.complete=function(){this._clearEvents(),this._finish()},e.abort=function(e){if(!this.error){if(this.error=new Error(e),this._clearEvents(),this.xhr)this.xhr.abort();else if(this.xdr)this.xdr.abort();else if(this.data)if(this.data.src)this.data.src=t.EMPTY_GIF;else for(;this.data.firstChild;)this.data.removeChild(this.data.firstChild);this._finish()}},e.load=function(e){var r=this;if(!this.isLoading)if(this.isComplete)e&&setTimeout(function(){return e(r)},1);else switch(e&&this.onComplete.once(e),this._setFlag(t.STATUS_FLAGS.LOADING,!0),this.onStart.dispatch(this),!1!==this.crossOrigin&&"string"==typeof this.crossOrigin||(this.crossOrigin=this._determineCrossOrigin(this.url)),this.loadType){case t.LOAD_TYPE.IMAGE:this.type=t.TYPE.IMAGE,this._loadElement("image");break;case t.LOAD_TYPE.AUDIO:this.type=t.TYPE.AUDIO,this._loadSourceElement("audio");break;case t.LOAD_TYPE.VIDEO:this.type=t.TYPE.VIDEO,this._loadSourceElement("video");break;case t.LOAD_TYPE.XHR:default:_&&this.crossOrigin?this._loadXdr():this._loadXhr()}},e._hasFlag=function(t){return 0!=(this._flags&t)},e._setFlag=function(t,e){this._flags=e?this._flags|t:this._flags&~t},e._clearEvents=function(){clearTimeout(this._elementTimer),this.data&&this.data.removeEventListener&&(this.data.removeEventListener("error",this._boundOnError,!1),this.data.removeEventListener("load",this._boundComplete,!1),this.data.removeEventListener("progress",this._boundOnProgress,!1),this.data.removeEventListener("canplaythrough",this._boundComplete,!1)),this.xhr&&(this.xhr.removeEventListener?(this.xhr.removeEventListener("error",this._boundXhrOnError,!1),this.xhr.removeEventListener("timeout",this._boundXhrOnTimeout,!1),this.xhr.removeEventListener("abort",this._boundXhrOnAbort,!1),this.xhr.removeEventListener("progress",this._boundOnProgress,!1),this.xhr.removeEventListener("load",this._boundXhrOnLoad,!1)):(this.xhr.onerror=null,this.xhr.ontimeout=null,this.xhr.onprogress=null,this.xhr.onload=null))},e._finish=function(){if(this.isComplete)throw new Error("Complete called again for an already completed resource.");this._setFlag(t.STATUS_FLAGS.COMPLETE,!0),this._setFlag(t.STATUS_FLAGS.LOADING,!1),this.onComplete.dispatch(this)},e._loadElement=function(t){this.metadata.loadElement?this.data=this.metadata.loadElement:"image"===t&&void 0!==window.Image?this.data=new Image:this.data=document.createElement(t),this.crossOrigin&&(this.data.crossOrigin=this.crossOrigin),this.metadata.skipSource||(this.data.src=this.url),this.data.addEventListener("error",this._boundOnError,!1),this.data.addEventListener("load",this._boundComplete,!1),this.data.addEventListener("progress",this._boundOnProgress,!1),this.timeout&&(this._elementTimer=setTimeout(this._boundOnTimeout,this.timeout))},e._loadSourceElement=function(t){if(this.metadata.loadElement?this.data=this.metadata.loadElement:"audio"===t&&void 0!==window.Audio?this.data=new Audio:this.data=document.createElement(t),null!==this.data){if(this.crossOrigin&&(this.data.crossOrigin=this.crossOrigin),!this.metadata.skipSource)if(navigator.isCocoonJS)this.data.src=Array.isArray(this.url)?this.url[0]:this.url;else if(Array.isArray(this.url))for(var e=this.metadata.mimeType,r=0;r<this.url.length;++r)this.data.appendChild(this._createSource(t,this.url[r],Array.isArray(e)?e[r]:e));else{var i=this.metadata.mimeType;this.data.appendChild(this._createSource(t,this.url,Array.isArray(i)?i[0]:i))}this.data.addEventListener("error",this._boundOnError,!1),this.data.addEventListener("load",this._boundComplete,!1),this.data.addEventListener("progress",this._boundOnProgress,!1),this.data.addEventListener("canplaythrough",this._boundComplete,!1),this.data.load(),this.timeout&&(this._elementTimer=setTimeout(this._boundOnTimeout,this.timeout))}else this.abort("Unsupported element: "+t)},e._loadXhr=function(){"string"!=typeof this.xhrType&&(this.xhrType=this._determineXhrType());var e=this.xhr=new XMLHttpRequest;e.open("GET",this.url,!0),e.timeout=this.timeout,this.xhrType===t.XHR_RESPONSE_TYPE.JSON||this.xhrType===t.XHR_RESPONSE_TYPE.DOCUMENT?e.responseType=t.XHR_RESPONSE_TYPE.TEXT:e.responseType=this.xhrType,e.addEventListener("error",this._boundXhrOnError,!1),e.addEventListener("timeout",this._boundXhrOnTimeout,!1),e.addEventListener("abort",this._boundXhrOnAbort,!1),e.addEventListener("progress",this._boundOnProgress,!1),e.addEventListener("load",this._boundXhrOnLoad,!1),e.send()},e._loadXdr=function(){"string"!=typeof this.xhrType&&(this.xhrType=this._determineXhrType());var t=this.xhr=new XDomainRequest;t.timeout=this.timeout||5e3,t.onerror=this._boundXhrOnError,t.ontimeout=this._boundXhrOnTimeout,t.onprogress=this._boundOnProgress,t.onload=this._boundXhrOnLoad,t.open("GET",this.url,!0),setTimeout(function(){return t.send()},1)},e._createSource=function(t,e,r){r||(r=t+"/"+this._getExtension(e));var i=document.createElement("source");return i.src=e,i.type=r,i},e._onError=function(t){this.abort("Failed to load element using: "+t.target.nodeName)},e._onProgress=function(t){t&&t.lengthComputable&&this.onProgress.dispatch(this,t.loaded/t.total)},e._onTimeout=function(){this.abort("Load timed out.")},e._xhrOnError=function(){var t=this.xhr;this.abort(g(t)+" Request failed. Status: "+t.status+', text: "'+t.statusText+'"')},e._xhrOnTimeout=function(){var t=this.xhr;this.abort(g(t)+" Request timed out.")},e._xhrOnAbort=function(){var t=this.xhr;this.abort(g(t)+" Request was aborted by the user.")},e._xhrOnLoad=function(){var e=this.xhr,r="",i=void 0===e.status?200:e.status;if(""!==e.responseType&&"text"!==e.responseType&&void 0!==e.responseType||(r=e.responseText),0===i&&(r.length>0||e.responseType===t.XHR_RESPONSE_TYPE.BUFFER)?i=200:1223===i&&(i=204),2===(i/100|0)){if(this.xhrType===t.XHR_RESPONSE_TYPE.TEXT)this.data=r,this.type=t.TYPE.TEXT;else if(this.xhrType===t.XHR_RESPONSE_TYPE.JSON)try{this.data=JSON.parse(r),this.type=t.TYPE.JSON}catch(t){return void this.abort("Error trying to parse loaded json: "+t)}else if(this.xhrType===t.XHR_RESPONSE_TYPE.DOCUMENT)try{if(window.DOMParser){var s=new DOMParser;this.data=s.parseFromString(r,"text/xml")}else{var n=document.createElement("div");n.innerHTML=r,this.data=n}this.type=t.TYPE.XML}catch(t){return void this.abort("Error trying to parse loaded xml: "+t)}else this.data=e.response||r;this.complete()}else this.abort("["+e.status+"] "+e.statusText+": "+e.responseURL)},e._determineCrossOrigin=function(t,e){if(0===t.indexOf("data:"))return"";if(window.origin!==window.location.origin)return"anonymous";e=e||window.location,f||(f=document.createElement("a")),f.href=t;var r=!(t=s()(f.href,{strictMode:!0})).port&&""===e.port||t.port===e.port,i=t.protocol?t.protocol+":":"";return t.host===e.hostname&&r&&i===e.protocol?"":"anonymous"},e._determineXhrType=function(){return t._xhrTypeMap[this.extension]||t.XHR_RESPONSE_TYPE.TEXT},e._determineLoadType=function(){return t._loadTypeMap[this.extension]||t.LOAD_TYPE.XHR},e._getExtension=function(){var t=this.url,e="";if(this.isDataUrl){var r=t.indexOf("/");e=t.substring(r+1,t.indexOf(";",r))}else{var i=t.indexOf("?"),s=t.indexOf("#"),n=Math.min(i>-1?i:t.length,s>-1?s:t.length);e=(t=t.substring(0,n)).substring(t.lastIndexOf(".")+1)}return e.toLowerCase()},e._getMimeFromXhrType=function(e){switch(e){case t.XHR_RESPONSE_TYPE.BUFFER:return"application/octet-binary";case t.XHR_RESPONSE_TYPE.BLOB:return"application/blob";case t.XHR_RESPONSE_TYPE.DOCUMENT:return"application/xml";case t.XHR_RESPONSE_TYPE.JSON:return"application/json";case t.XHR_RESPONSE_TYPE.DEFAULT:case t.XHR_RESPONSE_TYPE.TEXT:default:return"text/plain"}},E(t,[{key:"isDataUrl",get:function(){return this._hasFlag(t.STATUS_FLAGS.DATA_URL)}},{key:"isComplete",get:function(){return this._hasFlag(t.STATUS_FLAGS.COMPLETE)}},{key:"isLoading",get:function(){return this._hasFlag(t.STATUS_FLAGS.LOADING)}}]),t}();function O(t,e,r){e&&0===e.indexOf(".")&&(e=e.substring(1)),e&&(t[e]=r)}function g(t){return t.toString().replace("object ","")}T.STATUS_FLAGS={NONE:0,DATA_URL:1,COMPLETE:2,LOADING:4},T.TYPE={UNKNOWN:0,JSON:1,XML:2,IMAGE:3,AUDIO:4,VIDEO:5,TEXT:6},T.LOAD_TYPE={XHR:1,IMAGE:2,AUDIO:3,VIDEO:4},T.XHR_RESPONSE_TYPE={DEFAULT:"text",BUFFER:"arraybuffer",BLOB:"blob",DOCUMENT:"document",JSON:"json",TEXT:"text"},T._loadTypeMap={gif:T.LOAD_TYPE.IMAGE,png:T.LOAD_TYPE.IMAGE,bmp:T.LOAD_TYPE.IMAGE,jpg:T.LOAD_TYPE.IMAGE,jpeg:T.LOAD_TYPE.IMAGE,tif:T.LOAD_TYPE.IMAGE,tiff:T.LOAD_TYPE.IMAGE,webp:T.LOAD_TYPE.IMAGE,tga:T.LOAD_TYPE.IMAGE,svg:T.LOAD_TYPE.IMAGE,"svg+xml":T.LOAD_TYPE.IMAGE,mp3:T.LOAD_TYPE.AUDIO,ogg:T.LOAD_TYPE.AUDIO,wav:T.LOAD_TYPE.AUDIO,mp4:T.LOAD_TYPE.VIDEO,webm:T.LOAD_TYPE.VIDEO},T._xhrTypeMap={xhtml:T.XHR_RESPONSE_TYPE.DOCUMENT,html:T.XHR_RESPONSE_TYPE.DOCUMENT,htm:T.XHR_RESPONSE_TYPE.DOCUMENT,xml:T.XHR_RESPONSE_TYPE.DOCUMENT,tmx:T.XHR_RESPONSE_TYPE.DOCUMENT,svg:T.XHR_RESPONSE_TYPE.DOCUMENT,tsx:T.XHR_RESPONSE_TYPE.DOCUMENT,gif:T.XHR_RESPONSE_TYPE.BLOB,png:T.XHR_RESPONSE_TYPE.BLOB,bmp:T.XHR_RESPONSE_TYPE.BLOB,jpg:T.XHR_RESPONSE_TYPE.BLOB,jpeg:T.XHR_RESPONSE_TYPE.BLOB,tif:T.XHR_RESPONSE_TYPE.BLOB,tiff:T.XHR_RESPONSE_TYPE.BLOB,webp:T.XHR_RESPONSE_TYPE.BLOB,tga:T.XHR_RESPONSE_TYPE.BLOB,json:T.XHR_RESPONSE_TYPE.JSON,text:T.XHR_RESPONSE_TYPE.TEXT,txt:T.XHR_RESPONSE_TYPE.TEXT,ttf:T.XHR_RESPONSE_TYPE.BUFFER,otf:T.XHR_RESPONSE_TYPE.BUFFER},T.EMPTY_GIF="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";var m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var P=window.URL||window.webkitURL;var S={caching:function(t,e){var r=this;l[t.url]?(t.data=l[t.url],t.complete()):t.onComplete.once(function(){return l[r.url]=r.data}),e()},parsing:function(t,e){if(t.data){if(t.xhr&&t.xhrType===T.XHR_RESPONSE_TYPE.BLOB)if(window.Blob&&"string"!=typeof t.data){if(0===t.data.type.indexOf("image")){var r=P.createObjectURL(t.data);return t.blob=t.data,t.data=new Image,t.data.src=r,t.type=T.TYPE.IMAGE,void(t.data.onload=function(){P.revokeObjectURL(r),t.data.onload=null,e()})}}else{var i=t.xhr.getResponseHeader("content-type");if(i&&0===i.indexOf("image"))return t.data=new Image,t.data.src="data:"+i+";base64,"+function(t){for(var e="",r=0;r<t.length;){for(var i=[0,0,0],s=[0,0,0,0],n=0;n<i.length;++n)r<t.length?i[n]=255&t.charCodeAt(r++):i[n]=0;switch(s[0]=i[0]>>2,s[1]=(3&i[0])<<4|i[1]>>4,s[2]=(15&i[1])<<2|i[2]>>6,s[3]=63&i[2],r-(t.length-1)){case 2:s[3]=64,s[2]=64;break;case 1:s[3]=64}for(var o=0;o<s.length;++o)e+=m.charAt(s[o])}return e}(t.xhr.responseText),t.type=T.TYPE.IMAGE,void(t.data.onload=function(){t.data.onload=null,e()})}e()}else e()}},A=/(#[\w-]+)?$/,b=function(){function t(e,r){var i=this;void 0===e&&(e=""),void 0===r&&(r=10),this.baseUrl=e,this.progress=0,this.loading=!1,this.defaultQueryString="",this._beforeMiddleware=[],this._afterMiddleware=[],this._resourcesParsing=[],this._boundLoadResource=function(t,e){return i._loadResource(t,e)},this._queue=d(this._boundLoadResource,r),this._queue.pause(),this.resources={},this.onProgress=new o.a,this.onError=new o.a,this.onLoad=new o.a,this.onStart=new o.a,this.onComplete=new o.a;for(var s=0;s<t._defaultBeforeMiddleware.length;++s)this.pre(t._defaultBeforeMiddleware[s]);for(var n=0;n<t._defaultAfterMiddleware.length;++n)this.use(t._defaultAfterMiddleware[n])}var e=t.prototype;return e.add=function(t,e,r,i){if(Array.isArray(t)){for(var s=0;s<t.length;++s)this.add(t[s]);return this}if("object"==typeof t&&(i=e||t.callback||t.onComplete,r=t,e=t.url,t=t.name||t.key||t.url),"string"!=typeof e&&(i=r,r=e,e=t),"string"!=typeof e)throw new Error("No url passed to add resource to loader.");if("function"==typeof r&&(i=r,r=null),this.loading&&(!r||!r.parentResource))throw new Error("Cannot add resources while the loader is running.");if(this.resources[t])throw new Error('Resource named "'+t+'" already exists.');if(e=this._prepareUrl(e),this.resources[t]=new T(t,e,r),"function"==typeof i&&this.resources[t].onAfterMiddleware.once(i),this.loading){for(var n=r.parentResource,o=[],a=0;a<n.children.length;++a)n.children[a].isComplete||o.push(n.children[a]);var h=n.progressChunk*(o.length+1)/(o.length+2);n.children.push(this.resources[t]),n.progressChunk=h;for(var u=0;u<o.length;++u)o[u].progressChunk=h;this.resources[t].progressChunk=h}return this._queue.push(this.resources[t]),this},e.pre=function(t){return this._beforeMiddleware.push(t),this},e.use=function(t){return this._afterMiddleware.push(t),this},e.reset=function(){for(var t in this.progress=0,this.loading=!1,this._queue.kill(),this._queue.pause(),this.resources){var e=this.resources[t];e._onLoadBinding&&e._onLoadBinding.detach(),e.isLoading&&e.abort()}return this.resources={},this},e.load=function(t){if("function"==typeof t&&this.onComplete.once(t),this.loading)return this;if(this._queue.idle())this._onStart(),this._onComplete();else{for(var e=100/this._queue._tasks.length,r=0;r<this._queue._tasks.length;++r)this._queue._tasks[r].data.progressChunk=e;this._onStart(),this._queue.resume()}return this},e._prepareUrl=function(t){var e,r=s()(t,{strictMode:!0});if(e=r.protocol||!r.path||0===t.indexOf("//")?t:this.baseUrl.length&&this.baseUrl.lastIndexOf("/")!==this.baseUrl.length-1&&"/"!==t.charAt(0)?this.baseUrl+"/"+t:this.baseUrl+t,this.defaultQueryString){var i=A.exec(e)[0];-1!==(e=e.substr(0,e.length-i.length)).indexOf("?")?e+="&"+this.defaultQueryString:e+="?"+this.defaultQueryString,e+=i}return e},e._loadResource=function(t,e){var r=this;t._dequeue=e,h(this._beforeMiddleware,function(e,i){e.call(r,t,function(){i(t.isComplete?{}:null)})},function(){t.isComplete?r._onLoad(t):(t._onLoadBinding=t.onComplete.once(r._onLoad,r),t.load())},!0)},e._onStart=function(){this.progress=0,this.loading=!0,this.onStart.dispatch(this)},e._onComplete=function(){this.progress=100,this.loading=!1,this.onComplete.dispatch(this,this.resources)},e._onLoad=function(t){var e=this;t._onLoadBinding=null,this._resourcesParsing.push(t),t._dequeue(),h(this._afterMiddleware,function(r,i){r.call(e,t,i)},function(){t.onAfterMiddleware.dispatch(t),e.progress=Math.min(100,e.progress+t.progressChunk),e.onProgress.dispatch(e,t),t.error?e.onError.dispatch(t.error,e,t):e.onLoad.dispatch(e,t),e._resourcesParsing.splice(e._resourcesParsing.indexOf(t),1),e._queue.idle()&&0===e._resourcesParsing.length&&e._onComplete()},!0)},E(t,[{key:"concurrency",get:function(){return this._queue.concurrency},set:function(t){this._queue.concurrency=t}}]),t}();b._defaultBeforeMiddleware=[],b._defaultAfterMiddleware=[],b.pre=function(t){return b._defaultBeforeMiddleware.push(t),b},b.use=function(t){return b._defaultAfterMiddleware.push(t),b}}}]);