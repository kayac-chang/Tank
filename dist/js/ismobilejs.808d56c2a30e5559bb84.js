(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{gRQh:function(e,i,o){var n,d,t;!function(o){var r=/iPhone/i,p=/iPod/i,a=/iPad/i,b=/\bAndroid(?:.+)Mobile\b/i,l=/Android/i,s=/\bAndroid(?:.+)SD4930UR\b/i,w=/\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,c=/Windows Phone/i,h=/\bWindows(?:.+)ARM\b/i,v=/BlackBerry/i,f=/BB10/i,u=/Opera Mini/i,y=/\b(CriOS|Chrome)(?:.+)Mobile/i,x=/Mobile(?:.+)Firefox\b/i;function A(e,i){return e.test(i)}function M(e){var i=e||("undefined"!=typeof navigator?navigator.userAgent:""),o=i.split("[FBAN");void 0!==o[1]&&(i=o[0]),void 0!==(o=i.split("Twitter"))[1]&&(i=o[0]);var n={apple:{phone:A(r,i)&&!A(c,i),ipod:A(p,i),tablet:!A(r,i)&&A(a,i)&&!A(c,i),device:(A(r,i)||A(p,i)||A(a,i))&&!A(c,i)},amazon:{phone:A(s,i),tablet:!A(s,i)&&A(w,i),device:A(s,i)||A(w,i)},android:{phone:!A(c,i)&&A(s,i)||!A(c,i)&&A(b,i),tablet:!A(c,i)&&!A(s,i)&&!A(b,i)&&(A(w,i)||A(l,i)),device:!A(c,i)&&(A(s,i)||A(w,i)||A(b,i)||A(l,i))||A(/\bokhttp\b/i,i)},windows:{phone:A(c,i),tablet:A(h,i),device:A(c,i)||A(h,i)},other:{blackberry:A(v,i),blackberry10:A(f,i),opera:A(u,i),firefox:A(x,i),chrome:A(y,i),device:A(v,i)||A(f,i)||A(u,i)||A(x,i)||A(y,i)}};return n.any=n.apple.device||n.android.device||n.windows.device||n.other.device,n.phone=n.apple.phone||n.android.phone||n.windows.phone,n.tablet=n.apple.tablet||n.android.tablet||n.windows.tablet,n}e.exports&&"undefined"==typeof window?e.exports=M:e.exports&&"undefined"!=typeof window?(e.exports=M(),e.exports.isMobile=M):(d=[],n=o.isMobile=M(),void 0===(t="function"==typeof n?n.apply(i,d):n)||(e.exports=t))}(this)}}]);