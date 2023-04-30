(()=>{var t={480:function(t,r){!function(t){"use strict";var r={Promise:"undefined"!=typeof window?window.Promise:void 0},e="4.25",n="next";function a(t){if(t.toLowerCase()===n)return n;var r=t&&t.match(/^(\d)\.(\d+)/);return r&&{major:parseInt(r[1],10),minor:parseInt(r[2],10)}}function o(t){return void 0===t&&(t=e),"https://js.arcgis.com/".concat(t,"/")}function i(t){return!t||a(t)?function(t){void 0===t&&(t=e);var r=o(t),i=a(t);if(i!==n&&3===i.major){var u=i.minor<=10?"js/":"";return"".concat(r).concat(u,"esri/css/esri.css")}return"".concat(r,"esri/themes/light/main.css")}(t):t}function u(t,r){var e=i(t),n=function(t){return document.querySelector('link[href*="'.concat(t,'"]'))}(e);return n||function(t,r){if(r){var e=document.querySelector(r);e.parentNode.insertBefore(t,e)}else document.head.appendChild(t)}(n=function(t){var r=document.createElement("link");return r.rel="stylesheet",r.href=t,r}(e),r),n}var l={};function s(t,r,e){var n;e&&(n=function(t,r){var e=function(n){r(n.error||new Error("There was an error attempting to load ".concat(t.src))),t.removeEventListener("error",e,!1)};return t.addEventListener("error",e,!1),e}(t,e));var a=function(){r(t),t.removeEventListener("load",a,!1),n&&t.removeEventListener("error",n,!1)};t.addEventListener("load",a,!1)}function f(){return document.querySelector("script[data-esri-loader]")}function c(){var t=window.require;return t&&t.on}function h(t){void 0===t&&(t={});var e={};[l,t].forEach((function(t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}));var n=e.version,a=e.url||o(n);return new r.Promise((function(t,r){var o=f();if(o){var i=o.getAttribute("src");i!==a?r(new Error("The ArcGIS API for JavaScript is already loaded (".concat(i,")."))):c()?t(o):s(o,t,r)}else if(c())r(new Error("The ArcGIS API for JavaScript is already loaded."));else{var l=e.css;l&&u(!0===l?n:l,e.insertCssBefore),s(o=function(t){var r=document.createElement("script");return r.type="text/javascript",r.src=t,r.setAttribute("data-esri-loader","loading"),r}(a),(function(){o.setAttribute("data-esri-loader","loaded"),t(o)}),r),document.body.appendChild(o)}}))}function v(t){return new r.Promise((function(r,e){var n=window.require.on("error",e);window.require(t,(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];n.remove(),r(t)}))}))}t.utils=r,t.loadModules=function(t,r){if(void 0===r&&(r={}),c())return v(t);var e=f(),n=e&&e.getAttribute("src");return!r.url&&n&&(r.url=n),h(r).then((function(){return v(t)}))},t.getScript=f,t.isLoaded=c,t.loadScript=h,t.setDefaultOptions=function(t){void 0===t&&(t={}),l=t},t.loadCss=u,Object.defineProperty(t,"__esModule",{value:!0})}(r)},809:(t,r,e)=>{"use strict";function n(t){var r,e,n=t.length;if(1===n)r=0,e=t[0][1];else{for(var a,o,i,u=0,l=0,s=0,f=0,c=0;c<n;c++)u+=o=(a=t[c])[0],l+=i=a[1],s+=o*o,f+=o*i;e=l/n-(r=(n*f-u*l)/(n*s-u*u))*u/n}return{m:r,b:e}}function a(t){return function(r){return t.b+t.m*r}}function o(t){if(0===t.length)return 0;var r,e=t[0],n=0;if("number"!=typeof e)return NaN;for(var a=1;a<t.length;a++){if("number"!=typeof t[a])return NaN;r=e+t[a],Math.abs(e)>=Math.abs(t[a])?n+=e-r+t[a]:n+=t[a]-r+e,e=r}return e+n}function i(t){if(0===t.length)throw new Error("mean requires at least one data point");return o(t)/t.length}function u(t,r){var e,n,a=i(t),o=0;if(2===r)for(n=0;n<t.length;n++)o+=(e=t[n]-a)*e;else for(n=0;n<t.length;n++)o+=Math.pow(t[n]-a,r);return o}function l(t){if(0===t.length)throw new Error("variance requires at least one data point");return u(t,2)/t.length}function s(t){if(1===t.length)return 0;var r=l(t);return Math.sqrt(r)}function f(t,r){if(t.length<2)return 1;for(var e=0,n=0;n<t.length;n++)e+=t[n][1];for(var a=e/t.length,o=0,i=0;i<t.length;i++)o+=Math.pow(a-t[i][1],2);for(var u=0,l=0;l<t.length;l++)u+=Math.pow(t[l][1]-r(t[l][0]),2);return 1-u/o}function c(t){if(0===t.length)throw new Error("mode requires at least one data point");if(1===t.length)return t[0];for(var r=t[0],e=NaN,n=0,a=1,o=1;o<t.length+1;o++)t[o]!==r?(a>n&&(n=a,e=r),a=1,r=t[o]):a++;return e}function h(t){return t.slice().sort((function(t,r){return t-r}))}function v(t){return c(h(t))}function d(t){for(var r,e=new Map,n=0,a=0;a<t.length;a++){var o=e.get(t[a]);void 0===o?o=1:o++,o>n&&(r=t[a],n=o),e.set(t[a],o)}if(0===n)throw new Error("mode requires at last one data point");return r}function m(t){if(0===t.length)throw new Error("min requires at least one data point");for(var r=t[0],e=1;e<t.length;e++)t[e]<r&&(r=t[e]);return r}function p(t){if(0===t.length)throw new Error("max requires at least one data point");for(var r=t[0],e=1;e<t.length;e++)t[e]>r&&(r=t[e]);return r}function g(t){if(0===t.length)throw new Error("extent requires at least one data point");for(var r=t[0],e=t[0],n=1;n<t.length;n++)t[n]>e&&(e=t[n]),t[n]<r&&(r=t[n]);return[r,e]}function w(t){return t[0]}function y(t){return t[t.length-1]}function M(t){return[t[0],t[t.length-1]]}function b(t){for(var r=0,e=0;e<t.length;e++){if("number"!=typeof t[e])return NaN;r+=t[e]}return r}function E(t){for(var r=1,e=0;e<t.length;e++)r*=t[e];return r}function x(t,r){var e=t.length*r;if(0===t.length)throw new Error("quantile requires at least one data point.");if(r<0||r>1)throw new Error("quantiles must be between 0 and 1");return 1===r?t[t.length-1]:0===r?t[0]:e%1!=0?t[Math.ceil(e)-1]:t.length%2==0?(t[e-1]+t[e])/2:t[e]}function I(t,r,e,n){for(e=e||0,n=n||t.length-1;n>e;){if(n-e>600){var a=n-e+1,o=r-e+1,i=Math.log(a),u=.5*Math.exp(2*i/3),l=.5*Math.sqrt(i*u*(a-u)/a);o-a/2<0&&(l*=-1),I(t,r,Math.max(e,Math.floor(r-o*u/a+l)),Math.min(n,Math.floor(r+(a-o)*u/a+l)))}var s=t[r],f=e,c=n;for(S(t,e,r),t[n]>s&&S(t,e,n);f<c;){for(S(t,f,c),f++,c--;t[f]<s;)f++;for(;t[c]>s;)c--}t[e]===s?S(t,e,c):S(t,++c,n),c<=r&&(e=c+1),r<=c&&(n=c-1)}}function S(t,r,e){var n=t[r];t[r]=t[e],t[e]=n}function q(t,r){var e=t.slice();if(Array.isArray(r)){!function(t,r){for(var e=[0],n=0;n<r.length;n++)e.push(N(t.length,r[n]));e.push(t.length-1),e.sort(P);for(var a=[0,e.length-1];a.length;){var o=Math.ceil(a.pop()),i=Math.floor(a.pop());if(!(o-i<=1)){var u=Math.floor((i+o)/2);A(t,e[u],Math.floor(e[i]),Math.ceil(e[o])),a.push(i,u,u,o)}}}(e,r);for(var n=[],a=0;a<r.length;a++)n[a]=x(e,r[a]);return n}return A(e,N(e.length,r),0,e.length-1),x(e,r)}function A(t,r,e,n){r%1==0?I(t,r,e,n):(I(t,r=Math.floor(r),e,n),I(t,r+1,r+1,n))}function P(t,r){return t-r}function N(t,r){var e=t*r;return 1===r?t-1:0===r?0:e%1!=0?Math.ceil(e)-1:t%2==0?e-.5:e}function C(t,r){if(r<t[0])return 0;if(r>t[t.length-1])return 1;var e=function(t,r){for(var e=0,n=0,a=t.length;n<a;)r<=t[e=n+a>>>1]?a=e:n=-~e;return n}(t,r);if(t[e]!==r)return e/t.length;e++;var n=function(t,r){for(var e=0,n=0,a=t.length;n<a;)r>=t[e=n+a>>>1]?n=-~e:a=e;return n}(t,r);if(n===e)return e/t.length;var a=n-e+1;return a*(n+e)/2/a/t.length}function k(t,r){return C(h(t),r)}function L(t){var r=q(t,.75),e=q(t,.25);if("number"==typeof r&&"number"==typeof e)return r-e}function _(t){return+q(t,.5)}function T(t){for(var r=_(t),e=[],n=0;n<t.length;n++)e.push(Math.abs(t[n]-r));return _(e)}function B(t,r){var e=[];if(r<1)throw new Error("chunk size must be a positive number");if(Math.floor(r)!==r)throw new Error("chunk size must be an integer");for(var n=0;n<t.length;n+=r)e.push(t.slice(n,n+r));return e}function F(t,r,e){if(0===t.length)return[];e=e||Math.random;for(var n=t.length,a=[],o=0;o<r;o++){var i=Math.floor(e()*n);a.push(t[i])}return a}function R(t,r){r=r||Math.random;for(var e,n,a=t.length;a>0;)n=Math.floor(r()*a--),e=t[a],t[a]=t[n],t[n]=e;return t}function j(t,r){return R(t.slice(),r)}function D(t,r,e){return j(t,e).slice(0,r)}function O(t,r){for(var e=[],n=0;n<t;n++){for(var a=[],o=0;o<r;o++)a.push(0);e.push(a)}return e}function V(t){for(var r,e=0,n=0;n<t.length;n++)0!==n&&t[n]===r||(r=t[n],e++);return e}function G(t,r,e,n){var a;if(t>0){var o=(e[r]-e[t-1])/(r-t+1);a=n[r]-n[t-1]-(r-t+1)*o*o}else a=n[r]-e[r]*e[r]/(r+1);return a<0?0:a}function U(t,r,e,n,a,o,i){if(!(t>r)){var u=Math.floor((t+r)/2);n[e][u]=n[e-1][u-1],a[e][u]=u;var l=e;t>e&&(l=Math.max(l,a[e][t-1]||0)),l=Math.max(l,a[e-1][u]||0);var s,f,c,h=u-1;r<n[0].length-1&&(h=Math.min(h,a[e][r+1]||0));for(var v=h;v>=l&&!((s=G(v,u,o,i))+n[e-1][l-1]>=n[e][u]);--v)(f=G(l,u,o,i)+n[e-1][l-1])<n[e][u]&&(n[e][u]=f,a[e][u]=l),l++,(c=s+n[e-1][v-1])<n[e][u]&&(n[e][u]=c,a[e][u]=v);U(t,u-1,e,n,a,o,i),U(u+1,r,e,n,a,o,i)}}function z(t,r){if(r>t.length)throw new Error("cannot generate more classes than there are data values");var e=h(t);if(1===V(e))return[e];var n=O(r,e.length),a=O(r,e.length);!function(t,r,e){for(var n=r[0].length,a=t[Math.floor(n/2)],o=[],i=[],u=0,l=void 0;u<n;++u)l=t[u]-a,0===u?(o.push(l),i.push(l*l)):(o.push(o[u-1]+l),i.push(i[u-1]+l*l)),r[0][u]=G(0,u,o,i),e[0][u]=0;for(var s=1;s<r.length;++s)U(s<r.length-1?s:n-1,n-1,s,r,e,o,i)}(e,n,a);for(var o=[],i=a[0].length-1,u=a.length-1;u>=0;u--){var l=a[u][i];o[u]=e.slice(l,i+1),u>0&&(i=l-1)}return o}function K(t,r){if(r>t.length)return null;var e=function(t,r){var e,n,a=[],o=[],i=0;for(e=0;e<t.length+1;e++){var u=[],l=[];for(n=0;n<r+1;n++)u.push(0),l.push(0);a.push(u),o.push(l)}for(e=1;e<r+1;e++)for(a[1][e]=1,o[1][e]=0,n=2;n<t.length+1;n++)o[n][e]=1/0;for(var s=2;s<t.length+1;s++){for(var f=0,c=0,h=0,v=0,d=1;d<s+1;d++){var m=s-d+1,p=t[m-1];if(i=(c+=p*p)-(f+=p)*f/++h,0!=(v=m-1))for(n=2;n<r+1;n++)o[s][n]>=i+o[v][n-1]&&(a[s][n]=m,o[s][n]=i+o[v][n-1])}a[s][1]=1,o[s][1]=i}return{lowerClassLimits:a,varianceCombinations:o}}(t=t.slice().sort((function(t,r){return t-r})),r);return function(t,r,e){var n=t.length,a=[],o=e;for(a[e]=t[t.length-1];o>0;)a[o-1]=t[r[n][o]-1],n=r[n][o]-1,o--;return a}(t,e.lowerClassLimits,r)}function Q(t,r){if(t.length<2)return t;for(var e=m(t),n=p(t),a=[e],o=(n-e)/r,i=1;i<r;i++)a.push(a[0]+o*i);return a.push(n),a}function W(t,r){if(t.length!==r.length)throw new Error("sampleCovariance requires samples with equal lengths");if(t.length<2)throw new Error("sampleCovariance requires at least two data points in each sample");for(var e=i(t),n=i(r),a=0,o=0;o<t.length;o++)a+=(t[o]-e)*(r[o]-n);return a/(t.length-1)}function X(t){if(t.length<2)throw new Error("sampleVariance requires at least two data points");return u(t,2)/(t.length-1)}function Z(t){var r=X(t);return Math.sqrt(r)}function H(t,r){return W(t,r)/Z(t)/Z(r)}function J(t,r){for(var e=t.map((function(t,r){return[t,r]})).sort((function(t,r){return t[0]-r[0]})).map((function(t){return t[1]})),n=r.map((function(t,r){return[t,r]})).sort((function(t,r){return t[0]-r[0]})).map((function(t){return t[1]})),a=Array(e.length),o=Array(e.length),i=0;i<e.length;i++)a[e[i]]=i,o[n[i]]=i;return H(a,o)}function Y(t){if(t.length<3)throw new Error("sampleSkewness requires at least three data points");for(var r,e=i(t),n=0,a=0,o=0;o<t.length;o++)n+=(r=t[o]-e)*r,a+=r*r*r;var u=t.length-1,l=Math.sqrt(n/u),s=t.length;return s*a/((s-1)*(s-2)*Math.pow(l,3))}function $(t){var r=t.length;if(r<4)throw new Error("sampleKurtosis requires at least four data points");for(var e,n=i(t),a=0,o=0,u=0;u<r;u++)a+=(e=t[u]-n)*e,o+=e*e*e*e;return(r-1)/((r-2)*(r-3))*(r*(r+1)*o/(a*a)-3*(r-1))}function tt(t){for(var r=new Array(t.length),e=[t.slice()],n=0;n<t.length;n++)r[n]=0;for(var a=0;a<t.length;)if(r[a]<a){var o=0;a%2!=0&&(o=r[a]);var i=t[o];t[o]=t[a],t[a]=i,e.push(t.slice()),r[a]++,a=0}else r[a]=0,a++;return e}function rt(t,r){var e,n,a,o,i=[];for(e=0;e<t.length;e++)if(1===r)i.push([t[e]]);else for(a=rt(t.slice(e+1,t.length),r-1),n=0;n<a.length;n++)(o=a[n]).unshift(t[e]),i.push(o);return i}function et(t,r){for(var e=[],n=0;n<t.length;n++)if(1===r)e.push([t[n]]);else for(var a=et(t.slice(n,t.length),r-1),o=0;o<a.length;o++)e.push([t[n]].concat(a[o]));return e}function nt(t,r,e){return t+(e-t)/(r+1)}function at(t,r,e,n){return(t*r+e*n)/(r+n)}function ot(t,r,e,n,a,o){var i=at(r,e,a,o);return(e*(t+Math.pow(r-i,2))+o*(n+Math.pow(a-i,2)))/(e+o)}function it(t){if(0===t.length)throw new Error("geometricMean requires at least one data point");for(var r=1,e=0;e<t.length;e++){if(t[e]<0)throw new Error("geometricMean requires only non-negative numbers as input");r*=t[e]}return Math.pow(r,1/t.length)}function ut(t){if(0===t.length)throw new Error("logAverage requires at least one data point");for(var r=0,e=0;e<t.length;e++){if(t[e]<0)throw new Error("logAverage requires only non-negative numbers as input");r+=Math.log(t[e])}return Math.exp(r/t.length)}function lt(t){if(0===t.length)throw new Error("harmonicMean requires at least one data point");for(var r=0,e=0;e<t.length;e++){if(t[e]<=0)throw new Error("harmonicMean requires only positive numbers as input");r+=1/t[e]}return t.length/r}function st(t){if(0===t.length)throw new Error("meanSimple requires at least one data point");return b(t)/t.length}function ft(t){return x(t,.5)}function ct(t,r,e){return(t*r-e)/(r-1)}function ht(t){if(0===t.length)throw new Error("rootMeanSquare requires at least one data point");for(var r=0,e=0;e<t.length;e++)r+=Math.pow(t[e],2);return Math.sqrt(r/t.length)}function vt(t){return Z(t)/i(t)}function dt(t,r){return(i(t)-r)/(s(t)/Math.sqrt(t.length))}function mt(t,r,e){var n=t.length,a=r.length;if(!n||!a)return null;e||(e=0);var o=i(t),u=i(r),l=X(t),s=X(r);if("number"==typeof o&&"number"==typeof u&&"number"==typeof l&&"number"==typeof s){var f=((n-1)*l+(a-1)*s)/(n+a-2);return(o-u-e)/Math.sqrt(f*(1/n+1/a))}}function pt(t,r){if(!t.length||!r.length)throw new Error("Neither sample can be empty");for(var e=t.map((function(t){return{label:"x",value:t}})).concat(r.map((function(t){return{label:"y",value:t}}))).sort((function(t,r){return t.value-r.value})),n=0;n<e.length;n++)e[n].rank=n;for(var a=[e[0].rank],o=1;o<e.length;o++)e[o].value===e[o-1].value?(a.push(e[o].rank),o===e.length-1&&i(e,a)):a.length>1?i(e,a):a=[e[o].rank];function i(t,r){for(var e=(r[0]+r[r.length-1])/2,n=0;n<r.length;n++)t[r[n]].rank=e}for(var u=0,l=0;l<e.length;l++){var s=e[l];"x"===s.label&&(u+=s.rank+1)}return u}e.r(r),e.d(r,{BayesianClassifier:()=>gt,PerceptronModel:()=>wt,addToMean:()=>nt,approxEqual:()=>or,average:()=>i,averageSimple:()=>st,bayesian:()=>gt,bernoulliDistribution:()=>qt,binomialDistribution:()=>At,bisect:()=>Xt,chiSquaredDistributionTable:()=>Nt,chiSquaredGoodnessOfFit:()=>Ct,chunk:()=>B,ckmeans:()=>z,coefficientOfVariation:()=>vt,combinations:()=>rt,combinationsReplacement:()=>et,combineMeans:()=>at,combineVariances:()=>ot,cumulativeStdLogisticProbability:()=>Vt,cumulativeStdNormalProbability:()=>Ot,epsilon:()=>yt,equalIntervalBreaks:()=>Q,erf:()=>Gt,errorFunction:()=>Gt,extent:()=>g,extentSorted:()=>M,factorial:()=>Mt,gamma:()=>bt,gammaln:()=>St,geometricMean:()=>it,harmonicMean:()=>lt,interquartileRange:()=>L,inverseErrorFunction:()=>Ut,iqr:()=>L,jenks:()=>K,kMeansCluster:()=>Ht,kde:()=>Tt,kernelDensityEstimation:()=>Tt,linearRegression:()=>n,linearRegressionLine:()=>a,logAverage:()=>ut,logit:()=>Kt,mad:()=>T,max:()=>p,maxSorted:()=>y,mean:()=>i,meanSimple:()=>st,median:()=>_,medianAbsoluteDeviation:()=>T,medianSorted:()=>ft,min:()=>m,minSorted:()=>w,mode:()=>v,modeFast:()=>d,modeSorted:()=>c,numericSort:()=>h,perceptron:()=>wt,permutationTest:()=>Qt,permutationsHeap:()=>tt,poissonDistribution:()=>Pt,probit:()=>zt,product:()=>E,quantile:()=>q,quantileRank:()=>k,quantileRankSorted:()=>C,quantileSorted:()=>x,quickselect:()=>I,rSquared:()=>f,relativeError:()=>ar,rms:()=>ht,rootMeanSquare:()=>ht,sample:()=>D,sampleCorrelation:()=>H,sampleCovariance:()=>W,sampleKurtosis:()=>$,sampleRankCorrelation:()=>J,sampleSkewness:()=>Y,sampleStandardDeviation:()=>Z,sampleVariance:()=>X,sampleWithReplacement:()=>F,shuffle:()=>j,shuffleInPlace:()=>R,sign:()=>Wt,silhouette:()=>tr,silhouetteMetric:()=>nr,standardDeviation:()=>s,standardNormalTable:()=>jt,subtractFromMean:()=>ct,sum:()=>o,sumNthPowerDeviations:()=>u,sumSimple:()=>b,tTest:()=>dt,tTestTwoSample:()=>mt,uniqueCountSorted:()=>V,variance:()=>l,wilcoxonRankSum:()=>pt,zScore:()=>Bt});var gt=function(){this.totalCount=0,this.data={}};gt.prototype.train=function(t,r){for(var e in this.data[r]||(this.data[r]={}),t){var n=t[e];void 0===this.data[r][e]&&(this.data[r][e]={}),void 0===this.data[r][e][n]&&(this.data[r][e][n]=0),this.data[r][e][n]++}this.totalCount++},gt.prototype.score=function(t){var r,e={};for(var n in t){var a=t[n];for(r in this.data)e[r]={},this.data[r][n]?e[r][n+"_"+a]=(this.data[r][n][a]||0)/this.totalCount:e[r][n+"_"+a]=0}var o={};for(r in e)for(var i in o[r]=0,e[r])o[r]+=e[r][i];return o};var wt=function(){this.weights=[],this.bias=0};wt.prototype.predict=function(t){if(t.length!==this.weights.length)return null;for(var r=0,e=0;e<this.weights.length;e++)r+=this.weights[e]*t[e];return(r+=this.bias)>0?1:0},wt.prototype.train=function(t,r){if(0!==r&&1!==r)return null;t.length!==this.weights.length&&(this.weights=t,this.bias=1);var e=this.predict(t);if("number"==typeof e&&e!==r){for(var n=r-e,a=0;a<this.weights.length;a++)this.weights[a]+=n*t[a];this.bias+=n}return this};var yt=1e-4;function Mt(t){if(t<0)throw new Error("factorial requires a non-negative value");if(Math.floor(t)!==t)throw new Error("factorial requires an integer input");for(var r=1,e=2;e<=t;e++)r*=e;return r}function bt(t){if(Number.isInteger(t))return t<=0?NaN:Mt(t-1);if(--t<0)return Math.PI/(Math.sin(Math.PI*-t)*bt(-t));var r=t+1/4;return Math.pow(t/Math.E,t)*Math.sqrt(2*Math.PI*(t+1/6))*(1+1/144/Math.pow(r,2)-1/12960/Math.pow(r,3)-257/207360/Math.pow(r,4)-52/2612736/Math.pow(r,5)+5741173/9405849600/Math.pow(r,6)+37529/18811699200/Math.pow(r,7))}var Et=[.9999999999999971,57.15623566586292,-59.59796035547549,14.136097974741746,-.4919138160976202,3399464998481189e-20,4652362892704858e-20,-9837447530487956e-20,.0001580887032249125,-.00021026444172410488,.00021743961811521265,-.0001643181065367639,8441822398385275e-20,-26190838401581408e-21,36899182659531625e-22],xt=607/128,It=Math.log(Math.sqrt(2*Math.PI));function St(t){if(t<=0)return 1/0;t--;for(var r=Et[0],e=1;e<15;e++)r+=Et[e]/(t+e);var n=xt+.5+t;return It+Math.log(r)-n+(t+.5)*Math.log(n)}function qt(t){if(t<0||t>1)throw new Error("bernoulliDistribution requires probability to be between 0 and 1 inclusive");return[1-t,t]}function At(t,r){if(!(r<0||r>1||t<=0||t%1!=0)){var e=0,n=0,a=[],o=1;do{a[e]=o*Math.pow(r,e)*Math.pow(1-r,t-e),n+=a[e],o=o*(t-++e+1)/e}while(n<1-yt);return a}}function Pt(t){if(!(t<=0)){var r=0,e=0,n=[],a=1;do{n[r]=Math.exp(-t)*Math.pow(t,r)/a,e+=n[r],a*=++r}while(e<1-yt);return n}}var Nt={1:{.995:0,.99:0,.975:0,.95:0,.9:.02,.5:.45,.1:2.71,.05:3.84,.025:5.02,.01:6.63,.005:7.88},2:{.995:.01,.99:.02,.975:.05,.95:.1,.9:.21,.5:1.39,.1:4.61,.05:5.99,.025:7.38,.01:9.21,.005:10.6},3:{.995:.07,.99:.11,.975:.22,.95:.35,.9:.58,.5:2.37,.1:6.25,.05:7.81,.025:9.35,.01:11.34,.005:12.84},4:{.995:.21,.99:.3,.975:.48,.95:.71,.9:1.06,.5:3.36,.1:7.78,.05:9.49,.025:11.14,.01:13.28,.005:14.86},5:{.995:.41,.99:.55,.975:.83,.95:1.15,.9:1.61,.5:4.35,.1:9.24,.05:11.07,.025:12.83,.01:15.09,.005:16.75},6:{.995:.68,.99:.87,.975:1.24,.95:1.64,.9:2.2,.5:5.35,.1:10.65,.05:12.59,.025:14.45,.01:16.81,.005:18.55},7:{.995:.99,.99:1.25,.975:1.69,.95:2.17,.9:2.83,.5:6.35,.1:12.02,.05:14.07,.025:16.01,.01:18.48,.005:20.28},8:{.995:1.34,.99:1.65,.975:2.18,.95:2.73,.9:3.49,.5:7.34,.1:13.36,.05:15.51,.025:17.53,.01:20.09,.005:21.96},9:{.995:1.73,.99:2.09,.975:2.7,.95:3.33,.9:4.17,.5:8.34,.1:14.68,.05:16.92,.025:19.02,.01:21.67,.005:23.59},10:{.995:2.16,.99:2.56,.975:3.25,.95:3.94,.9:4.87,.5:9.34,.1:15.99,.05:18.31,.025:20.48,.01:23.21,.005:25.19},11:{.995:2.6,.99:3.05,.975:3.82,.95:4.57,.9:5.58,.5:10.34,.1:17.28,.05:19.68,.025:21.92,.01:24.72,.005:26.76},12:{.995:3.07,.99:3.57,.975:4.4,.95:5.23,.9:6.3,.5:11.34,.1:18.55,.05:21.03,.025:23.34,.01:26.22,.005:28.3},13:{.995:3.57,.99:4.11,.975:5.01,.95:5.89,.9:7.04,.5:12.34,.1:19.81,.05:22.36,.025:24.74,.01:27.69,.005:29.82},14:{.995:4.07,.99:4.66,.975:5.63,.95:6.57,.9:7.79,.5:13.34,.1:21.06,.05:23.68,.025:26.12,.01:29.14,.005:31.32},15:{.995:4.6,.99:5.23,.975:6.27,.95:7.26,.9:8.55,.5:14.34,.1:22.31,.05:25,.025:27.49,.01:30.58,.005:32.8},16:{.995:5.14,.99:5.81,.975:6.91,.95:7.96,.9:9.31,.5:15.34,.1:23.54,.05:26.3,.025:28.85,.01:32,.005:34.27},17:{.995:5.7,.99:6.41,.975:7.56,.95:8.67,.9:10.09,.5:16.34,.1:24.77,.05:27.59,.025:30.19,.01:33.41,.005:35.72},18:{.995:6.26,.99:7.01,.975:8.23,.95:9.39,.9:10.87,.5:17.34,.1:25.99,.05:28.87,.025:31.53,.01:34.81,.005:37.16},19:{.995:6.84,.99:7.63,.975:8.91,.95:10.12,.9:11.65,.5:18.34,.1:27.2,.05:30.14,.025:32.85,.01:36.19,.005:38.58},20:{.995:7.43,.99:8.26,.975:9.59,.95:10.85,.9:12.44,.5:19.34,.1:28.41,.05:31.41,.025:34.17,.01:37.57,.005:40},21:{.995:8.03,.99:8.9,.975:10.28,.95:11.59,.9:13.24,.5:20.34,.1:29.62,.05:32.67,.025:35.48,.01:38.93,.005:41.4},22:{.995:8.64,.99:9.54,.975:10.98,.95:12.34,.9:14.04,.5:21.34,.1:30.81,.05:33.92,.025:36.78,.01:40.29,.005:42.8},23:{.995:9.26,.99:10.2,.975:11.69,.95:13.09,.9:14.85,.5:22.34,.1:32.01,.05:35.17,.025:38.08,.01:41.64,.005:44.18},24:{.995:9.89,.99:10.86,.975:12.4,.95:13.85,.9:15.66,.5:23.34,.1:33.2,.05:36.42,.025:39.36,.01:42.98,.005:45.56},25:{.995:10.52,.99:11.52,.975:13.12,.95:14.61,.9:16.47,.5:24.34,.1:34.28,.05:37.65,.025:40.65,.01:44.31,.005:46.93},26:{.995:11.16,.99:12.2,.975:13.84,.95:15.38,.9:17.29,.5:25.34,.1:35.56,.05:38.89,.025:41.92,.01:45.64,.005:48.29},27:{.995:11.81,.99:12.88,.975:14.57,.95:16.15,.9:18.11,.5:26.34,.1:36.74,.05:40.11,.025:43.19,.01:46.96,.005:49.65},28:{.995:12.46,.99:13.57,.975:15.31,.95:16.93,.9:18.94,.5:27.34,.1:37.92,.05:41.34,.025:44.46,.01:48.28,.005:50.99},29:{.995:13.12,.99:14.26,.975:16.05,.95:17.71,.9:19.77,.5:28.34,.1:39.09,.05:42.56,.025:45.72,.01:49.59,.005:52.34},30:{.995:13.79,.99:14.95,.975:16.79,.95:18.49,.9:20.6,.5:29.34,.1:40.26,.05:43.77,.025:46.98,.01:50.89,.005:53.67},40:{.995:20.71,.99:22.16,.975:24.43,.95:26.51,.9:29.05,.5:39.34,.1:51.81,.05:55.76,.025:59.34,.01:63.69,.005:66.77},50:{.995:27.99,.99:29.71,.975:32.36,.95:34.76,.9:37.69,.5:49.33,.1:63.17,.05:67.5,.025:71.42,.01:76.15,.005:79.49},60:{.995:35.53,.99:37.48,.975:40.48,.95:43.19,.9:46.46,.5:59.33,.1:74.4,.05:79.08,.025:83.3,.01:88.38,.005:91.95},70:{.995:43.28,.99:45.44,.975:48.76,.95:51.74,.9:55.33,.5:69.33,.1:85.53,.05:90.53,.025:95.02,.01:100.42,.005:104.22},80:{.995:51.17,.99:53.54,.975:57.15,.95:60.39,.9:64.28,.5:79.33,.1:96.58,.05:101.88,.025:106.63,.01:112.33,.005:116.32},90:{.995:59.2,.99:61.75,.975:65.65,.95:69.13,.9:73.29,.5:89.33,.1:107.57,.05:113.14,.025:118.14,.01:124.12,.005:128.3},100:{.995:67.33,.99:70.06,.975:74.22,.95:77.93,.9:82.36,.5:99.33,.1:118.5,.05:124.34,.025:129.56,.01:135.81,.005:140.17}};function Ct(t,r,e){for(var n=0,a=r(i(t)),o=[],u=[],l=0;l<t.length;l++)void 0===o[t[l]]&&(o[t[l]]=0),o[t[l]]++;for(var s=0;s<o.length;s++)void 0===o[s]&&(o[s]=0);for(var f in a)f in o&&(u[+f]=a[f]*t.length);for(var c=u.length-1;c>=0;c--)u[c]<3&&(u[c-1]+=u[c],u.pop(),o[c-1]+=o[c],o.pop());for(var h=0;h<o.length;h++)n+=Math.pow(o[h]-u[h],2)/u[h];var v=o.length-1-1;return Nt[v][e]<n}var kt=Math.sqrt(2*Math.PI),Lt={gaussian:function(t){return Math.exp(-.5*t*t)/kt}},_t={nrd:function(t){var r=Z(t),e=L(t);return"number"==typeof e&&(r=Math.min(r,e/1.34)),1.06*r*Math.pow(t.length,-.2)}};function Tt(t,r,e){var n,a;if(void 0===r)n=Lt.gaussian;else if("string"==typeof r){if(!Lt[r])throw new Error('Unknown kernel "'+r+'"');n=Lt[r]}else n=r;if(void 0===e)a=_t.nrd(t);else if("string"==typeof e){if(!_t[e])throw new Error('Unknown bandwidth method "'+e+'"');a=_t[e](t)}else a=e;return function(r){var e=0,o=0;for(e=0;e<t.length;e++)o+=n((r-t[e])/a);return o/a/t.length}}function Bt(t,r,e){return(t-r)/e}var Ft=Math.sqrt(2*Math.PI);function Rt(t){for(var r=t,e=t,n=1;n<15;n++)r+=e*=t*t/(2*n+1);return Math.round(1e4*(.5+r/Ft*Math.exp(-t*t/2)))/1e4}for(var jt=[],Dt=0;Dt<=3.09;Dt+=.01)jt.push(Rt(Dt));function Ot(t){var r=Math.abs(t),e=Math.min(Math.round(100*r),jt.length-1);return t>=0?jt[e]:+(1-jt[e]).toFixed(4)}function Vt(t){return 1/(Math.exp(-t)+1)}function Gt(t){var r=1/(1+.5*Math.abs(t)),e=r*Math.exp(-t*t+((((((((.17087277*r-.82215223)*r+1.48851587)*r-1.13520398)*r+.27886807)*r-.18628806)*r+.09678418)*r+.37409196)*r+1.00002368)*r-1.26551223);return t>=0?1-e:e-1}function Ut(t){var r=8*(Math.PI-3)/(3*Math.PI*(4-Math.PI)),e=Math.sqrt(Math.sqrt(Math.pow(2/(Math.PI*r)+Math.log(1-t*t)/2,2)-Math.log(1-t*t)/r)-(2/(Math.PI*r)+Math.log(1-t*t)/2));return t>=0?e:-e}function zt(t){return 0===t?t=yt:t>=1&&(t=1-yt),Math.sqrt(2)*Ut(2*t-1)}function Kt(t){if(t<=0||t>=1)throw new Error("p must be strictly between zero and one");return Math.log(t/(1-t))}function Qt(t,r,e,n,a){if(void 0===n&&(n=1e4),void 0===e&&(e="two_side"),"two_side"!==e&&"greater"!==e&&"less"!==e)throw new Error("`alternative` must be either 'two_side', 'greater', or 'less'.");for(var o=i(t)-i(r),u=new Array(n),l=t.concat(r),s=Math.floor(l.length/2),f=0;f<n;f++){R(l,a);var c=l.slice(0,s),h=l.slice(s,l.length),v=i(c)-i(h);u[f]=v}var d=0;if("two_side"===e)for(var m=0;m<=n;m++)Math.abs(u[m])>=Math.abs(o)&&(d+=1);else if("greater"===e)for(var p=0;p<=n;p++)u[p]>=o&&(d+=1);else for(var g=0;g<=n;g++)u[g]<=o&&(d+=1);return d/n}function Wt(t){if("number"==typeof t)return t<0?-1:0===t?0:1;throw new TypeError("not a number")}function Xt(t,r,e,n,a){if("function"!=typeof t)throw new TypeError("func must be a function");for(var o=0;o<n;o++){var i=(r+e)/2;if(0===t(i)||Math.abs((e-r)/2)<a)return i;Wt(t(i))===Wt(t(r))?r=i:e=i}throw new Error("maximum number of iterations exceeded")}function Zt(t,r){for(var e=0,n=0;n<t.length;n++){var a=t[n]-r[n];e+=a*a}return Math.sqrt(e)}function Ht(t,r,e){void 0===e&&(e=Math.random);for(var n=null,a=D(t,r,e),o=null,i=Number.MAX_VALUE;0!==i;)n=a,i=$t(a=Yt(t,o=Jt(t,a),r),n);return{labels:o,centroids:a}}function Jt(t,r){return t.map((function(t){for(var e=Number.MAX_VALUE,n=-1,a=0;a<r.length;a++){var o=Zt(t,r[a]);o<e&&(e=o,n=a)}return n}))}function Yt(t,r,e){for(var n=t[0].length,a=O(e,n),o=Array(e).fill(0),i=t.length,u=0;u<i;u++){for(var l=t[u],s=r[u],f=a[s],c=0;c<n;c++)f[c]+=l[c];o[s]+=1}for(var h=0;h<e;h++){if(0===o[h])throw new Error("Centroid "+h+" has no friends");for(var v=a[h],d=0;d<n;d++)v[d]/=o[h]}return a}function $t(t,r){for(var e=0,n=0;n<t.length;n++)e+=Zt(t[n],r[n]);return e}function tr(t,r){if(t.length!==r.length)throw new Error("must have exactly as many labels as points");for(var e=function(t){for(var r=1+p(t),e=Array(r),n=0;n<t.length;n++){var a=t[n];void 0===e[a]&&(e[a]=[]),e[a].push(n)}return e}(r),n=function(t){for(var r=t.length,e=O(r,r),n=0;n<r;n++)for(var a=0;a<n;a++)e[n][a]=Zt(t[n],t[a]),e[a][n]=e[n][a];return e}(t),a=[],o=0;o<t.length;o++){var i=0;if(e[r[o]].length>1){var u=er(o,e[r[o]],n),l=rr(o,r,e,n);i=(l-u)/Math.max(u,l)}a.push(i)}return a}function rr(t,r,e,n){for(var a=r[t],o=Number.MAX_VALUE,i=0;i<e.length;i++)if(i!==a){var u=er(t,e[i],n);u<o&&(o=u)}return o}function er(t,r,e){for(var n=0,a=0;a<r.length;a++)n+=e[t][r[a]];return n/r.length}function nr(t,r){return p(tr(t,r))}function ar(t,r){return 0===t&&0===r?0:Math.abs((t-r)/r)}function or(t,r,e){return void 0===e&&(e=yt),ar(t,r)<=e}}},r={};function e(n){var a=r[n];if(void 0!==a)return a.exports;var o=r[n]={exports:{}};return t[n].call(o.exports,o,o.exports,e),o.exports}e.d=(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},e.o=(t,r)=>Object.prototype.hasOwnProperty.call(t,r),e.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{"use strict";var t=e(809);function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function n(t,e,n){return(e=function(t){var e=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var a=n.call(t,"string");if("object"!==r(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===r(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,r,e,n,a,o,i){for(var u=1,l=0;l<i;l++){var s=Array.isArray(a)?a[l]:a,f=Array.isArray(e)?e[l]:e,c=Array.isArray(r)?r[l]:r,h=Array.isArray(n)?n[l]:n;u*=Math.exp(-s*Math.pow(1+f/c*(t-h),-1/f))}var v=isNaN(u)?1:u,d=1-Math.pow(Math.exp(-Math.exp(-(t-o[0])/o[1])),i)*v;return d<0&&(d=1),d}function o(r,e,n,o,i,u){for(var l=Array.isArray(e)?e.length:1,s=1===l?o:Math.ceil(t.max(o)),f=1;f>r;)f=a(s,e,n,o,i,u,l),s++;return s-1}function i(r,e,n,a,o,i){for(var u=Math.ceil(t.max(a)),l=0;r>l;){var s=Math.pow(1-Math.exp(-o[0]*Math.pow(1+n[0]/e[0]*(u-a[0]),-1/n[0])),-1);isNaN(s)&&(s=1/0);var f=Math.pow(1-Math.exp(-Math.exp(-(u-i[0])/i[1])),-1);(l=Math.pow(1-(1-1/s)*(1-1/f),-1))<0&&(l=0),u++}var c=Math.ceil(t.max(a));for(l=0;r>l;){var h=Math.pow(1-Math.exp(-o[1]*Math.pow(1+n[1]/e[1]*(c-a[1]),-1/n[1])),-1);isNaN(h)&&(h=1/0);var v=Math.pow(1-Math.exp(-Math.exp(-(u-i[0])/i[1])),-1);(l=Math.pow(1-(1-1/h)*(1-1/v),-1))<0&&(l=0),c++}return Math.max(u,c)-1}function u(t,r){if(t.length!==r.length)throw new Error("Vectors must have the same length");for(var e=[],n=0;n<t.length;n++)e.push(t[n]+r[n]);return e}function l(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}e(480).loadModules(["esri/config","esri/WebMap","esri/views/MapView","esri/widgets/Locate","esri/widgets/Search","esri/widgets/ScaleBar","esri/widgets/Compass","esri/widgets/BasemapGallery","esri/layers/FeatureLayer","esri/rest/support/Query","esri/rest/locator","esri/Graphic","esri/geometry/Extent"],{css:!0}).then((function(r){var e,s,f=(s=11,function(t){if(Array.isArray(t))return t}(e=r)||function(t,r){var e=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=e){var n,a,o,i,u=[],l=!0,s=!1;try{if(o=(e=e.call(t)).next,0===r){if(Object(e)!==e)return;l=!1}else for(;!(l=(n=o.call(e)).done)&&(u.push(n.value),u.length!==r);l=!0);}catch(t){s=!0,a=t}finally{try{if(!l&&null!=e.return&&(i=e.return(),Object(i)!==i))return}finally{if(s)throw a}}return u}}(e,s)||function(t,r){if(t){if("string"==typeof t)return l(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?l(t,r):void 0}}(e,s)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=f[0],h=f[1],v=f[2],d=f[3],m=f[4],p=f[5],g=f[6];f[7],f[8],f[9],f[10],c.apiKey="AAPK67c58f2fc7db4d2c94008117be9258dfQgEtYssZ96mCuu03Lw7S0xw0kMlTLFhj7BNBSpuip6n7BvD-Drz-GoDehFlw5pqx";var w,y=new h({portalItem:{id:"64bc30d474a540dba020895891b1d5db"}}),M=new v({container:"viewDiv",map:y,center:[-74.6,37.5],zoom:5,constraints:{minZoom:15,maxZoom:4,geometry:{type:"extent",xmin:-107,ymin:25,xmax:-66,ymax:48},spatialReference:{wkid:4326}}}),b=new p({view:M}),E=new d({view:M,useHeadingEnabled:!1,goToOverride:function(t,r){return r.target.scale=1e4,t.goTo(r.target)}}),x=new g({view:M}),I=new m({view:M,sources:[{url:"http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer",countryCode:"US",category:"Address",name:"Search",singleLineFieldName:"SingleLine",maxResults:1,searchExtent:M.extent,autoSelect:!0,visible:!1,exactMatch:!1}],popupEnabled:!1});M.ui.add(b,"bottom-left"),M.ui.add([E,x],"top-left"),document.querySelectorAll(".tablinks").forEach((function(t){t.addEventListener("click",(function(){t!==w&&(M.graphics.removeAll(),w=t)}))}));var S,q=document.getElementById("form-div");document.getElementById("search-btn").onclick=function(t){t.preventDefault(),I.clear();var r=document.getElementById("input-loc");I.search(r.value)},document.getElementById("search-latLong-btn").onclick=function(t){t.preventDefault(),I.clear();var r=Math.round(100*document.getElementById("lat").value)/100,e=Math.round(100*document.getElementById("long").value)/100,n="".concat(r,",").concat(e);I.search(n)},M.on("click",(function(t){I.clear();var r=t.mapPoint;P.classList.contains("active")&&I.search(r)}));var A,P=document.getElementById("tablinksClick");y.load().then((function(){A=y.allLayers.find((function(t){return"USA Census Counties"===t.title}))})),I.on("select-result",(function(r){M.goTo({scale:1e4}),q.classList.remove("hidden"),S=r.result.feature,document.getElementById("form").addEventListener("submit",(function(r){r.stopImmediatePropagation(),r.preventDefault();var e=document.getElementById("scenario-select").value,l=parseInt(document.getElementById("lifespan-input").value),s=parseInt(document.getElementById("year-input").value),f=parseInt(document.getElementById("category-select").value),c=document.getElementById("method-select").value,h=document.getElementById("units-select").value,v=A.createQuery();v.geometry=S.geometry,v.spatialRelationship="intersects",v.outFields=["FIPS","NAME"],A.queryFeatures(v).then((function(r){if(0===r.features.length)alert("Please select a valid location.");else{var v=r.features[0];S=v.attributes.FIPS;var d=y.allLayers.find((function(t){return t.title===e}));d.load().then((function(){var r=d.createQuery();r.where="county_fips = '".concat(parseInt(S),"'"),d.queryFeatures(r).then((function(r){if(r.features.length>0){var e=r.features[0].attributes,d={};for(var m in e)e.hasOwnProperty(m)&&(d[m]=e[m]);var p=function(r,e,l,s,f,c){var h,v=2e3,d=2100;e<v&&alert("stationary climate assumed for years before 2000");var m,p,g=[r.scale_past,r.shp_past],w=[r.scale_future,r.shp_future],y=r.uS_past,M=r.uS_future,b=r.lambda_past,E=r.lambda_future,x=[10,25,50,100,300,700,1700,3e3,1e4,1e5,1e6];if("LEP"===f||"AEP"===f){var I=Array.from({length:s},(function(t,r){return e+r}));I.some((function(t){return t>d}))&&alert("stationary climate assumed for years after 2100");for(var S=I.map((function(t){return(d-t)/100})),q=I.map((function(t){return(t-v)/100})),A=0;A<s;A++)I[A]<=v&&(S[A]=1,q[A]=0),I[A]>=d&&(S[A]=0,q[A]=1);var P,N=u(S.map((function(t){return t*g[0]})),q.map((function(t){return t*w[0]}))),C=u(S.map((function(t){return t*g[1]})),q.map((function(t){return t*w[1]}))),k=u(S.map((function(t){return t*y})),q.map((function(t){return t*M}))),L=u(S.map((function(t){return t*b})),q.map((function(t){return t*E}))),_=[300,700,1700,3e3][l-1],T=o(1-Math.pow(1-1/_,s),N,C,k,L,[r.NTC_1,r.NTC_2]);if("AEP"===f){for(var B=new Array(s.length),F=0;F<s;F++)B[F]=a(T,N[F],C[F],k[F],L[F],[r.NTC_1,r.NTC_2],1);var R=Array.from({length:s},(function(t,r){return r+1})),j=t.linearRegression([R,B]).m>0?1:0,D=t.max(B);if(1===j&&D>1/_){var O=[];B.forEach((function(t,r){return t===D?O.push(r):null})),m=o(1/_,N=N[P=O.slice(-1)],C=C[P],k=k[P],L=L[P],[r.NTC_1,r.NTC_2])}}"LEP"!==f&&void 0!==m||(m=T),p=new Array(x.length);for(var V=0;V<x.length;V++){var G=void 0;"LEP"==f||void 0===P?G=1-Math.pow(1-1/x[V],s):"AEP"===f&&(G=1/x[V]),p[V]=o(G,N,C,k,L,[r.NTC_1,r.NTC_2])}}else if("MRI"===f){var U=[e,e+s-1];Math.max.apply(Math,U)>d&&alert("stationary climate assumed for years after 2100");for(var z=U.map((function(t){return(d-t)/100})),K=U.map((function(t){return(t-v)/100})),Q=0;Q<2;Q++)U[Q]<=v&&(z[Q]=1,K[Q]=0),U[Q]>=d&&(z[Q]=0,K[Q]=1);var W=u(z.map((function(t){return t*g[0]})),K.map((function(t){return t*w[0]}))),X=u(z.map((function(t){return t*g[1]})),K.map((function(t){return t*w[1]}))),Z=u(z.map((function(t){return t*y})),K.map((function(t){return t*M}))),H=u(z.map((function(t){return t*b})),K.map((function(t){return t*E})));m=i([300,700,1700,3e3][l-1],W,X,Z,H,[r.NTC_1,r.NTC_2]),p=Array.from({length:x.length},(function(){return NaN}));for(var J=0;J<x.length;J++)p[J]=i(x[J],W,X,Z,H,[r.NTC_1,r.NTC_2])}var Y=2.23694;m="SI"===c?m:Y*m,m=Math.round(100*m)/100;var $="Design Wind (".concat(c="SI"===c?"m/s":"mph",")");return n(h={County:r.NAME},$,m),n(h,"Build Year",e),n(h,"Lifespan",s),n(h,"Latitude",r.latP.toFixed(2)),n(h,"Longitude",r.lonP.toFixed(2)),n(h,"Risk Category",1===l?"I":2===l?"II":3===l?"III":"IV"),n(h,"10-year MRI",("m/s"===c?p[0]:Y*p[0]).toFixed(0)),n(h,"25-year MRI",("m/s"===c?p[1]:Y*p[1]).toFixed(0)),n(h,"50-year MRI",("m/s"===c?p[2]:Y*p[2]).toFixed(0)),n(h,"100-year MRI",("m/s"===c?p[3]:Y*p[3]).toFixed(0)),n(h,"300-year MRI",("m/s"===c?p[4]:Y*p[4]).toFixed(0)),n(h,"700-year MRI",("m/s"===c?p[5]:Y*p[5]).toFixed(0)),n(h,"1,700-year MRI",("m/s"===c?p[6]:Y*p[6]).toFixed(0)),n(h,"3,000-year MRI",("m/s"===c?p[7]:Y*p[7]).toFixed(0)),n(h,"10,000-year MRI",("m/s"===c?p[8]:Y*p[8]).toFixed(0)),n(h,"100,000-year MRI",("m/s"===c?p[9]:Y*p[9]).toFixed(0)),n(h,"1,000,000-year MRI",("m/s"===c?p[10]:Y*p[10]).toFixed(0)),h}(d,s,f,l,c,h);(function(t){document.getElementById("location-div").classList.add("hidden"),document.getElementById("form-div").classList.add("hidden"),document.getElementById("back-button").addEventListener("click",(function(){document.getElementById("location-div").classList.remove("hidden"),document.getElementById("table-div").classList.add("hidden")}));var r=document.getElementById("resTable");r.rows[1].cells[0].textContent=Object.keys(t)[1];for(var e=0;e<r.rows.length;e++){var n=r.rows[e],a=n.cells[0].textContent.trim();n.cells[1].textContent=t[a]}document.getElementById("table-div").classList.remove("hidden")})(p),M.graphics.removeAll()}else alert("No data was found for ".concat(v.attributes.NAME,". Note: only states along the Gulf and Atlantic Coasts are currently supported. Please try again with a different location."))}))}))}}),{once:!0})}))}))}))})()})();