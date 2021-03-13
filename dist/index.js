var templateRepo;(()=>{"use strict";var e={468:(e,t,n)=>{n.d(t,{createOrUpdateSampleTemplates:()=>r});var i=function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function l(e){try{s(i.next(e))}catch(e){r(e)}}function a(e){try{s(i.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,a)}s((i=i.apply(e,t||[])).next())}))};class o{getAllTemplateNames(){return i(this,void 0,void 0,(function*(){return(yield this.findAllTemplateWidgets()).map((e=>(console.log("template:"+e.metadata[miro.getClientId()].templateName+"found!"),e.metadata[miro.getClientId()].templateName)))}))}removeTemplate(e){return i(this,void 0,void 0,(function*(){(yield this.findWidgetByTemplateName(e)).forEach((e=>i(this,void 0,void 0,(function*(){return yield miro.board.widgets.deleteById(e.id)}))))}))}createOrReplaceTemplate(e,t){return i(this,void 0,void 0,(function*(){console.log("createOrReplaceTemplate:"),console.log("finding widget for template:",e);var n=yield this.findWidgetByTemplateName(e);if(console.log(`${n.length} widgets found for template with name: ${e}`),0==n.length){console.log("Creating template:",t);const e=yield miro.board.viewport.get();yield miro.board.widgets.create({type:"TEXT",text:t.contentTemplate,metadata:{[miro.getClientId()]:t},capabilities:{editable:!1},style:{textAlign:"l"},x:e.x-200,y:e.y-200}),console.log(`template: ${t.templateName} is created successfully.`)}else{console.log("Updating template:",t);var i=n[0];i.metadata[miro.getClientId()]=t,yield miro.board.widgets.update(i),console.log(`template:${t.templateName} is updated successfully.`)}}))}findAllTemplateWidgets(){return i(this,void 0,void 0,(function*(){var e=(yield miro.board.widgets.get()).filter((e=>"STICKER"==e.type&&e.text.includes("using")));return console.log("# of widgets contain using in their text:",e.length),(yield miro.board.widgets.get()).filter((e=>e.metadata&&e.metadata["3074457349056199734"]&&e.metadata["3074457349056199734"]&&e.metadata["3074457349056199734"].templateName))}))}findWidgetByTemplateName(e){return i(this,void 0,void 0,(function*(){return(yield this.findAllTemplateWidgets()).filter((t=>t.metadata[miro.getClientId()].templateName==e))}))}getTemplateByName(e){return i(this,void 0,void 0,(function*(){var t=yield this.findWidgetByTemplateName(e);if(0==t.length)throw new Error("Widget not found for template:"+e);console.log("Widgets found:",t);var n=t[0].metadata[miro.getClientId()];return console.log("Corresponding metadata:",t[0].metadata[miro.getClientId()]),console.log("Corresponding template:",n),n}))}}function r(){return i(this,void 0,void 0,(function*(){var e=new o;yield function(e){return i(this,void 0,void 0,(function*(){const t=[{fileNameTemplate:"{{scenario}}",fileExtension:"cs",contentTemplate:'using StoryTest;\nusing Vlerx.Es.Messaging;\nusing Vlerx.Es.Persistence;\nusing Vlerx.SampleContracts.{{sut}};\nusing Vlerx.{{context}}.{{sut}};\nusing Vlerx.{{context}}.{{sut}}.Commands;\nusing Vlerx.{{context}}.Tests.StoryTests;\nusing Xunit;\n\nnamespace {{context}}.Tests\n{\n    {{#* inline "callConstructor"}}\n    new {{title}}({{#each properties}}"{{example}}"{{#skipLast}},{{/skipLast}}{{/each}}){{/inline}}\n\n    public class {{scenario}} : IStorySpecification\n    {\n        public IDomainEvent[] Given\n        => new IDomainEvent[]{\n    {{#each givens}}\n        {{> callConstructor .}},\n    {{/each}}\n        };\n        public ICommand When\n        => {{> callConstructor when}};\n        public IDomainEvent[] Then\n        => new IDomainEvent[]{\n    {{#each thens}}\n        {{> callConstructor .}},\n    {{/each}}\n        };\n\n        public string Sut { get; } = nameof({{sut}});\n\n        [Fact]\n        public void Run()\n        => TestAdapter.Test(this\n                , setupUseCases: eventStore =>\n                        new[] {\n                        new {{sut}}UseCases(new Repository<{{sut}}.State>(eventStore))\n                        });\n    }\n}',templateName:"sample-template"},{fileNameTemplate:"{{scenario}}2",fileExtension:"cs",contentTemplate:'using StoryTest;\nusing Vlerx.Es.Messaging;\nusing Vlerx.Es.Persistence;\nusing Vlerx.SampleContracts.{{sut}};\nusing Vlerx.{{context}}.{{sut}};\nusing Vlerx.{{context}}.{{sut}}.Commands;\nusing Vlerx.{{context}}.Tests.StoryTests;\nusing Xunit;\n\nnamespace {{context}}.Tests\n{\n    {{#* inline "callConstructor"}}\n    new {{title}}({{#each properties}}"{{example}}"{{#skipLast}},{{/skipLast}}{{/each}}){{/inline}}\n\n    public class {{scenario}} : IStorySpecification\n    {\n        public IDomainEvent[] Given\n        => new IDomainEvent[]{\n    {{#each givens}}\n        {{> callConstructor .}},\n    {{/each}}\n        };\n        public ICommand When\n        => {{> callConstructor when}};\n        public IDomainEvent[] Then\n        => new IDomainEvent[]{\n    {{#each thens}}\n        {{> callConstructor .}},\n    {{/each}}\n        };\n\n        public string Sut { get; } = nameof({{sut}});\n\n        [Fact]\n        public void Run()\n        => TestAdapter.Test(this\n                , setupUseCases: eventStore =>\n                        new[] {\n                        new {{sut}}UseCases(new Repository<{{sut}}.State>(eventStore))\n                        });\n    }\n}',templateName:"sample-template2"}];for(var n=0;n<t.length;n++)yield e.createOrReplaceTemplate(t[n].templateName,t[n])}))}(e)}))}}},t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={exports:{}};return e[i](o,o.exports,n),o.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};(()=>{n.r(i);var e=function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function l(e){try{s(i.next(e))}catch(e){r(e)}}function a(e){try{s(i.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,a)}s((i=i.apply(e,t||[])).next())}))};function t(t){return e(this,void 0,void 0,(function*(){const e=yield miro.board.widgets.get({id:t.startWidgetId});return 0==e.length&&(yield miro.showNotification("Examples should be connected to a fact they belong to.")),e[0]}))}function o(e){return e?"text"in e?e.text:"captions"in e&&e.captions&&e.captions[0]&&e.captions[0].text?Promise.resolve(e.captions[0].text):Promise.reject("Cannot get the widget text. The widget has no text fields."):Promise.reject("Cannot get the widget text. The widget is undefined.")}function r(e,t){const n=e;if("text"in e)n.text=t;else{if(!("captions"in e))return Promise.reject("Cannot set the widget text. The widget has no text fields.");n.captions[0].text=t}return Promise.resolve(n)}let l=new class{constructor(){this.unselectAll=()=>e(this,void 0,void 0,(function*(){miro&&miro.board||(yield new Promise((e=>setTimeout(e,200)))),yield miro.board.selection.clear()})),this.showNotification=e=>miro.showNotification(e),this.zoomTo=e=>miro.board.viewport.zoomToObject(e.id,!0)}openModal(e){throw miro.board.ui.openModal(e,{width:50,height:50}),new Error("Method not implemented.")}onWidgetLeft(t){miro.addListener("SELECTION_UPDATED",(n=>e(this,void 0,void 0,(function*(){var e=n.data;this.previouslySelectedWidgets||(this.previouslySelectedWidgets=e),this.previouslySelectedWidgets.forEach((e=>t(e.id))),this.previouslySelectedWidgets=e}))))}interceptPossibleTextEdit(t){miro.addListener("SELECTION_UPDATED",(n=>e(this,void 0,void 0,(function*(){var i=n.data;this.previouslySelectedWidgets||(this.previouslySelectedWidgets=i),this.previouslySelectedWidgets.forEach((n=>e(this,void 0,void 0,(function*(){let e=(yield miro.board.widgets.get({id:n.id}))[0];const i=yield o(e),l=yield t(e.id,i);e=yield r(e,l),l!=i&&(yield miro.board.widgets.update([e]))})))),this.previouslySelectedWidgets=i}))))}getWidgetText(t){return e(this,void 0,void 0,(function*(){console.log("Finding widget by id:"+t);var e=(yield miro.board.widgets.get({id:t}))[0];return yield o(e)}))}updateWidgetText(t,n){return e(this,void 0,void 0,(function*(){let e=(yield miro.board.widgets.get({id:t}))[0];e=yield r(e,n),yield miro.board.widgets.update([e])}))}onNextSingleSelection(n){console.log("Waiting for the next single selection!");const i=r=>e(this,void 0,void 0,(function*(){var l=r.data;if(0!=l.length)if(console.log("Selected."),l.length>1)console.log(`${l.length} items are selected. Only a single one can be selected.`);else{console.log("Getting the widget.");var a=(yield miro.board.widgets.get({id:l[0].id}))[0];console.log("Converting the widget"),function(n){return e(this,void 0,void 0,(function*(){var i={id:n.id,exampleWidget:n};i.abstractionWidget=yield function(n){return e(this,void 0,void 0,(function*(){const i=yield function(t){return e(this,void 0,void 0,(function*(){return(yield(yield miro.board.widgets.get({type:"LINE",endWidgetId:t.id})).map((e=>e))).filter((e=>0!=e.style.lineEndStyle))}))}(n);if(0===i.length)return Promise.resolve(n);const o=yield Promise.all(i.map(t));if(o.length>1){const e="Examples can not belong to more than one abstraction (only one incoming line).";return yield miro.showNotification(e),Promise.reject(e)}return Promise.resolve(o[0])}))}(i.exampleWidget),console.log("Selection dto initiated.",i),i.style=function(e){const t={};return e.style&&e.style.backgroundColor?(console.log("Setting style:",e.style.backgroundColor),t.backgroundColor=e.style.backgroundColor):e.style&&e.style.stickerBackgroundColor&&(console.log("Setting style:",e.style.stickerBackgroundColor),t.backgroundColor=e.style.stickerBackgroundColor),t}(n);try{const e=e=>e.split("</p><p>").join("\n").replace("<p>","").replace("</p>","").replace("&#43;","+");i.exampleText=e(yield o(n))}catch(e){return Promise.reject("The widget "+JSON.stringify(n)+" does not have any text.")}console.log("Widget text converted by board.:",i.exampleText);try{return{widgetSnapshot:i,widgetData:yield function(e){return t=this,n=void 0,o=function*(){const t=e.split("\n");let n=t.shift();if(!n)return Promise.reject("Unknown text format.");const i=e=>e.trim().replace(/([^A-Z0-9]+)(.)/gi,(function(){return arguments[2].toUpperCase()}));n=i(n);const o=t.map((e=>e.split(":"))).map((e=>({propertyName:i(e[0]),simplePropertyValue:e[1].trim()})));return Promise.resolve({type:n,properties:o})},new((i=void 0)||(i=Promise))((function(e,r){function l(e){try{s(o.next(e))}catch(e){r(e)}}function a(e){try{s(o.throw(e))}catch(e){r(e)}}function s(t){var n;t.done?e(t.value):(n=t.value,n instanceof i?n:new i((function(e){e(n)}))).then(l,a)}s((o=o.apply(t,n||[])).next())}));var t,n,i,o}(i.exampleText)}}catch(e){return miro.showNotification(e),Promise.reject(e)}}))}(a).then((e=>{console.log(e),n(e),miro.removeListener("SELECTION_UPDATED",i)})).catch(console.log)}}));return miro.addListener("SELECTION_UPDATED",i)}},a=new class{constructor(){this.getTestSummeryForWidget=e=>{return t=this,n=void 0,o=function*(){const t=(yield miro.board.widgets.get({id:e}))[0];return!!(t&&t.metadata[miro.getClientId()]&&t.metadata[miro.getClientId()].testReport&&t.metadata[miro.getClientId()].testReport)&&(n=t.metadata[miro.getClientId()].testReport,{total:(null!==(i=n.passed)&&void 0!==i?i:[]).length+(null!==(o=n.failed)&&void 0!==o?o:[]).length+(null!==(r=n.pending)&&void 0!==r?r:[]).length+(null!==(l=n.skipped)&&void 0!==l?l:[]).length,passed:(null!==(a=n.passed)&&void 0!==a?a:[]).length,failed:(null!==(s=n.failed)&&void 0!==s?s:[]).length,skipped:(null!==(d=n.skipped)&&void 0!==d?d:[]).length,pending:(null!==(c=n.pending)&&void 0!==c?c:[]).length});var n,i,o,r,l,a,s,d,c},new((i=void 0)||(i=Promise))((function(e,r){function l(e){try{s(o.next(e))}catch(e){r(e)}}function a(e){try{s(o.throw(e))}catch(e){r(e)}}function s(t){var n;t.done?e(t.value):(n=t.value,n instanceof i?n:new i((function(e){e(n)}))).then(l,a)}s((o=o.apply(t,n||[])).next())}));var t,n,i,o}}};var s=n(468),d=function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function l(e){try{s(i.next(e))}catch(e){r(e)}}function a(e){try{s(i.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,a)}s((i=i.apply(e,t||[])).next())}))};const c=(e,t)=>d(void 0,void 0,void 0,(function*(){var n=yield a.getTestSummeryForWidget(e);return"boolean"==typeof n?t:u(n,t)})),u=(e,t)=>{var n,i;return n=t,(i=new RegExp("<div data-section='test-summery'>.*</div>")).test(n)&&(n=n.replace(i,"")),(t=n=n.replace(new RegExp("Failing[(]\\d+/\\d+[)]"),"").replace(new RegExp("Passing[(]\\d+/\\d+[)]"),"").replace(new RegExp("Skipping[(]\\d+/\\d+[)]"),"").replace(new RegExp("Pending[(]\\d+/\\d+[)]"),"").replace(new RegExp('<div><span style="background-color:#de2f2f;color:#fff"> &nbsp;</span><span style="background-color:#1fab0f;color:#eff"> &nbsp;</span><span style="background-color:#f1c807;color:#046"> &nbsp;</span><span style="background-color:#199;color:#fff"> &nbsp;</span></div>'),"").replace(new RegExp('<span style="background-color:.+>.+</span>'),""))+"<div data-section='test-summery'><span style='background-color:#de2f2f;color:#fff'> Failing("+e.failed+"/"+e.total+") </span><span style='background-color:#1fab0f;color:#eff'> Passing("+e.passed+"/"+e.total+") </span><span style='background-color:#f1c807;color:#046'> Skipping("+e.skipped+"/"+e.total+") </span><span style='background-color:#199;color:#fff'> Pending("+e.pending+"/"+e.total+") </span></div>"};miro.onReady((()=>d(void 0,void 0,void 0,(function*(){yield l.interceptPossibleTextEdit(c),yield miro.initialize({extensionPoints:{getWidgetMenuItems:e=>e.length==e.length&&1==e.length?Promise.resolve([{tooltip:"Make an Example",svgIcon:'<line x1="22" y1="22" x2="00" y2="22" stroke="currentColor" stroke-width="2"></line>',onClick:()=>{}}]):Promise.resolve([{}]),bottomBar:{title:"Context Reflective Test",svgIcon:'<path fill="currentColor" fill-rule="nonzero" d="M15,4h1V2H8V4H9v6.6L2.25,22H21.75L15,10.6Zm3.25,16H5.75L11,11.15V4h2v7.15Z"/>',onClick:()=>{miro.board.ui.openLeftSidebar("sidebar.html")}}}}),(0,s.createOrUpdateSampleTemplates)()}))))})(),templateRepo=i})();