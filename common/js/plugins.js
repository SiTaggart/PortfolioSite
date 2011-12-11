
(function($){
  
})(this.jQuery);

/*# FIREBUG #*/
if (typeof console == "undefined" || typeof console.log == "undefined"){
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml","group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};
    for (var i = 0; i < names.length; ++i)
        window.console[names[i]] = function() {}
}

/*
http://www.JSON.org/json2.js
2011-01-18
Public Domain.
NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
See http://www.JSON.org/js.html
*/
var JSON;JSON||(JSON={});
(function(){function l(b){return b<10?"0"+b:b}function o(b){p.lastIndex=0;return p.test(b)?'"'+b.replace(p,function(f){var c=r[f];return typeof c==="string"?c:"\\u"+("0000"+f.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+b+'"'}function m(b,f){var c,d,g,j,i=h,e,a=f[b];if(a&&typeof a==="object"&&typeof a.toJSON==="function")a=a.toJSON(b);if(typeof k==="function")a=k.call(f,b,a);switch(typeof a){case "string":return o(a);case "number":return isFinite(a)?String(a):"null";case "boolean":case "null":return String(a);case "object":if(!a)return"null";
h+=n;e=[];if(Object.prototype.toString.apply(a)==="[object Array]"){j=a.length;for(c=0;c<j;c+=1)e[c]=m(c,a)||"null";g=e.length===0?"[]":h?"[\n"+h+e.join(",\n"+h)+"\n"+i+"]":"["+e.join(",")+"]";h=i;return g}if(k&&typeof k==="object"){j=k.length;for(c=0;c<j;c+=1){d=k[c];if(typeof d==="string")if(g=m(d,a))e.push(o(d)+(h?": ":":")+g)}}else for(d in a)if(Object.hasOwnProperty.call(a,d))if(g=m(d,a))e.push(o(d)+(h?": ":":")+g);g=e.length===0?"{}":h?"{\n"+h+e.join(",\n"+h)+"\n"+i+"}":"{"+e.join(",")+"}";
h=i;return g}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+l(this.getUTCMonth()+1)+"-"+l(this.getUTCDate())+"T"+l(this.getUTCHours())+":"+l(this.getUTCMinutes())+":"+l(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var q=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
p=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,h,n,r={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},k;if(typeof JSON.stringify!=="function")JSON.stringify=function(b,f,c){var d;n=h="";if(typeof c==="number")for(d=0;d<c;d+=1)n+=" ";else if(typeof c==="string")n=c;if((k=f)&&typeof f!=="function"&&(typeof f!=="object"||typeof f.length!=="number"))throw Error("JSON.stringify");return m("",
{"":b})};if(typeof JSON.parse!=="function")JSON.parse=function(b,f){function c(g,j){var i,e,a=g[j];if(a&&typeof a==="object")for(i in a)if(Object.hasOwnProperty.call(a,i)){e=c(a,i);if(e!==undefined)a[i]=e;else delete a[i]}return f.call(g,j,a)}var d;b=String(b);q.lastIndex=0;if(q.test(b))b=b.replace(q,function(g){return"\\u"+("0000"+g.charCodeAt(0).toString(16)).slice(-4)});if(/^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){d=eval("("+b+")");return typeof f==="function"?c({"":d},""):d}throw new SyntaxError("JSON.parse");}})();

window.log = function(){
  log.history = log.history || [];   
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};
(function(doc){
  var write = doc.write;
  doc.write = function(q){ 
    log('document.write(): ',arguments); 
    if (/docwriteregexwhitelist/.test(q)) write.apply(doc,arguments);  
  };
})(document);


