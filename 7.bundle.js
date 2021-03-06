(self.webpackJsonp=self.webpackJsonp||[]).push([[7],{155:function(e,n,t){"use strict";t.r(n);var r=monaco.Promise,i=function(){function e(e){var n=this;this._defaults=e,this._worker=null,this._idleCheckInterval=setInterval(function(){return n._checkIfIdle()},3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange(function(){return n._stopWorker()})}return e.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},e.prototype.dispose=function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()},e.prototype._checkIfIdle=function(){this._worker&&(Date.now()-this._lastUsedTime>12e4&&this._stopWorker())},e.prototype._getClient=function(){return this._lastUsedTime=Date.now(),this._client||(this._worker=monaco.editor.createWebWorker({moduleId:"vs/language/json/jsonWorker",label:this._defaults.languageId,createData:{languageSettings:this._defaults.diagnosticsOptions,languageId:this._defaults.languageId}}),this._client=this._worker.getProxy()),this._client},e.prototype.getLanguageServiceWorker=function(){for(var e,n=this,t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];return function(e){var n,t,i=new r(function(e,r){n=e,t=r},function(){});return e.then(n,t),i}(this._getClient().then(function(n){e=n}).then(function(e){return n._worker.withSyncedResources(t)}).then(function(n){return e}))},e}();var o=t(8),a=(monaco.Uri,monaco.Range),u=function(){function e(e,n,t){var r=this;this._languageId=e,this._worker=n,this._disposables=[],this._listener=Object.create(null);var i=function(e){var n,t=e.getModeId();t===r._languageId&&(r._listener[e.uri.toString()]=e.onDidChangeContent(function(){clearTimeout(n),n=setTimeout(function(){return r._doValidate(e.uri,t)},500)}),r._doValidate(e.uri,t))},o=function(e){monaco.editor.setModelMarkers(e,r._languageId,[]);var n=e.uri.toString(),t=r._listener[n];t&&(t.dispose(),delete r._listener[n])};this._disposables.push(monaco.editor.onDidCreateModel(i)),this._disposables.push(monaco.editor.onWillDisposeModel(function(e){o(e),r._resetSchema(e.uri)})),this._disposables.push(monaco.editor.onDidChangeModelLanguage(function(e){o(e.model),i(e.model),r._resetSchema(e.model.uri)})),this._disposables.push(t.onDidChange(function(e){monaco.editor.getModels().forEach(function(e){e.getModeId()===r._languageId&&(o(e),i(e))})})),this._disposables.push({dispose:function(){for(var e in monaco.editor.getModels().forEach(o),r._listener)r._listener[e].dispose()}}),monaco.editor.getModels().forEach(i)}return e.prototype.dispose=function(){this._disposables.forEach(function(e){return e&&e.dispose()}),this._disposables=[]},e.prototype._resetSchema=function(e){this._worker().then(function(n){n.resetSchema(e.toString())})},e.prototype._doValidate=function(e,n){this._worker(e).then(function(t){return t.doValidation(e.toString()).then(function(t){var r=t.map(function(e){return function(e,n){var t="number"==typeof n.code?String(n.code):n.code;return{severity:function(e){switch(e){case o.d.Error:return monaco.MarkerSeverity.Error;case o.d.Warning:return monaco.MarkerSeverity.Warning;case o.d.Information:return monaco.MarkerSeverity.Info;case o.d.Hint:return monaco.MarkerSeverity.Hint;default:return monaco.MarkerSeverity.Info}}(n.severity),startLineNumber:n.range.start.line+1,startColumn:n.range.start.character+1,endLineNumber:n.range.end.line+1,endColumn:n.range.end.character+1,message:n.message,code:t,source:n.source}}(0,e)}),i=monaco.editor.getModel(e);i.getModeId()===n&&monaco.editor.setModelMarkers(i,n,r)})}).then(void 0,function(e){console.error(e)})},e}();function c(e){if(e)return{character:e.column-1,line:e.lineNumber-1}}function s(e){if(e)return{start:{line:e.startLineNumber-1,character:e.startColumn-1},end:{line:e.endLineNumber-1,character:e.endColumn-1}}}function f(e){if(e)return new a(e.start.line+1,e.start.character+1,e.end.line+1,e.end.character+1)}function d(e){var n=monaco.languages.CompletionItemKind;switch(e){case o.b.Text:return n.Text;case o.b.Method:return n.Method;case o.b.Function:return n.Function;case o.b.Constructor:return n.Constructor;case o.b.Field:return n.Field;case o.b.Variable:return n.Variable;case o.b.Class:return n.Class;case o.b.Interface:return n.Interface;case o.b.Module:return n.Module;case o.b.Property:return n.Property;case o.b.Unit:return n.Unit;case o.b.Value:return n.Value;case o.b.Enum:return n.Enum;case o.b.Keyword:return n.Keyword;case o.b.Snippet:return n.Snippet;case o.b.Color:return n.Color;case o.b.File:return n.File;case o.b.Reference:return n.Reference}return n.Property}function l(e){if(e)return{range:f(e.range),text:e.newText}}var g=function(){function e(e){this._worker=e}return Object.defineProperty(e.prototype,"triggerCharacters",{get:function(){return[" ",":"]},enumerable:!0,configurable:!0}),e.prototype.provideCompletionItems=function(e,n,t){e.getWordUntilPosition(n);var r=e.uri;return _(t,this._worker(r).then(function(e){return e.doComplete(r.toString(),c(n))}).then(function(e){if(e){var n=e.items.map(function(e){var n={label:e.label,insertText:e.insertText,sortText:e.sortText,filterText:e.filterText,documentation:e.documentation,detail:e.detail,kind:d(e.kind)};return e.textEdit&&(n.range=f(e.textEdit.range),n.insertText=e.textEdit.newText),e.insertTextFormat===o.f.Snippet&&(n.insertText={value:n.insertText}),n});return{isIncomplete:e.isIncomplete,items:n}}}))},e}();function h(e){return"string"==typeof e?{value:e}:function(e){return e&&"object"==typeof e&&"string"==typeof e.kind}(e)?"plaintext"===e.kind?{value:e.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:e.value}:{value:"```"+e.language+"\n"+e.value+"\n```\n"}}var p=function(){function e(e){this._worker=e}return e.prototype.provideHover=function(e,n,t){var r=e.uri;return _(t,this._worker(r).then(function(e){return e.doHover(r.toString(),c(n))}).then(function(e){if(e)return{range:f(e.range),contents:function(e){if(e)return Array.isArray(e)?e.map(h):[h(e)]}(e.contents)}}))},e}();var m=function(){function e(e){this._worker=e}return e.prototype.provideDocumentSymbols=function(e,n){var t=e.uri;return _(n,this._worker(t).then(function(e){return e.findDocumentSymbols(t.toString())}).then(function(e){if(e)return e.map(function(e){return{name:e.name,detail:"",containerName:e.containerName,kind:function(e){var n=monaco.languages.SymbolKind;switch(e){case o.k.File:return n.Array;case o.k.Module:return n.Module;case o.k.Namespace:return n.Namespace;case o.k.Package:return n.Package;case o.k.Class:return n.Class;case o.k.Method:return n.Method;case o.k.Property:return n.Property;case o.k.Field:return n.Field;case o.k.Constructor:return n.Constructor;case o.k.Enum:return n.Enum;case o.k.Interface:return n.Interface;case o.k.Function:return n.Function;case o.k.Variable:return n.Variable;case o.k.Constant:return n.Constant;case o.k.String:return n.String;case o.k.Number:return n.Number;case o.k.Boolean:return n.Boolean;case o.k.Array:return n.Array}return n.Function}(e.kind),range:f(e.location.range),selectionRange:f(e.location.range)}})}))},e}();function v(e){return{tabSize:e.tabSize,insertSpaces:e.insertSpaces}}var b=function(){function e(e){this._worker=e}return e.prototype.provideDocumentFormattingEdits=function(e,n,t){var r=e.uri;return _(t,this._worker(r).then(function(e){return e.format(r.toString(),null,v(n)).then(function(e){if(e&&0!==e.length)return e.map(l)})}))},e}(),k=function(){function e(e){this._worker=e}return e.prototype.provideDocumentRangeFormattingEdits=function(e,n,t,r){var i=e.uri;return _(r,this._worker(i).then(function(e){return e.format(i.toString(),s(n),v(t)).then(function(e){if(e&&0!==e.length)return e.map(l)})}))},e}(),y=function(){function e(e){this._worker=e}return e.prototype.provideDocumentColors=function(e,n){var t=e.uri;return _(n,this._worker(t).then(function(e){return e.findDocumentColors(t.toString())}).then(function(e){if(e)return e.map(function(e){return{color:e.color,range:f(e.range)}})}))},e.prototype.provideColorPresentations=function(e,n,t){var r=e.uri;return _(t,this._worker(r).then(function(e){return e.getColorPresentations(r.toString(),n.color,s(n.range))}).then(function(e){if(e)return e.map(function(e){var n={label:e.label};return e.textEdit&&(n.textEdit=l(e.textEdit)),e.additionalTextEdits&&(n.additionalTextEdits=e.additionalTextEdits.map(l)),n})}))},e}(),C=function(){function e(e){this._worker=e}return e.prototype.provideFoldingRanges=function(e,n,t){var r=e.uri;return _(t,this._worker(r).then(function(e){return e.provideFoldingRanges(r.toString(),n)}).then(function(e){if(e)return e.map(function(e){var n={start:e.startLine+1,end:e.endLine+1};return void 0!==e.kind&&(n.kind=function(e){switch(e){case o.e.Comment:return monaco.languages.FoldingRangeKind.Comment;case o.e.Imports:return monaco.languages.FoldingRangeKind.Imports;case o.e.Region:return monaco.languages.FoldingRangeKind.Region}return}(e.kind)),n})}))},e}();function _(e,n){return n.cancel&&e.onCancellationRequested(function(){return n.cancel()}),n}var w=t(23);function T(e){return{getInitialState:function(){return new R(null,null,!1)},tokenize:function(n,t,r,i){return function(e,n,t,r,i){void 0===r&&(r=0);var o=0,a=!1;switch(t.scanError){case 2:n='"'+n,o=1;break;case 1:n="/*"+n,o=2}var u,c,s=w.a(n),f=t.lastWasColon;c={tokens:[],endState:t.clone()};for(;;){var d=r+s.getPosition(),l="";if(17===(u=s.scan()))break;if(d===r+s.getPosition())throw new Error("Scanner did not advance, next 3 characters are: "+n.substr(s.getPosition(),3));switch(a&&(d-=o),a=o>0,u){case 1:case 2:l=E,f=!1;break;case 3:case 4:l=x,f=!1;break;case 6:l=S,f=!0;break;case 5:l=A,f=!1;break;case 8:case 9:l=I,f=!1;break;case 7:l=O,f=!1;break;case 10:l=f?j:M,f=!1;break;case 11:l=P,f=!1}if(e)switch(u){case 12:l=F;break;case 13:l=L}c.endState=new R(t.getStateData(),s.getTokenError(),f),c.tokens.push({startIndex:d,scopes:l})}return c}(e,n,t,r)}}}var E="delimiter.bracket.json",x="delimiter.array.json",S="delimiter.colon.json",A="delimiter.comma.json",I="keyword.json",O="keyword.json",j="string.value.json",P="number.json",M="string.key.json",L="comment.block.json",F="comment.line.json",R=function(){function e(e,n,t){this._state=e,this.scanError=n,this.lastWasColon=t}return e.prototype.clone=function(){return new e(this._state,this.scanError,this.lastWasColon)},e.prototype.equals=function(n){return n===this||!!(n&&n instanceof e)&&(this.scanError===n.scanError&&this.lastWasColon===n.lastWasColon)},e.prototype.getStateData=function(){return this._state},e.prototype.setStateData=function(e){this._state=e},e}();function D(e){var n=[],t=new i(e);n.push(t);var r=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return t.getLanguageServiceWorker.apply(t,e)},o=e.languageId;n.push(monaco.languages.registerCompletionItemProvider(o,new g(r))),n.push(monaco.languages.registerHoverProvider(o,new p(r))),n.push(monaco.languages.registerDocumentSymbolProvider(o,new m(r))),n.push(monaco.languages.registerDocumentFormattingEditProvider(o,new b(r))),n.push(monaco.languages.registerDocumentRangeFormattingEditProvider(o,new k(r))),n.push(new u(o,r,e)),n.push(monaco.languages.setTokensProvider(o,T(!0))),n.push(monaco.languages.setLanguageConfiguration(o,W)),n.push(monaco.languages.registerColorProvider(o,new y(r))),n.push(monaco.languages.registerFoldingRangeProvider(o,new C(r)))}t.d(n,"setupMode",function(){return D});var W={wordPattern:/(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"]],autoClosingPairs:[{open:"{",close:"}",notIn:["string"]},{open:"[",close:"]",notIn:["string"]},{open:'"',close:'"',notIn:["string"]}]}},23:function(e,n,t){"use strict";function r(e,n){void 0===n&&(n=!1);var t=0,r=e.length,u="",c=0,s=16,f=0;function d(n,r){for(var i=0,o=0;i<n||!r;){var a=e.charCodeAt(t);if(a>=48&&a<=57)o=16*o+a-48;else if(a>=65&&a<=70)o=16*o+a-65+10;else{if(!(a>=97&&a<=102))break;o=16*o+a-97+10}t++,i++}return i<n&&(o=-1),o}function l(){if(u="",f=0,c=t,t>=r)return c=r,s=17;var n=e.charCodeAt(t);if(i(n)){do{t++,u+=String.fromCharCode(n),n=e.charCodeAt(t)}while(i(n));return s=15}if(o(n))return t++,u+=String.fromCharCode(n),13===n&&10===e.charCodeAt(t)&&(t++,u+="\n"),s=14;switch(n){case 123:return t++,s=1;case 125:return t++,s=2;case 91:return t++,s=3;case 93:return t++,s=4;case 58:return t++,s=6;case 44:return t++,s=5;case 34:return t++,u=function(){for(var n="",i=t;;){if(t>=r){n+=e.substring(i,t),f=2;break}var a=e.charCodeAt(t);if(34===a){n+=e.substring(i,t),t++;break}if(92!==a){if(a>=0&&a<=31){if(o(a)){n+=e.substring(i,t),f=2;break}f=6}t++}else{if(n+=e.substring(i,t),++t>=r){f=2;break}switch(a=e.charCodeAt(t++)){case 34:n+='"';break;case 92:n+="\\";break;case 47:n+="/";break;case 98:n+="\b";break;case 102:n+="\f";break;case 110:n+="\n";break;case 114:n+="\r";break;case 116:n+="\t";break;case 117:var u=d(4,!0);u>=0?n+=String.fromCharCode(u):f=4;break;default:f=5}i=t}}return n}(),s=10;case 47:var l=t-1;if(47===e.charCodeAt(t+1)){for(t+=2;t<r&&!o(e.charCodeAt(t));)t++;return u=e.substring(l,t),s=12}if(42===e.charCodeAt(t+1)){t+=2;for(var h=!1;t<r;){if(42===e.charCodeAt(t)&&t+1<r&&47===e.charCodeAt(t+1)){t+=2,h=!0;break}t++}return h||(t++,f=1),u=e.substring(l,t),s=13}return u+=String.fromCharCode(n),t++,s=16;case 45:if(u+=String.fromCharCode(n),++t===r||!a(e.charCodeAt(t)))return s=16;case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return u+=function(){var n=t;if(48===e.charCodeAt(t))t++;else for(t++;t<e.length&&a(e.charCodeAt(t));)t++;if(t<e.length&&46===e.charCodeAt(t)){if(!(++t<e.length&&a(e.charCodeAt(t))))return f=3,e.substring(n,t);for(t++;t<e.length&&a(e.charCodeAt(t));)t++}var r=t;if(t<e.length&&(69===e.charCodeAt(t)||101===e.charCodeAt(t)))if((++t<e.length&&43===e.charCodeAt(t)||45===e.charCodeAt(t))&&t++,t<e.length&&a(e.charCodeAt(t))){for(t++;t<e.length&&a(e.charCodeAt(t));)t++;r=t}else f=3;return e.substring(n,r)}(),s=11;default:for(;t<r&&g(n);)t++,n=e.charCodeAt(t);if(c!==t){switch(u=e.substring(c,t)){case"true":return s=8;case"false":return s=9;case"null":return s=7}return s=16}return u+=String.fromCharCode(n),t++,s=16}}function g(e){if(i(e)||o(e))return!1;switch(e){case 125:case 93:case 123:case 91:case 34:case 58:case 44:case 47:return!1}return!0}return{setPosition:function(e){t=e,u="",c=0,s=16,f=0},getPosition:function(){return t},scan:n?function(){var e;do{e=l()}while(e>=12&&e<=15);return e}:l,getToken:function(){return s},getTokenValue:function(){return u},getTokenOffset:function(){return c},getTokenLength:function(){return t-c},getTokenError:function(){return f}}}function i(e){return 32===e||9===e||11===e||12===e||160===e||5760===e||e>=8192&&e<=8203||8239===e||8287===e||12288===e||65279===e}function o(e){return 10===e||13===e||8232===e||8233===e}function a(e){return e>=48&&e<=57}function u(e,n,t){var i,o,a,u,f;if(n){for(u=n.offset,f=u+n.length,a=u;a>0&&!s(e,a-1);)a--;for(var d=f;d<e.length&&!s(e,d);)d++;o=e.substring(a,d),i=function(e,n){var t=0,r=0,i=n.tabSize||4;for(;t<e.length;){var o=e.charAt(t);if(" "===o)r++;else{if("\t"!==o)break;r+=i}t++}return Math.floor(r/i)}(o,t)}else o=e,i=0,a=0,u=0,f=e.length;var l,g=function(e,n){for(var t=0;t<n.length;t++){var r=n.charAt(t);if("\r"===r)return t+1<n.length&&"\n"===n.charAt(t+1)?"\r\n":"\r";if("\n"===r)return"\n"}return e&&e.eol||"\n"}(t,e),h=!1,p=0;l=t.insertSpaces?c(" ",t.tabSize||4):"\t";var m=r(o,!1),v=!1;function b(){return g+c(l,i+p)}function k(){var e=m.scan();for(h=!1;15===e||14===e;)h=h||14===e,e=m.scan();return v=16===e||0!==m.getTokenError(),e}var y=[];function C(n,t,r){!v&&t<f&&r>u&&e.substring(t,r)!==n&&y.push({offset:t,length:r-t,content:n})}var _=k();if(17!==_){var w=m.getTokenOffset()+a;C(c(l,i),a,w)}for(;17!==_;){for(var T=m.getTokenOffset()+m.getTokenLength()+a,E=k(),x="";!h&&(12===E||13===E);){C(" ",T,m.getTokenOffset()+a),T=m.getTokenOffset()+m.getTokenLength()+a,x=12===E?b():"",E=k()}if(2===E)1!==_&&(p--,x=b());else if(4===E)3!==_&&(p--,x=b());else{switch(_){case 3:case 1:p++,x=b();break;case 5:case 12:x=b();break;case 13:x=h?b():" ";break;case 6:x=" ";break;case 10:if(6===E){x="";break}case 7:case 8:case 9:case 11:case 2:case 4:12===E||13===E?x=" ":5!==E&&17!==E&&(v=!0);break;case 16:v=!0}!h||12!==E&&13!==E||(x=b())}C(x,T,m.getTokenOffset()+a),_=E}return y}function c(e,n){for(var t="",r=0;r<n;r++)t+=e;return t}function s(e,n){return-1!=="\r\n".indexOf(e.charAt(n))}function f(e,n,t){var i=r(e,!1);function o(e){return e?function(){return e(i.getTokenOffset(),i.getTokenLength())}:function(){return!0}}function a(e){return e?function(n){return e(n,i.getTokenOffset(),i.getTokenLength())}:function(){return!0}}var u=o(n.onObjectBegin),c=a(n.onObjectProperty),s=o(n.onObjectEnd),f=o(n.onArrayBegin),d=o(n.onArrayEnd),l=a(n.onLiteralValue),g=a(n.onSeparator),h=o(n.onComment),p=a(n.onError),m=t&&t.disallowComments,v=t&&t.allowTrailingComma;function b(){for(;;){var e=i.scan();switch(i.getTokenError()){case 4:k(14);break;case 5:k(15);break;case 3:k(13);break;case 1:m||k(11);break;case 2:k(12);break;case 6:k(16)}switch(e){case 12:case 13:m?k(10):h();break;case 16:k(1);break;case 15:case 14:break;default:return e}}}function k(e,n,t){if(void 0===n&&(n=[]),void 0===t&&(t=[]),p(e),n.length+t.length>0)for(var r=i.getToken();17!==r;){if(-1!==n.indexOf(r)){b();break}if(-1!==t.indexOf(r))break;r=b()}}function y(e){var n=i.getTokenValue();return e?l(n):c(n),b(),!0}function C(){switch(i.getToken()){case 3:return function(){f(),b();for(var e=!1;4!==i.getToken()&&17!==i.getToken();){if(5===i.getToken()){if(e||k(4,[],[]),g(","),b(),4===i.getToken()&&v)break}else e&&k(6,[],[]);C()||k(4,[],[4,5]),e=!0}return d(),4!==i.getToken()?k(8,[4],[]):b(),!0}();case 1:return function(){u(),b();for(var e=!1;2!==i.getToken()&&17!==i.getToken();){if(5===i.getToken()){if(e||k(4,[],[]),g(","),b(),2===i.getToken()&&v)break}else e&&k(6,[],[]);(10!==i.getToken()?(k(3,[],[2,5]),0):(y(!1),6===i.getToken()?(g(":"),b(),C()||k(4,[],[2,5])):k(5,[],[2,5]),1))||k(4,[],[2,5]),e=!0}return s(),2!==i.getToken()?k(7,[2],[]):b(),!0}();case 10:return y(!0);default:return function(){switch(i.getToken()){case 11:var e=0;try{"number"!=typeof(e=JSON.parse(i.getTokenValue()))&&(k(2),e=0)}catch(e){k(2)}l(e);break;case 7:l(null);break;case 8:l(!0);break;case 9:l(!1);break;default:return!1}return b(),!0}()}}return b(),17===i.getToken()||(C()?(17!==i.getToken()&&k(9,[],[]),!0):(k(4,[],[]),!1))}t.d(n,"a",function(){return d}),t.d(n,"f",function(){return l}),t.d(n,"b",function(){return g}),t.d(n,"d",function(){return h}),t.d(n,"e",function(){return p}),t.d(n,"c",function(){return m});var d=r,l=function(e,n,t){void 0===n&&(n=[]);var r=null,i=[],o=[];function a(e){Array.isArray(i)?i.push(e):r&&(i[r]=e)}return f(e,{onObjectBegin:function(){var e={};a(e),o.push(i),i=e,r=null},onObjectProperty:function(e){r=e},onObjectEnd:function(){i=o.pop()},onArrayBegin:function(){var e=[];a(e),o.push(i),i=e,r=null},onArrayEnd:function(){i=o.pop()},onLiteralValue:a,onError:function(e,t,r){n.push({error:e,offset:t,length:r})}},t),i[0]},g=function e(n,t,r){if(void 0===r&&(r=!1),function(e,n,t){return void 0===t&&(t=!1),n>=e.offset&&n<e.offset+e.length||t&&n===e.offset+e.length}(n,t,r)){var i=n.children;if(Array.isArray(i))for(var o=0;o<i.length&&i[o].offset<=t;o++){var a=e(i[o],t,r);if(a)return a}return n}},h=function e(n){if(!n.parent||!n.parent.children)return[];var t=e(n.parent);if("property"===n.parent.type){var r=n.parent.children[0].value;t.push(r)}else if("array"===n.parent.type){var i=n.parent.children.indexOf(n);-1!==i&&t.push(i)}return t},p=function e(n){switch(n.type){case"array":return n.children.map(e);case"object":for(var t=Object.create(null),r=0,i=n.children;r<i.length;r++){var o=i[r],a=o.children[1];a&&(t[o.children[0].value]=e(a))}return t;case"null":case"string":case"number":case"boolean":return n.value;default:return}};function m(e,n,t){return u(e,n,t)}},8:function(e,n,t){"use strict";var r,i,o,a,u,c,s,f,d,l,g,h,p,m,v;t.d(n,"i",function(){return r}),t.d(n,"j",function(){return i}),t.d(n,"g",function(){return o}),t.d(n,"e",function(){return s}),t.d(n,"d",function(){return l}),t.d(n,"c",function(){return g}),t.d(n,"m",function(){return p}),t.d(n,"h",function(){return C}),t.d(n,"b",function(){return w}),t.d(n,"f",function(){return T}),t.d(n,"a",function(){return E}),t.d(n,"k",function(){return M}),t.d(n,"l",function(){return U}),function(e){e.create=function(e,n){return{line:e,character:n}},e.is=function(e){var n=e;return H.objectLiteral(n)&&H.number(n.line)&&H.number(n.character)}}(r||(r={})),function(e){e.create=function(e,n,t,i){if(H.number(e)&&H.number(n)&&H.number(t)&&H.number(i))return{start:r.create(e,n),end:r.create(t,i)};if(r.is(e)&&r.is(n))return{start:e,end:n};throw new Error("Range#create called with invalid arguments["+e+", "+n+", "+t+", "+i+"]")},e.is=function(e){var n=e;return H.objectLiteral(n)&&r.is(n.start)&&r.is(n.end)}}(i||(i={})),function(e){e.create=function(e,n){return{uri:e,range:n}},e.is=function(e){var n=e;return H.defined(n)&&i.is(n.range)&&(H.string(n.uri)||H.undefined(n.uri))}}(o||(o={})),function(e){e.create=function(e,n,t,r){return{red:e,green:n,blue:t,alpha:r}},e.is=function(e){var n=e;return H.number(n.red)&&H.number(n.green)&&H.number(n.blue)&&H.number(n.alpha)}}(a||(a={})),function(e){e.create=function(e,n){return{range:e,color:n}},e.is=function(e){var n=e;return i.is(n.range)&&a.is(n.color)}}(u||(u={})),function(e){e.create=function(e,n,t){return{label:e,textEdit:n,additionalTextEdits:t}},e.is=function(e){var n=e;return H.string(n.label)&&(H.undefined(n.textEdit)||p.is(n))&&(H.undefined(n.additionalTextEdits)||H.typedArray(n.additionalTextEdits,p.is))}}(c||(c={})),function(e){e.Comment="comment",e.Imports="imports",e.Region="region"}(s||(s={})),function(e){e.create=function(e,n,t,r,i){var o={startLine:e,endLine:n};return H.defined(t)&&(o.startCharacter=t),H.defined(r)&&(o.endCharacter=r),H.defined(i)&&(o.kind=i),o},e.is=function(e){var n=e;return H.number(n.startLine)&&H.number(n.startLine)&&(H.undefined(n.startCharacter)||H.number(n.startCharacter))&&(H.undefined(n.endCharacter)||H.number(n.endCharacter))&&(H.undefined(n.kind)||H.string(n.kind))}}(f||(f={})),function(e){e.create=function(e,n){return{location:e,message:n}},e.is=function(e){var n=e;return H.defined(n)&&o.is(n.location)&&H.string(n.message)}}(d||(d={})),function(e){e.Error=1,e.Warning=2,e.Information=3,e.Hint=4}(l||(l={})),function(e){e.create=function(e,n,t,r,i,o){var a={range:e,message:n};return H.defined(t)&&(a.severity=t),H.defined(r)&&(a.code=r),H.defined(i)&&(a.source=i),H.defined(o)&&(a.relatedInformation=o),a},e.is=function(e){var n=e;return H.defined(n)&&i.is(n.range)&&H.string(n.message)&&(H.number(n.severity)||H.undefined(n.severity))&&(H.number(n.code)||H.string(n.code)||H.undefined(n.code))&&(H.string(n.source)||H.undefined(n.source))&&(H.undefined(n.relatedInformation)||H.typedArray(n.relatedInformation,d.is))}}(g||(g={})),function(e){e.create=function(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];var i={title:e,command:n};return H.defined(t)&&t.length>0&&(i.arguments=t),i},e.is=function(e){var n=e;return H.defined(n)&&H.string(n.title)&&H.string(n.command)}}(h||(h={})),function(e){e.replace=function(e,n){return{range:e,newText:n}},e.insert=function(e,n){return{range:{start:e,end:e},newText:n}},e.del=function(e){return{range:e,newText:""}},e.is=function(e){var n=e;return H.objectLiteral(n)&&H.string(n.newText)&&i.is(n.range)}}(p||(p={})),function(e){e.create=function(e,n){return{textDocument:e,edits:n}},e.is=function(e){var n=e;return H.defined(n)&&k.is(n.textDocument)&&Array.isArray(n.edits)}}(m||(m={})),function(e){e.is=function(e){var n=e;return n&&(void 0!==n.changes||void 0!==n.documentChanges)&&(void 0===n.documentChanges||H.typedArray(n.documentChanges,m.is))}}(v||(v={}));var b,k,y,C,_,w,T,E,x,S,A,I,O,j,P,M,L,F=function(){function e(e){this.edits=e}return e.prototype.insert=function(e,n){this.edits.push(p.insert(e,n))},e.prototype.replace=function(e,n){this.edits.push(p.replace(e,n))},e.prototype.delete=function(e){this.edits.push(p.del(e))},e.prototype.add=function(e){this.edits.push(e)},e.prototype.all=function(){return this.edits},e.prototype.clear=function(){this.edits.splice(0,this.edits.length)},e}();!function(){function e(e){var n=this;this._textEditChanges=Object.create(null),e&&(this._workspaceEdit=e,e.documentChanges?e.documentChanges.forEach(function(e){var t=new F(e.edits);n._textEditChanges[e.textDocument.uri]=t}):e.changes&&Object.keys(e.changes).forEach(function(t){var r=new F(e.changes[t]);n._textEditChanges[t]=r}))}Object.defineProperty(e.prototype,"edit",{get:function(){return this._workspaceEdit},enumerable:!0,configurable:!0}),e.prototype.getTextEditChange=function(e){if(k.is(e)){if(this._workspaceEdit||(this._workspaceEdit={documentChanges:[]}),!this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for versioned document changes.");var n=e;if(!(r=this._textEditChanges[n.uri])){var t={textDocument:n,edits:i=[]};this._workspaceEdit.documentChanges.push(t),r=new F(i),this._textEditChanges[n.uri]=r}return r}if(this._workspaceEdit||(this._workspaceEdit={changes:Object.create(null)}),!this._workspaceEdit.changes)throw new Error("Workspace edit is not configured for normal text edit changes.");var r;if(!(r=this._textEditChanges[e])){var i=[];this._workspaceEdit.changes[e]=i,r=new F(i),this._textEditChanges[e]=r}return r}}();!function(e){e.create=function(e){return{uri:e}},e.is=function(e){var n=e;return H.defined(n)&&H.string(n.uri)}}(b||(b={})),function(e){e.create=function(e,n){return{uri:e,version:n}},e.is=function(e){var n=e;return H.defined(n)&&H.string(n.uri)&&H.number(n.version)}}(k||(k={})),function(e){e.create=function(e,n,t,r){return{uri:e,languageId:n,version:t,text:r}},e.is=function(e){var n=e;return H.defined(n)&&H.string(n.uri)&&H.string(n.languageId)&&H.number(n.version)&&H.string(n.text)}}(y||(y={})),function(e){e.PlainText="plaintext",e.Markdown="markdown"}(C||(C={})),function(e){e.is=function(n){var t=n;return t===e.PlainText||t===e.Markdown}}(C||(C={})),function(e){e.is=function(e){var n=e;return H.objectLiteral(e)&&C.is(n.kind)&&H.string(n.value)}}(_||(_={})),function(e){e.Text=1,e.Method=2,e.Function=3,e.Constructor=4,e.Field=5,e.Variable=6,e.Class=7,e.Interface=8,e.Module=9,e.Property=10,e.Unit=11,e.Value=12,e.Enum=13,e.Keyword=14,e.Snippet=15,e.Color=16,e.File=17,e.Reference=18,e.Folder=19,e.EnumMember=20,e.Constant=21,e.Struct=22,e.Event=23,e.Operator=24,e.TypeParameter=25}(w||(w={})),function(e){e.PlainText=1,e.Snippet=2}(T||(T={})),function(e){e.create=function(e){return{label:e}}}(E||(E={})),function(e){e.create=function(e,n){return{items:e||[],isIncomplete:!!n}}}(x||(x={})),function(e){e.fromPlainText=function(e){return e.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")},e.is=function(e){var n=e;return H.string(n)||H.objectLiteral(n)&&H.string(n.language)&&H.string(n.value)}}(S||(S={})),function(e){e.is=function(e){var n=e;return H.objectLiteral(n)&&(_.is(n.contents)||S.is(n.contents)||H.typedArray(n.contents,S.is))&&(void 0===e.range||i.is(e.range))}}(A||(A={})),function(e){e.create=function(e,n){return n?{label:e,documentation:n}:{label:e}}}(I||(I={})),function(e){e.create=function(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];var i={label:e};return H.defined(n)&&(i.documentation=n),H.defined(t)?i.parameters=t:i.parameters=[],i}}(O||(O={})),function(e){e.Text=1,e.Read=2,e.Write=3}(j||(j={})),function(e){e.create=function(e,n){var t={range:e};return H.number(n)&&(t.kind=n),t}}(P||(P={})),function(e){e.File=1,e.Module=2,e.Namespace=3,e.Package=4,e.Class=5,e.Method=6,e.Property=7,e.Field=8,e.Constructor=9,e.Enum=10,e.Interface=11,e.Function=12,e.Variable=13,e.Constant=14,e.String=15,e.Number=16,e.Boolean=17,e.Array=18,e.Object=19,e.Key=20,e.Null=21,e.EnumMember=22,e.Struct=23,e.Event=24,e.Operator=25,e.TypeParameter=26}(M||(M={})),function(e){e.create=function(e,n,t,r,i){var o={name:e,kind:n,location:{uri:r,range:t}};return i&&(o.containerName=i),o}}(L||(L={}));var R,D,W,V,N,z=function(){return function(){}}();!function(e){e.create=function(e,n,t,r,i,o){var a={name:e,detail:n,kind:t,range:r,selectionRange:i};return void 0!==o&&(a.children=o),a},e.is=function(e){var n=e;return n&&H.string(n.name)&&H.string(n.detail)&&H.number(n.kind)&&i.is(n.range)&&i.is(n.selectionRange)&&(void 0===n.deprecated||H.boolean(n.deprecated))&&(void 0===n.children||Array.isArray(n.children))}}(z||(z={})),function(e){e.QuickFix="quickfix",e.Refactor="refactor",e.RefactorExtract="refactor.extract",e.RefactorInline="refactor.inline",e.RefactorRewrite="refactor.rewrite",e.Source="source",e.SourceOrganizeImports="source.organizeImports"}(R||(R={})),function(e){e.create=function(e,n){var t={diagnostics:e};return void 0!==n&&null!==n&&(t.only=n),t},e.is=function(e){var n=e;return H.defined(n)&&H.typedArray(n.diagnostics,g.is)&&(void 0===n.only||H.typedArray(n.only,H.string))}}(D||(D={})),function(e){e.create=function(e,n,t){var r={title:e};return h.is(n)?r.command=n:r.edit=n,void 0!==t&&(r.kind=t),r},e.is=function(e){var n=e;return n&&H.string(n.title)&&(void 0===n.diagnostics||H.typedArray(n.diagnostics,g.is))&&(void 0===n.kind||H.string(n.kind))&&(void 0!==n.edit||void 0!==n.command)&&(void 0===n.command||h.is(n.command))&&(void 0===n.edit||v.is(n.edit))}}(W||(W={})),function(e){e.create=function(e,n){var t={range:e};return H.defined(n)&&(t.data=n),t},e.is=function(e){var n=e;return H.defined(n)&&i.is(n.range)&&(H.undefined(n.command)||h.is(n.command))}}(V||(V={})),function(e){e.create=function(e,n){return{tabSize:e,insertSpaces:n}},e.is=function(e){var n=e;return H.defined(n)&&H.number(n.tabSize)&&H.boolean(n.insertSpaces)}}(N||(N={}));var K=function(){return function(){}}();!function(e){e.create=function(e,n,t){return{range:e,target:n,data:t}},e.is=function(e){var n=e;return H.defined(n)&&i.is(n.range)&&(H.undefined(n.target)||H.string(n.target))}}(K||(K={}));var U,B;!function(e){e.create=function(e,n,t,r){return new q(e,n,t,r)},e.is=function(e){var n=e;return!!(H.defined(n)&&H.string(n.uri)&&(H.undefined(n.languageId)||H.string(n.languageId))&&H.number(n.lineCount)&&H.func(n.getText)&&H.func(n.positionAt)&&H.func(n.offsetAt))},e.applyEdits=function(e,n){for(var t=e.getText(),r=function e(n,t){if(n.length<=1)return n;var r=n.length/2|0,i=n.slice(0,r),o=n.slice(r);e(i,t),e(o,t);for(var a=0,u=0,c=0;a<i.length&&u<o.length;){var s=t(i[a],o[u]);n[c++]=s<=0?i[a++]:o[u++]}for(;a<i.length;)n[c++]=i[a++];for(;u<o.length;)n[c++]=o[u++];return n}(n,function(e,n){var t=e.range.start.line-n.range.start.line;return 0===t?e.range.start.character-n.range.start.character:t}),i=t.length,o=r.length-1;o>=0;o--){var a=r[o],u=e.offsetAt(a.range.start),c=e.offsetAt(a.range.end);if(!(c<=i))throw new Error("Ovelapping edit");t=t.substring(0,u)+a.newText+t.substring(c,t.length),i=u}return t}}(U||(U={})),function(e){e.Manual=1,e.AfterDelay=2,e.FocusOut=3}(B||(B={}));var H,q=function(){function e(e,n,t,r){this._uri=e,this._languageId=n,this._version=t,this._content=r,this._lineOffsets=null}return Object.defineProperty(e.prototype,"uri",{get:function(){return this._uri},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"languageId",{get:function(){return this._languageId},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"version",{get:function(){return this._version},enumerable:!0,configurable:!0}),e.prototype.getText=function(e){if(e){var n=this.offsetAt(e.start),t=this.offsetAt(e.end);return this._content.substring(n,t)}return this._content},e.prototype.update=function(e,n){this._content=e.text,this._version=n,this._lineOffsets=null},e.prototype.getLineOffsets=function(){if(null===this._lineOffsets){for(var e=[],n=this._content,t=!0,r=0;r<n.length;r++){t&&(e.push(r),t=!1);var i=n.charAt(r);t="\r"===i||"\n"===i,"\r"===i&&r+1<n.length&&"\n"===n.charAt(r+1)&&r++}t&&n.length>0&&e.push(n.length),this._lineOffsets=e}return this._lineOffsets},e.prototype.positionAt=function(e){e=Math.max(Math.min(e,this._content.length),0);var n=this.getLineOffsets(),t=0,i=n.length;if(0===i)return r.create(0,e);for(;t<i;){var o=Math.floor((t+i)/2);n[o]>e?i=o:t=o+1}var a=t-1;return r.create(a,e-n[a])},e.prototype.offsetAt=function(e){var n=this.getLineOffsets();if(e.line>=n.length)return this._content.length;if(e.line<0)return 0;var t=n[e.line],r=e.line+1<n.length?n[e.line+1]:this._content.length;return Math.max(Math.min(t+e.character,r),t)},Object.defineProperty(e.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!0,configurable:!0}),e}();!function(e){var n=Object.prototype.toString;e.defined=function(e){return void 0!==e},e.undefined=function(e){return void 0===e},e.boolean=function(e){return!0===e||!1===e},e.string=function(e){return"[object String]"===n.call(e)},e.number=function(e){return"[object Number]"===n.call(e)},e.func=function(e){return"[object Function]"===n.call(e)},e.objectLiteral=function(e){return null!==e&&"object"==typeof e},e.typedArray=function(e,n){return Array.isArray(e)&&e.every(n)}}(H||(H={}))}}]);