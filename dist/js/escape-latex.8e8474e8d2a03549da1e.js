(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{R4gy:function(n,e,t){"use strict";var i=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i])}return n},r={"{":"\\{","}":"\\}","\\":"\\textbackslash{}","#":"\\#",$:"\\$","%":"\\%","&":"\\&","^":"\\textasciicircum{}",_:"\\_","~":"\\textasciitilde{}"},c={"–":"\\--","—":"\\---"," ":"~","\t":"\\qquad{}","\r\n":"\\newline{}","\n":"\\newline{}"},o=function(n,e){return i({},n,e)};n.exports=function(n){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.preserveFormatting,a=void 0!==t&&t,s=e.escapeMapFn,l=void 0===s?o:s,u=String(n),g="",h=l(i({},r),a?i({},c):{}),p=Object.keys(h),f=function(){var n=!1;p.forEach(function(e,t){n||u.length>=e.length&&u.slice(0,e.length)===e&&(g+=h[p[t]],u=u.slice(e.length,u.length),n=!0)}),n||(g+=u.slice(0,1),u=u.slice(1,u.length))};u;)f();return g}}}]);