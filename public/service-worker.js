"use strict";var precacheConfig=[["/index.html","9cfad7d7fd04bd40ee4ade9d9672bb6c"],["/static/css/main.da6188a6.css","5128f23775537cd769e211f05f6e9c18"],["/static/js/main.a2d275d8.js","52bdcd2182b66dc8959984dd1a8226b7"],["/static/media/RichardsonResume.06ad0d21.pdf","06ad0d21a9190401ed9f08bc0a7f9e9c"],["/static/media/about.df970a3e.svg","df970a3ea723955b8a7876f65139cf00"],["/static/media/beer-recommender.1ec22a25.png","1ec22a254fb41ace8b2aa0c6991efc49"],["/static/media/blog-admin.8130416a.png","8130416aa12258de581f0727a98e7c43"],["/static/media/blog.869982f4.svg","869982f447e2f2592112fd3c097b3e67"],["/static/media/bracket.cb250b50.svg","cb250b501ccf5ae8e1da053a957d77ba"],["/static/media/bullet.41c052bf.svg","41c052bff8f93a5de6e5e58a8e95bb01"],["/static/media/contact.a57aa8bb.svg","a57aa8bbf40a8d1220cd6af2b5dc3203"],["/static/media/futpuppeteer.2e83d4a1.png","2e83d4a1ce116931cc65aa5605209c78"],["/static/media/loading.a1240050.svg","a1240050ab69645612875e74d74532ae"],["/static/media/portfolio.86681435.png","86681435512b24215c1528ecbc0f7229"],["/static/media/projects.a7f41029.svg","a7f41029d991dca0227b6756371f3b98"],["/static/media/related.6eef0c19.svg","6eef0c1970f381e33dea07bb10ae4fc1"],["/static/media/res-filterer.a943fad2.png","a943fad2ae96f535f00f385576cf4e88"],["/static/media/skills.ef35ccbf.svg","ef35ccbfbd4d9511a44c9b8c5ec616eb"],["/static/media/treat-dispenser.b2b411bb.png","b2b411bbb72a45b1641412fadbfce57f"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});