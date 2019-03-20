!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.WebIDL2=t():e.WebIDL2=t()}(this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r={float:/-?(?=[0-9]*\.|[0-9]+[eE])(([0-9]+\.[0-9]*|[0-9]*\.[0-9]+)([Ee][-+]?[0-9]+)?|[0-9]+[Ee][-+]?[0-9]+)/y,integer:/-?(0([Xx][0-9A-Fa-f]+|[0-7]*)|[1-9][0-9]*)/y,identifier:/[_-]?[A-Za-z][0-9A-Z_a-z-]*/y,string:/"[^"]*"/y,whitespace:/[\t\n\r ]+/y,comment:/((\/(\/.*|\*([^*]|\*[^\/])*\*\/)[\t\n\r ]*)+)/y,other:/[^\t\n\r 0-9A-Za-z]/y},a=["ByteString","DOMString","USVString"],s=["attribute","callback","const","deleter","dictionary","enum","getter","includes","inherit","interface","iterable","maplike","namespace","partial","required","setlike","setter","static","stringifier","typedef","unrestricted"],i=["-Infinity","FrozenArray","Infinity","NaN","Promise","boolean","byte","double","false","float","implements","legacyiterable","long","mixin","null","octet","optional","or","readonly","record","sequence","short","true","unsigned","void"].concat(s,a),o=["(",")",",","...",":",";","<","=",">","?","[","]","{","}"];class u extends Error{constructor(e,t,n,r){super(e),this.name=this.constructor.name,this.line=t,this.input=n,this.tokens=r}toString(){const e=JSON.stringify(this.tokens,null,4);return`${this.message}\n${e}`}}function c(e){e=e.slice();let t=null;const n="float",r="integer",i="identifier",o="string";function c(n){const r=p("eof")?e.length>1?e[l-1].line:1:e[l].line,a=function(e){const t=e.split("\n");return t[t.length-1]}(f(d(-5),{precedes:!0})),s=d(5),i=f(s),o=a+i.split("\n")[0]+"\n"+(" ".repeat(a.length)+"^ "+n),c=t?`, since \`${t.partial?"partial ":""}${t.type} ${t.name}\``:"";throw new u(`Syntax error at line ${r}${c}:\n${o}`,r,i,s);function d(t){return t>0?e.slice(l,l+t):e.slice(Math.max(l+t,0),l)}function f(t,{precedes:n}={}){const r=t.map(e=>e.trivia+e.value).join(""),a=e[l];return"eof"===a.type?r:n?r+a.trivia:r.slice(a.trivia.length)}}let l=0;function p(t){return e.length>l&&e[l].type===t}function d(...t){for(let n of t){if(!p(n))continue;const t=e[l];return l++,t}}function f(...e){const t=d(...e);return t&&(t.optional=!0),t}function m(e){if(!e)return null;const{value:t,trivia:n}=e;return{value:t,trivia:n}}function y(e){if(!e)return null;const{trivia:t}=e;return{trivia:t}}function g(e){return e.startsWith("_")?e.slice(1):e}function b(e){l=e}function k({parser:e,allowDangler:t,listName:n="list"}){const r=e();if(!r)return[];r.tokens.separator=f(",");const a=[r];for(;r.tokens.separator;){const r=e();if(!r){t||c(`Trailing comma in ${n}`);break}if(r.tokens.separator=f(","),a.push(r),!r.tokens.separator)break}return a}class v{constructor({tokens:t}){Object.defineProperties(this,{source:{value:e},tokens:{value:t}})}get trivia(){const e={};for(const[t,n]of Object.entries(this.tokens))n&&!n.optional&&(e[t]=n.trivia);return e}toJSON(){const e={type:void 0,name:void 0,escapedName:void 0};let t=this;for(;t!==Object.prototype;){const n=Object.getOwnPropertyDescriptors(t);for(const[t,r]of Object.entries(n))(r.enumerable||r.get)&&(e[t]=this[t]);t=Object.getPrototypeOf(t)}return e}}function h(){const e=function(){const e=f("unsigned"),t=d("short","long");if(t){const n=f("long");return new N({tokens:{prefix:e,base:t,postfix:n}})}e&&c("Failed to parse integer type")}()||function(){const e=f("unrestricted"),t=d("float","double");if(t)return new N({tokens:{prefix:e,base:t}});e&&c("Failed to parse float type")}();if(e)return e;const t=d("boolean","byte","octet");return t?new N({tokens:{base:t}}):void 0}function x(){return d("true","false","Infinity","-Infinity","NaN",n,r)}function w(e){switch(e.type){case"true":case"false":return{type:"boolean",value:"true"===e.type};case"Infinity":case"-Infinity":return{type:"Infinity",negative:e.type.startsWith("-")};case n:case r:return{type:"number",value:e.value};case"[":return{type:"sequence",value:[]};case o:return{type:o,value:e.value.slice(1,-1)};default:return{type:e.type}}}function $(e){const t=f("?");t&&(e.tokens.nullable=t),p("?")&&c("Can't nullable more than once")}class N extends v{constructor({tokens:e}){super({tokens:e}),Object.defineProperty(this,"subtype",{value:[]}),this.extAttrs=null}get generic(){return null}get nullable(){return y(this.tokens.nullable)}get union(){return!1}get idlType(){if(this.subtype.length)return this.subtype;return g([this.tokens.prefix,this.tokens.base,this.tokens.postfix].filter(e=>e).map(e=>e.value).join(" "))}get baseName(){const{escapedBaseName:e}=this;return e?g(e):null}get escapedBaseName(){return this.tokens.base?this.tokens.base.value:null}get prefix(){return m(this.tokens.prefix)}get postfix(){return m(this.tokens.postfix)}get separator(){return m(this.tokens.separator)}}class T extends N{static parse(e){const t=d("FrozenArray","Promise","sequence","record");if(!t)return;const n=new T({tokens:{base:t}});switch(n.tokens.open=f("<")||c(`No opening bracket after ${t.type}`),t.type){case"Promise":{p("[")&&c("Promise type cannot have extended attribute");const t=D(e)||c("Missing Promise subtype");n.subtype.push(t);break}case"sequence":case"FrozenArray":{const r=M(e)||c(`Missing ${t.type} subtype`);n.subtype.push(r);break}case"record":{p("[")&&c("Record key cannot have extended attribute");const t=d(...a)||c(`Record key must be one of: ${a.join(", ")}`),r=new N({tokens:{base:t}});r.tokens.separator=f(",")||c("Missing comma after record key type"),r.type=e;const s=M(e)||c("Error parsing generic type record");n.subtype.push(r,s);break}}return n.idlType||c(`Error parsing generic type ${t.type}`),n.tokens.close=f(">")||c(`Missing closing bracket after ${t.type}`),n}get generic(){return{value:this.baseName,trivia:{open:this.tokens.open.trivia,close:this.tokens.close.trivia}}}}class A extends N{static parse(e){const t={};if(t.open=d("("),!t.open)return;const n=new A({tokens:t});for(n.type=e||null;;){const e=M()||c("No type after open parenthesis or 'or' in union type");"any"===e.idlType&&c("Type `any` cannot be included in a union type"),n.subtype.push(e);const t=f("or");if(!t)break;e.tokens.separator=t}return n.idlType.length<2&&c("At least two types are expected in a union type but found less"),t.close=d(")")||c("Unterminated union type"),$(n),n}get union(){return!0}}function j(e){return function(e){let t=T.parse(e)||h();if(!t){const e=d(i,...a);if(!e)return;t=new N({tokens:{base:e}}),p("<")&&c(`Unsupported generic type ${e.value}`)}return t.generic&&"Promise"===t.generic.value&&p("?")&&c("Promise type cannot be nullable"),t.type=e||null,$(t),t.nullable&&"any"===t.idlType&&c("Type `any` cannot be made nullable"),t}(e)||A.parse(e)}function M(e){const t=S.parse(),n=j(e);return n&&(n.extAttrs=t),n}class O extends v{static parse(){const e=l,t={},n=new O({tokens:t});return t.optional=f("optional"),n.idlType=M("argument-type"),n.idlType?(t.optional||(t.variadic=f("...")),t.name=d(i,...s),t.name?(n.default=t.optional?E.parse():null,n):b(e)):b(e)}get optional(){return y(this.tokens.optional)}get variadic(){return y(this.tokens.variadic)}get name(){return g(this.escapedName)}get escapedName(){return this.tokens.name.value}get separator(){return m(this.tokens.separator)}}function q(){return k({parser:O.parse,listName:"arguments list"})}class I extends v{static parser(e){return()=>{const t=d(e);if(t)return new I({tokens:{value:t}})}}get value(){return this.tokens.value.value}get trivia(){return this.tokens.value.trivia}get separator(){return m(this.tokens.separator)}}class P extends v{static parse(){const e={assign:d("=")},t=new P({tokens:e});return e.assign&&(e.secondaryName=f(i,n,r,o)),e.open=d("("),e.open?(t.list="identifier-list"===t.rhsType?function(){const e=k({parser:I.parser(i),listName:"identifier list"});return e.length||c("Expected identifiers but none found"),e}():q(),e.close=d(")")||c("Unexpected token in extended attribute argument list")):t.hasRhs&&!e.secondaryName&&c("No right hand side to extended attribute assignment"),t}get rhsType(){return this.tokens.assign?this.tokens.secondaryName?this.tokens.secondaryName.type:"identifier-list":null}}class U extends v{static parse(){const e=d(i);if(e)return new U({tokens:{name:e},params:P.parse()})}constructor({tokens:e,params:t}){super({tokens:e}),Object.defineProperty(this,"params",{value:t})}get type(){return"extended-attribute"}get name(){return this.tokens.name.value}get rhs(){const{rhsType:e,tokens:t,list:n,trivia:r}=this.params;if(!e)return null;const a="identifier-list"===e?n:t.secondaryName.value;return Array.isArray(a)||(r.value=t.secondaryName.trivia,r.open=r.close=void 0),{type:e,value:a,trivia:r}}get signature(){const{rhsType:e,list:t,trivia:n}=this.params;return t&&"identifier-list"!==e?(n.assign=void 0,{arguments:t,trivia:n}):null}get separator(){return m(this.tokens.separator)}}class S extends v{static parse(){const e={};if(e.open=d("["),!e.open)return null;const t=new S({tokens:e});return t.items=k({parser:U.parse,listName:"extended attribute"}),e.close=d("]")||c("Unexpected form of extended attribute"),t.items.length||c("Found an empty extended attribute"),t}}class E extends v{static parse(){const e=d("=");if(!e)return null;const t=x()||d(o,"null","[")||c("No value for default"),n=[t];if("["===t.type){const e=d("]")||c("Default sequence value must be empty");n.push(e)}return new E({tokens:{assign:e},expression:n})}constructor({tokens:e,expression:t}){super({tokens:e}),Object.defineProperty(this,"expression",{value:t})}get type(){return w(this.expression[0]).type}get value(){return w(this.expression[0]).value}get negative(){return w(this.expression[0]).negative}get trivia(){const[e,t]=this.expression,n="["===e.type?{open:e.trivia,close:t.trivia}:{value:e.trivia};return Object.assign(super.trivia,n)}}class F extends v{static parse(){const e={};if(e.base=d("const"),!e.base)return;let t=h();if(!t){const e=d(i)||c("No type for const");t=new N({tokens:{base:e}})}p("?")&&c("Unexpected nullable constant type"),t.type="const-type",e.name=d(i)||c("No name for const"),e.assign=d("=")||c("No value assignment for const"),e.value=x()||c("No value for const"),e.termination=d(";")||c("Unterminated const");const n=new F({tokens:e});return n.idlType=t,n}get type(){return"const"}get name(){return g(this.tokens.name.value)}get value(){return w(this.tokens.value)}}class _ extends v{static parse(e){const n={base:e},r=new _({tokens:n});return n.name=d(i)||c("No name for callback"),t=r,n.assign=d("=")||c("No assignment in callback"),r.idlType=D()||c("Missing return type"),n.open=d("(")||c("No arguments in callback"),r.arguments=q(),n.close=d(")")||c("Unterminated callback"),n.termination=d(";")||c("Unterminated callback"),r}get type(){return"callback"}get name(){return g(this.tokens.name.value)}}class z extends v{static parse({special:e,noInherit:t=!1,readonly:n=!1}={}){const r=l,a={special:e},s=new z({tokens:a});if(e||t||(a.special=f("inherit")),a.readonly=f("readonly"),n&&!a.readonly&&p("attribute")&&c("Attributes must be readonly in this context"),a.base=d("attribute"),a.base){switch(s.idlType=M("attribute-type")||c("No type in attribute"),s.idlType.generic&&s.idlType.generic.value){case"sequence":case"record":c(`Attributes cannot accept ${s.idlType.generic.value} types`)}return a.name=d(i,"required")||c("No name in attribute"),a.termination=d(";")||c("Unterminated attribute"),s}b(r)}get type(){return"attribute"}get special(){return m(this.tokens.special)}get readonly(){return y(this.tokens.readonly)}get name(){return g(this.escapedName)}get escapedName(){return this.tokens.name.value}}function D(e){const t=j(e||"return-type");if(t)return t;const n=d("void");if(n){const e=new N({tokens:{base:n}});return e.type="return-type",e}}class B extends v{static parse(){const e={},t=new B({tokens:e});return t.idlType=D()||c("Missing return type"),e.name=f(i),e.open=d("(")||c("Invalid operation"),t.arguments=q(),e.close=d(")")||c("Unterminated operation"),t}get name(){const{name:e}=this.tokens;return e?{value:g(e.value),escaped:e.value,trivia:e.trivia}:null}}class R extends v{static parse({special:e,regular:t}={}){const n={special:e},r=new R({tokens:n});return e&&"stringifier"===e.value&&(n.termination=d(";"),n.termination)?(r.body=null,r):(e||t||(n.special=f("getter","setter","deleter")),r.body=B.parse(),n.termination=d(";")||c("Unterminated attribute"),r)}get type(){return"operation"}get special(){return m(this.tokens.special)}}function W(){const e=f("static");if(e)return z.parse({special:e})||R.parse({special:e})||c("No body in static member")}function Z(){const e=f("stringifier");if(e)return z.parse({special:e})||R.parse({special:e})||c("Unterminated stringifier")}class J extends v{static parse(){const e=l,t={},n=new J({tokens:t});if(t.readonly=f("readonly"),t.base=t.readonly?d("maplike","setlike"):d("iterable","maplike","setlike"),!t.base)return void b(e);const{type:r}=n,a="maplike"===r,s=a||"iterable"===r;t.open=d("<")||c(`Error parsing ${r} declaration`);const i=M()||c(`Error parsing ${r} declaration`);return n.idlType=[i],s&&(i.tokens.separator=f(","),i.separator?n.idlType.push(M()):a&&c(`Missing second type argument in ${r} declaration`)),t.close=d(">")||c(`Unterminated ${r} declaration`),t.termination=d(";")||c(`Missing semicolon after ${r} declaration`),n}get type(){return this.tokens.base.value}get readonly(){return y(this.tokens.readonly)}}class L extends v{static parse(){const e=d(":");if(!e)return;const t=d(i)||c("No type in inheritance");return new L({tokens:{colon:e,name:t}})}get name(){return g(this.escapedName)}get escapedName(){return this.tokens.name.value}}class V extends v{static parse(e,{type:n,inheritable:r,allowedMembers:a}){const{tokens:s}=e;for(s.name=d(i)||c("No name for interface"),t=e,r&&(e.inheritance=L.parse()||null),s.open=d("{")||c(`Bodyless ${n}`),e.members=[];;){if(s.close=d("}"),s.close)return s.termination=d(";")||c(`Missing semicolon after ${n}`),e;const t=S.parse();let r;for(const[e,...t]of a)if(r=e(...t))break;r||c("Unknown member"),r.extAttrs=t,e.members.push(r)}}get partial(){return y(this.tokens.partial)}get name(){return g(this.escapedName)}get escapedName(){return this.tokens.name.value}}class C extends V{static parse(e,{callback:t=null,partial:n=null}={}){const r={callback:t,partial:n,base:e};return V.parse(new C({tokens:r}),{type:"interface",inheritable:!n,allowedMembers:[[F.parse],[W],[Z],[J.parse],[z.parse],[R.parse]]})}get type(){return this.tokens.callback?"callback interface":"interface"}}class X extends V{static parse(e,{partial:t}={}){const n={partial:t,base:e};if(n.mixin=d("mixin"),n.mixin)return V.parse(new X({tokens:n}),{type:"interface mixin",allowedMembers:[[F.parse],[Z],[z.parse,{noInherit:!0}],[R.parse,{regular:!0}]]})}get type(){return"interface mixin"}}function G(e){const t=d("interface");if(t)return X.parse(t,e)||C.parse(t,e)||c("Interface has no proper body")}class H extends V{static parse({partial:e}={}){const t={partial:e};if(t.base=d("namespace"),t.base)return V.parse(new H({tokens:t}),{type:"namespace",allowedMembers:[[z.parse,{noInherit:!0,readonly:!0}],[R.parse,{regular:!0}]]})}get type(){return"namespace"}}class K extends V{static parse({partial:e}={}){const t={partial:e};if(t.base=d("dictionary"),t.base)return V.parse(new K({tokens:t}),{type:"dictionary",inheritable:!e,allowedMembers:[[Q.parse]]})}get type(){return"dictionary"}}class Q extends v{static parse(){const e={},t=new Q({tokens:e});return t.extAttrs=S.parse(),e.required=f("required"),t.idlType=M("dictionary-type")||c("No type for dictionary member"),e.name=d(i)||c("No name for dictionary member"),t.default=E.parse(),e.required&&t.default&&c("Required member must not have a default"),e.termination=d(";")||c("Unterminated dictionary member"),t}get type(){return"field"}get name(){return g(this.escapedName)}get escapedName(){return this.tokens.name.value}get required(){return y(this.tokens.required)}}class Y extends v{static parse(){const e={};if(e.base=d("enum"),e.base)return e.name=d(i)||c("No name for enum"),t=new Y({tokens:e}),e.open=d("{")||c("Bodyless enum"),t.values=k({parser:ee.parse,allowDangler:!0,listName:"enumeration"}),p(o)&&c("No comma between enum values"),e.close=d("}")||c("Unexpected value in enum"),t.values.length||c("No value in enum"),e.termination=d(";")||c("No semicolon after enum"),t}get type(){return"enum"}get name(){return g(this.escapedName)}get escapedName(){return this.tokens.name.value}}class ee extends I{static parse(){const e=d(o);if(e)return new ee({tokens:{value:e}})}get type(){return"enum-value"}get value(){return super.value.slice(1,-1)}}class te extends v{static parse(){const e={},n=new te({tokens:e});if(e.base=d("typedef"),e.base)return n.idlType=M("typedef-type")||c("No type in typedef"),e.name=d(i)||c("No name in typedef"),t=n,e.termination=d(";")||c("Unterminated typedef"),n}get type(){return"typedef"}get name(){return g(this.escapedName)}get escapedName(){return this.tokens.name.value}}class ne extends v{static parse(){const e=d(i);if(!e)return;const t={target:e};if(t.includes=d("includes"),t.includes)return t.mixin=d(i)||c("Incomplete includes statement"),t.termination=d(";")||c("No terminating ; for includes statement"),new ne({tokens:t});b(e.index)}get type(){return"includes"}get target(){return g(this.escapedTarget)}get escapedTarget(){return this.tokens.target.value}get includes(){return g(this.escapedIncludes)}get escapedIncludes(){return this.tokens.mixin.value}}function re(){return function(){const e=d("callback");if(!e)return;const t=d("interface");return t?C.parse(t,{callback:e}):_.parse(e)}()||G()||function(){const e=f("partial");if(e)return K.parse({partial:e})||G({partial:e})||H.parse({partial:e})||c("Partial doesn't apply to anything")}()||K.parse()||Y.parse()||te.parse()||ne.parse()||H.parse()}const ae=function(){if(!e.length)return[];const t=[];for(;;){const e=S.parse(),n=re();if(!n){e&&c("Stray extended attributes");break}n.extAttrs=e,t.push(n)}return t.push(d("eof")),t}();return l<e.length&&c("Unrecognised tokens"),ae}function l(e){return e}const p={wrap:e=>e.join(""),trivia:l,name:l,reference:l,type:l,inheritance:l,definition:l,extendedAttribute:l,extendedAttributeReference:l};function d(e,t,n,r){const a=t.index,s="eof"===!e[t.index].type?e[a].line:e.length>1?e[a-1].line:1,i=function(e){const t=e.split("\n");return t[t.length-1]}(c(u(-5),{precedes:!0})),o=i+c(u(5)).split("\n")[0]+"\n"+(" ".repeat(i.length)+"^ "+r);return`Validation error at line ${s}${n?`, inside \`${n.partial?"partial ":""}${n.type} ${n.name}\``:""}:\n${o}`;function u(t){return t>0?e.slice(a,a+t):e.slice(Math.max(a+t,0),a)}function c(t,{precedes:n}={}){const r=t.map(e=>e.trivia+e.value).join(""),s=e[a];return"eof"===s.type?r:n?r+s.trivia:r.slice(s.trivia.length)}}function*f({unique:e,duplicates:t}){for(const n of t){const{name:t}=n,r=`The name "${t}" of type "${e.get(t).type}" was already seen`;yield d(n.source,n.tokens.name,n,r)}}function*m(e){const t=[...e.unique.values()].filter(e=>"interface"===e.type),n=function(){const t=new Map,n=e.all.filter(e=>"includes"===e.type);for(const r of n){const n=t.get(r.target),a=e.unique.get(r.includes);a&&(n?n.push(a):t.set(r.target,[a]))}return t}();for(const e of t)yield*r(e);function*r(t){const r=function(e){const t=e.members.filter(({type:e})=>"operation"===e).map(e=>e.body&&e.body.name?e.body.name.value:"");return new Set(t)}(t),s=e.partials.get(t.name)||[],i=n.get(t.name)||[];for(const e of s)yield*a(e,r,t);for(const e of i)yield*a(e,r,t)}function*a(e,t,n){for(const r of e.members.filter(e=>"operation"===e.type)){const a=r.body&&r.body.name?r.body.name.value:"";if(a&&t.has(a)){const t=`The operation "${a}" has already been defined in the base interface "${n.name}"`;yield d(e.source,r.body.tokens.name,e,t)}}}}t.default={parse:function(e){return c(function(e){const t=[];let n=0,a="",s=1,u=0;for(;n<e.length;){const r=e.charAt(n);let l=-1;if(/[\t\n\r ]/.test(r)?l=c("whitespace",{noFlushTrivia:!0}):"/"===r&&(l=c("comment",{noFlushTrivia:!0})),-1!==l){const e=t.pop().value;s+=(e.match(/\n/g)||[]).length,a+=e,u-=1}else if(/[-0-9.A-Z_a-z]/.test(r)){if(-1===(l=c("float"))&&(l=c("integer")),-1===l){l=c("identifier");const e=t[t.length-1];-1!==l&&i.includes(e.value)&&(e.type=e.value)}}else'"'===r&&(l=c("string"));for(const r of o)if(e.startsWith(r,n)){t.push({type:r,value:r,trivia:a,line:s,index:u}),a="",l=n+=r.length;break}if(-1===l&&(l=c("other")),-1===l)throw new Error("Token stream not progressing");n=l,u+=1}return t.push({type:"eof",value:"",trivia:a}),t;function c(i,{noFlushTrivia:o}={}){const c=r[i];c.lastIndex=n;const l=c.exec(e);return l?(t.push({type:i,value:l[0],trivia:a,line:s,index:u}),o||(a=""),c.lastIndex):-1}}(e))},write:function(e,{templates:t=p}={}){function n(e,...n){return t.wrap([].concat(...e.map((e,t)=>[e,n[t]||""])))}function r(e,n){return t.reference(e,n||e)}function a(e){const n={};for(const r in e.trivia)n[r]=t.trivia(e.trivia[r]);return n}function s(e,r){return e?n`${t.trivia(e.trivia)}${r||e.value}`:""}function i(e,a){return e?n`${t.trivia(e.trivia)}${r(e.value,a)}`:""}function o(e,r){return e?n`${t.trivia(e.trivia)}${t.name(e.value,r)}`:""}function u(e){return n`${m(e.extAttrs)}${function(e){const i=a(e);if(e.union){const r=t.wrap(e.idlType.map(u));return n`${i.open}(${r}${i.close})`}if(e.generic){const s=n`${i.base}${r(e.generic.value)}`,o=t.wrap(e.idlType.map(u)),c=a(e.generic);return n`${s}${c.open}<${o}${c.close}>`}return e.prefix||e.postfix?n`${e.prefix?t.trivia(e.prefix.trivia):i.base}${r(n`${e.prefix?n`${e.prefix.value}${i.base}`:""}${e.baseName}${s(e.postfix)}`,e.idlType)}`:n`${i.base}${r(e.escapedBaseName,e.baseName)}`}(e)}${s(e.nullable,"?")}${s(e.separator)}`}function c(e){return e?t.wrap([s(e.tokens.assign),...e.expression.map(e=>s(e))]):""}function l(e){return t.wrap([m(e.extAttrs),s(e.tokens.optional),t.type(u(e.idlType)),s(e.tokens.variadic),o(e.tokens.name,{data:e}),c(e.default),s(e.tokens.separator)])}function d(e){return n`${t.trivia(e.trivia)}${r(e.value)}${s(e.separator)}`}function f(e){const{rhsType:n}=e.params;return t.wrap([t.trivia(e.tokens.name.trivia),t.extendedAttribute(t.wrap([t.extendedAttributeReference(e.name),s(e.params.tokens.assign),i(e.params.tokens.secondaryName),s(e.params.tokens.open),...e.params.list?e.params.list.map("identifier-list"===n?d:l):[],s(e.params.tokens.close)])),s(e.tokens.separator)])}function m(e){return e?t.wrap([s(e.tokens.open),...e.items.map(f),s(e.tokens.close)]):""}function y(e){return t.definition(t.wrap([m(e.extAttrs),s(e.tokens.partial),s(e.tokens.base),s(e.tokens.mixin),o(e.tokens.name,{data:e}),(n=e.inheritance,n?t.wrap([s(n.tokens.colon),t.trivia(n.tokens.name.trivia),t.inheritance(r(n.escapedName,n.name))]):""),s(e.tokens.open),k(e.members,e),s(e.tokens.close),s(e.tokens.termination)]),{data:e});var n}function g(e,n){return t.definition(t.wrap([m(e.extAttrs),s(e.tokens.readonly),s(e.tokens.base),s(e.tokens.open),t.wrap(e.idlType.map(u)),s(e.tokens.close),s(e.tokens.termination)]),{data:e,parent:n})}t=Object.assign({},p,t);const b={interface:y,"interface mixin":y,namespace:y,operation:function(e,n){const r=e.body?[t.type(u(e.body.idlType)),o(e.body.tokens.name,{data:e,parent:n}),s(e.body.tokens.open),t.wrap(e.body.arguments.map(l)),s(e.body.tokens.close)]:[];return t.definition(t.wrap([m(e.extAttrs),s(e.tokens.special),...r,s(e.tokens.termination)]),{data:e,parent:n})},attribute:function(e,n){return t.definition(t.wrap([m(e.extAttrs),s(e.tokens.special),s(e.tokens.readonly),s(e.tokens.base),t.type(u(e.idlType)),o(e.tokens.name,{data:e,parent:n}),s(e.tokens.termination)]),{data:e,parent:n})},dictionary:y,field:function(e,n){return t.definition(t.wrap([m(e.extAttrs),s(e.tokens.required),t.type(u(e.idlType)),o(e.tokens.name,{data:e,parent:n}),c(e.default),s(e.tokens.termination)]),{data:e,parent:n})},const:function(e,n){return t.definition(t.wrap([m(e.extAttrs),s(e.tokens.base),t.type(u(e.idlType)),o(e.tokens.name,{data:e,parent:n}),s(e.tokens.assign),s(e.tokens.value),s(e.tokens.termination)]),{data:e,parent:n})},typedef:function(e){return t.definition(t.wrap([m(e.extAttrs),s(e.tokens.base),t.type(u(e.idlType)),o(e.tokens.name,{data:e}),s(e.tokens.termination)]),{data:e})},includes:function(e){return t.definition(t.wrap([m(e.extAttrs),i(e.tokens.target,e.target),s(e.tokens.includes),i(e.tokens.mixin,e.includes),s(e.tokens.termination)]),{data:e})},callback:function(e){return t.definition(t.wrap([m(e.extAttrs),s(e.tokens.base),o(e.tokens.name,{data:e}),s(e.tokens.assign),t.type(u(e.idlType)),s(e.tokens.open),...e.arguments.map(l),s(e.tokens.close),s(e.tokens.termination)]),{data:e})},enum:function(e){return t.definition(t.wrap([m(e.extAttrs),s(e.tokens.base),o(e.tokens.name,{data:e}),s(e.tokens.open),k(e.values,e),s(e.tokens.close),s(e.tokens.termination)]),{data:e})},"enum-value":function(e,r){return n`${t.trivia(e.trivia)}${t.definition(n`"${t.name(e.value,{data:e,parent:r})}"`,{data:e,parent:r})}${s(e.separator)}`},iterable:g,legacyiterable:g,maplike:g,setlike:g,"callback interface":function(e){return t.definition(n`${t.trivia(e.trivia.callback)}callback${y(e)}`,{data:e})},eof:function(e){return t.trivia(e.trivia)}};function k(e,n){if(!e)return;const r=e.map(e=>(function(e,t){if(!b[e.type])throw new Error(`Type "${e.type}" is unsupported`);return b[e.type](e,t)})(e,n));return t.wrap(r)}return k(e)},validate:function(e){const t=function(e){const t=new Map,n=new Set,r=new Map;for(const a of e)if(a.partial){const e=r.get(a.name);e?e.push(a):r.set(a.name,[a])}else a.name&&(t.has(a.name)?n.add(a):t.set(a.name,a));return{all:e,unique:t,partials:r,duplicates:n}}(e);return[...f(t),...m(t)]}}}]).default});
//# sourceMappingURL=webidl2.js.map