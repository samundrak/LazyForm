function sorter(e){var t={};return e.forEach(function(n,i){n.index?t.hasOwnProperty("index_"+n.index)?t["index_"+n.index].push({index:n.index,data:n.data}):(t["index_"+n.index]=new Array,t["index_"+n.index].push({index:n.index,data:n.data})):(t["index_"+e.length+1]=new Array,t["index_"+e.length+1].push({index:n.index,data:n.data}))}),t}function reArrange(e){var t=[];for(var n in e)t.push(e[n][0].index);t.sort();var i=[],r=!1;return t.forEach(function(t){-1!=t?e["index_"+t].forEach(function(e){i.push(e)}):r=!0}),r&&e["index_-1"].forEach(function(e){i.push(e)}),i}Array.prototype.insert=function(e,t){this.splice(e,0,t)};var Form=function(){function e(){var e=this;this.$replaceString="$input",this.$submitCallback=void 0,this.$name=void 0,this.$inputFieldsName=[],this.getForm=function(){return e.$form},this.getRawHTML=function(){return e.$container.innerHTML},this.$callback=void 0}return e.prototype.setFormOptions=function(e){this.$formOptions=e},e.prototype.setInputValue=function(e,t){-1!==this.$inputFieldsName.indexOf(e)&&(document.forms[this.$name][e].value=t)},e.prototype.getInputValue=function(e){return-1===this.$inputFieldsName.indexOf(e)?void console.warn("This key("+e+") is not available"):document.forms[this.$name][e].value},e.prototype.getAllInputDom=function(){var e=this,t=[];return this.$inputFieldsName.forEach(function(n){t.push(document.forms[e.$name][n])}),t},e.prototype.getInputDom=function(e){return-1===this.$inputFieldsName.indexOf(e)?void console.warn("This key("+e+") is not available"):document.forms[this.$name][e]},e.prototype.getAllInputValue=function(){var e=this,t={};return this.$inputFieldsName.forEach(function(n){t[n]=document.forms[e.$name][n].value}),t},e.prototype.getContainer=function(){return this.$container},e.prototype.create=function(e){if(!this.$formOptions)return void console.warn("Form options must be set, to set form options you can call set$formOptions method");var t=this.buildForm();this.placeTheForm(t),this.buildChilds(),this.attachEvents(),document.forms[this.$name].onsubmit=function(){return console.log("form submitted"),!1}},e.prototype.getValue=function(e){console.log()},e.prototype.placeTheForm=function(e){if(this.$formOptions.hasOwnProperty("container")){var t=this.$formOptions.container;if(t.startsWith(".")){var n=document.getElementsByClassName(t.substring(1,t.length));n.length&&(this.$container=n,n[0].appendChild(e))}else if(t.startsWith("#"))this.$container=document.getElementById(t.substring(1,t.length)),this.$container.appendChild(e);else{var n=document.getElementsByTagName(t);n.length&&(this.$container=n,n[0].appendChild(e))}}},e.prototype.createFields=function(e,t){var n,i=document.createElement(e);if(i.setAttribute("type","text"),this.$formOptions.fields.hasOwnProperty("common")){if(this.$formOptions.fields.common.attr)for(var r in this.$formOptions.fields.common.attr)i.setAttribute(r,this.$formOptions.fields.common.attr[r]);n=t.attr.hasOwnProperty("template")?t.attr.template:this.$formOptions.fields.common.hasOwnProperty("template")?this.$formOptions.fields.common.template:this.$replaceString}for(var r in t.attr)"name"===r&&this.$inputFieldsName.push(t.attr[r]),i.setAttribute(r,t.attr[r]);return{input:i,template:n}},e.prototype.createElements=function(e,t){var n=document.createElement("div");return t&&(n.style.display="none"),e.forEach(function(e){var i=document.createElement(e.element||"div");for(var r in e.attr)i.setAttribute(r,e.attr[r]);i.innerHTML=e.value||t||"",n.appendChild(i)}),n},e.prototype.buildChilds=function(){var e=this;if(this.$formOptions.hasOwnProperty("fields")&&this.$formOptions.fields.hasOwnProperty("fields")){var t,n=[];for(var i in this.$formOptions.fields.fields)switch(i){case"textarea":case"input":this.$formOptions.fields.fields[i].forEach(function(r){if(!Array.isArray(r.attr)){var o=document.createElement("temp"),a=e.createFields(i,r);r.before&&o.appendChild(e.createElements(r.before)),o.appendChild(a.input),e.$formOptions.fields.validationElement&&"submit"!=r.attr.type&&"Submit"!=r.attr.type&&o.appendChild(e.createElements([e.$formOptions.fields.validationElement],"This Field is required")),r.after&&o.appendChild(e.createElements(r.after));var s=a.template.replace(e.$replaceString,o.innerHTML);"submit"==r.attr.type||"Submit"===r.attr.type?t=s:n.push({index:r.rank||-1,data:s})}});break;case"select":this.$formOptions.fields.fields[i].forEach(function(t){var i=document.createElement("temp"),r=e.createFields("select",t);t.options.forEach(function(e){var t=document.createElement("option");for(var n in e.attr)t.setAttribute(n,e.attr[n]),t.innerHTML=e.text;r.input.appendChild(t)}),t.before&&i.appendChild(e.createElements(t.before)),i.appendChild(r.input),e.$formOptions.fields.validationElement&&i.appendChild(e.createElements([e.$formOptions.fields.validationElement],"This Field is required")),t.after&&i.appendChild(e.createElements(t.after));var o=r.template.replace(e.$replaceString,i.innerHTML);n.push({index:t.rank||-1,data:o})});break;case"checkbox":case"radio":this.$formOptions.fields.fields[i].forEach(function(t){var r=i;t.name&&e.$inputFieldsName.push(t.name);var o=document.createElement("temp");t.before&&o.appendChild(e.createElements(t.before)),t.fields.forEach(function(e){var n=(document.createElement("temp"),document.createElement("input"));n.setAttribute("type",r),t.name&&n.setAttribute("name",t.name||""),t["class"]&&n.setAttribute("class",t["class"]);for(var i in e)"text"!=i&&n.setAttribute(i,e[i]);if(o.appendChild(n),e.text){var a=document.createElement("span");a.innerHTML=e.text,o.appendChild(a)}else{var a=document.createElement("span");a.innerHTML=e.value,o.appendChild(a)}}),e.$formOptions.fields.validationElement&&o.appendChild(e.createElements([e.$formOptions.fields.validationElement],"This Field is required")),t.after&&o.appendChild(e.createElements(t.after));var a=t.template?t.template:e.$formOptions.fields.common.hasOwnProperty("template")?e.$formOptions.fields.common.template:e.$replaceString,s=a.replace(e.$replaceString,o.innerHTML);n.push({index:t.rank||-1,data:s})})}var r=sorter(n);this.$form.innerHTML="",reArrange(r).forEach(function(t){e.$form.innerHTML=e.$form.innerHTML+t.data}),this.$form.innerHTML=this.$form.innerHTML+t}},e.prototype.buildForm=function(){var e=document.createElement("Form");return e.onfocus=function(e){console.log(e)},void 0!==this.$formOptions?(this.$formOptions.hasOwnProperty("attribute")&&"object"==typeof this.$formOptions.attribute&&(this.setAttributes(this.$formOptions.attribute,e),this.$name=this.$formOptions.attribute.name||Date.now()),this.$form=e,e):void 0},e.prototype.setAttributes=function(e,t){for(var n in e)t.setAttribute(n,e[n])},e.prototype.attachListener=function(e){this.$callback=new e},e.prototype.observer=function(e){var t=[8,37,38,39,40,,18,91,32,16,20,9,27];-1===t.indexOf(e.event.keyCode)&&this.$callback.hasOwnProperty(e.eventType)&&this.$callback[e.eventType]({input:e.emitter,value:e.value,form:e.form,event:e.event})},e.prototype.attachEvents=function(){var e=this,t=["onkeyup","onkeydown","onmouseover","onmousedown","onclick","onfocus","onmouseenter","onmouseleave","onmousemove","onmousewheel"],n=this;this.$inputFieldsName.forEach(function(i){t.forEach(function(t){document.forms[e.$name][i][t]=function(e){n.observer({eventType:t,emitter:i,form:n.$name,value:document.forms[n.$name][i].value,event:e})}})})},e}();