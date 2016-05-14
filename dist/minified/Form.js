Array.prototype.insert=function(t,e){this.splice(t,0,e)};var Form=function(){function Form(){var t=this;this.$validator={},this.$replaceString="$input",this.$submitCallback=void 0,this.$name=void 0,this.$inputFieldsName=[],this.getForm=function(){return t.$form},this.getRawHTML=function(){return t.$container.innerHTML},this.$callback=void 0}return Form.prototype.setFormOptions=function(t){this.$formOptions=t},Form.prototype.setInputValue=function(t,e){-1!==this.$inputFieldsName.indexOf(t)&&(document.forms[this.$name][t].value=e)},Form.prototype.getInputValue=function(t){return-1===this.$inputFieldsName.indexOf(t)?void console.warn("This key("+t+") is not available"):document.forms[this.$name][t].value},Form.prototype.getAllInputDom=function(){var t=this,e=[];return this.$inputFieldsName.forEach(function(i){e.push(document.forms[t.$name][i])}),e},Form.prototype.getInputDom=function(t){return-1===this.$inputFieldsName.indexOf(t)?void console.warn("This key("+t+") is not available"):document.forms[this.$name][t]},Form.prototype.getAllInputValue=function(){var t=this,e={};return this.$inputFieldsName.forEach(function(i){e[i]=document.forms[t.$name][i].value}),e},Form.prototype.getContainer=function(){return this.$container},Form.prototype.create=function(fields){var _this=this;if(!this.$formOptions)return void console.warn("Form options must be set, to set form options you can call set$formOptions method");var form=this.buildForm();return this.placeTheForm(form),this.buildChilds(),this.attachEvents(),console.log(this.$name),this.$name?void(document.forms[this.$name].onsubmit=function(event){var inputValues={};for(var key in _this.$validator)inputValues[key]=_this.getInputValue(key);var isFormPassedValidation=!1;for(var key in inputValues)isFormPassedValidation=_this.validationWatcher({emitter:key,value:inputValues[key],event:event});return isFormPassedValidation?(_this.$formOptions.hasOwnProperty("attribute")&&(_this.$formOptions.attribute.hasOwnProperty("onsubmit")||_this.$formOptions.attribute.hasOwnProperty("onSubmit"))&&eval(_this.$formOptions.attribute.onsubmit||_this.$formOptions.attribute.onSubmit),!0):!1}):console.error("No Form attributes has been provided")},Form.prototype.getValue=function(t){console.log()},Form.prototype.placeTheForm=function(t){if(this.$formOptions.hasOwnProperty("container")){var e=this.$formOptions.container;if(e.startsWith(".")){var i=document.getElementsByClassName(e.substring(1,e.length));i.length&&(this.$container=i,i[0].appendChild(t))}else if(e.startsWith("#"))this.$container=document.getElementById(e.substring(1,e.length)),this.$container.appendChild(t);else{var i=document.getElementsByTagName(e);i.length&&(this.$container=i,i[0].appendChild(t))}}},Form.prototype.createFields=function(t,e){var i,n=document.createElement(t);if(n.setAttribute("type","text"),this.$formOptions.fields.hasOwnProperty("common")){if(this.$formOptions.fields.common.attr)for(var r in this.$formOptions.fields.common.attr)n.setAttribute(r,this.$formOptions.fields.common.attr[r]);i=e.attr.hasOwnProperty("template")?e.attr.template:this.$formOptions.fields.common.hasOwnProperty("template")?this.$formOptions.fields.common.template:this.$replaceString}for(var r in e.attr)"name"===r&&this.$inputFieldsName.push(e.attr[r]),n.setAttribute(r,e.attr[r]);return{input:n,template:i}},Form.prototype.createElements=function(t,e,i){var n=document.createElement("div");return e&&(n.style.display="none",i&&n.setAttribute("id","errorLabelContainer_"+i)),t.forEach(function(t){var i=document.createElement(t.element||"div");for(var r in t.attr)i.setAttribute(r,t.attr[r]);i.innerHTML=t.value||e||"",n.appendChild(i)}),n},Form.prototype.buildChilds=function(){var t=this;if(this.$formOptions.hasOwnProperty("fields")&&this.$formOptions.fields.hasOwnProperty("fields")){var e,i=[],n=this;for(var r in this.$formOptions.fields.fields)switch(r){case"textarea":case"input":this.$formOptions.fields.fields[r].forEach(function(o){if(!Array.isArray(o.attr)){var a=document.createElement("temp"),s=t.createFields(r,o);o.before&&a.appendChild(t.createElements(o.before)),a.appendChild(s.input),t.$formOptions.fields.validationElement&&("submit"!=o.attr.type&&"Submit"!=o.attr.type?a.appendChild(t.createElements([t.$formOptions.fields.validationElement],"This Field is required",o.attr?o.attr.name:void 0)):s.input.setAttribute("name","submit")),o.after&&a.appendChild(t.createElements(o.after)),o.validation&&(n.$validator[o.attr.name]=o.validation);var m=s.template.replace(t.$replaceString,a.innerHTML);"submit"==o.attr.type||"Submit"===o.attr.type?e=m:i.push({index:o.rank||-1,data:m})}});break;case"select":this.$formOptions.fields.fields[r].forEach(function(e){var r=document.createElement("temp"),o=t.createFields("select",e);e.options.forEach(function(t){var e=document.createElement("option");for(var i in t.attr)e.setAttribute(i,t.attr[i]),e.innerHTML=t.text;o.input.appendChild(e)}),e.before&&r.appendChild(t.createElements(e.before)),e.validation&&(n.$validator[e.attr.name]=e.validation),r.appendChild(o.input),t.$formOptions.fields.validationElement&&r.appendChild(t.createElements([t.$formOptions.fields.validationElement],"This Field is required",e.attr?e.attr.name:void 0)),e.after&&r.appendChild(t.createElements(e.after));var a=o.template.replace(t.$replaceString,r.innerHTML);i.push({index:e.rank||-1,data:a})});break;case"checkbox":case"radio":this.$formOptions.fields.fields[r].forEach(function(e){var o=r;e.name&&t.$inputFieldsName.push(e.name);var a=document.createElement("temp");e.before&&a.appendChild(t.createElements(e.before)),e.fields.forEach(function(t){var i=(document.createElement("temp"),document.createElement("input"));i.setAttribute("type",o),e.name&&i.setAttribute("name",e.name||""),e["class"]&&i.setAttribute("class",e["class"]);for(var n in t)"text"!=n&&i.setAttribute(n,t[n]);if(a.appendChild(i),t.text){var r=document.createElement("span");r.innerHTML=t.text,a.appendChild(r)}else{var r=document.createElement("span");r.innerHTML=t.value,a.appendChild(r)}}),t.$formOptions.fields.validationElement&&a.appendChild(t.createElements([t.$formOptions.fields.validationElement],"This Field is required",e.attr?e.attr.name:void 0)),e.validation&&(n.$validator[e.attr.name]=e.validation),e.after&&a.appendChild(t.createElements(e.after));var s=e.template?e.template:t.$formOptions.fields.common.hasOwnProperty("template")?t.$formOptions.fields.common.template:t.$replaceString,m=s.replace(t.$replaceString,a.innerHTML);i.push({index:e.rank||-1,data:m})})}var o=Utils.sorter(i);this.$form.innerHTML="",Utils.reArrange(o).forEach(function(e){t.$form.innerHTML=t.$form.innerHTML+e.data}),this.$form.innerHTML=this.$form.innerHTML+e}},Form.prototype.buildForm=function(){var t=document.createElement("form");return void 0===this.$formOptions?console.error("Form options are not setup"):(this.$formOptions.hasOwnProperty("attribute")&&"object"==typeof this.$formOptions.attribute&&(this.$name=this.$formOptions.attribute.name||"form_"+Date.now(),this.$formOptions.attribute.name=this.$name,this.setAttributes(this.$formOptions.attribute,t)),this.$form=t,t)},Form.prototype.setAttributes=function(t,e){for(var i in t)e.setAttribute(i,t[i])},Form.prototype.attachListener=function(t){this.$inputFieldsName.forEach(function(e){return t.prototype[e]=new Object}),this.$callback=new t},Form.prototype.observer=function(t){var e=[8,37,38,39,40,18,91,32,16,20,9,27];-1===e.indexOf(t.event.keyCode)&&this.$callback.__proto__.hasOwnProperty(t.emitter)&&this.$callback.__proto__[t.emitter].hasOwnProperty(t.eventType)&&(this.validationWatcher(t),this.$callback.__proto__[t.emitter][t.eventType]({input:t.emitter,value:t.value,form:t.form,event:t.event}))},Form.prototype.validationWatcher=function(t,e,i){if(void 0===e&&(e=void 0),void 0===i&&(i=void 0),this.$validator.hasOwnProperty(t.emitter)){e||(e={},e[t.emitter]=this.$validator[t.emitter]),i||(i={},i[t.emitter]=t.value);var n=new Validator(i,e),r=document.getElementById("errorLabelContainer_"+t.emitter);return n.passes()?(r.style.display="none",r.firstChild.innerHTML="",document.forms[this.$name].submit.disabled=!1,!0):(r.style.display="block",r.firstChild.innerHTML=n.first(t.emitter),document.forms[this.$name].submit.disabled=!0,!1)}return!0},Form.prototype.attachEvents=function(){var t=this,e=["onkeyup","onkeydown","onmouseover","onmousedown","onclick","onfocus","onmouseenter","onmouseleave","onmousemove","onmousewheel"],i=this;this.$inputFieldsName.forEach(function(n){document.forms[t.$name][n].onblur=function(e){t.validationWatcher({emitter:n,value:document.forms[i.$name][n].value,event:e})},e.forEach(function(e){document.forms[t.$name][n][e]=function(t){i.observer({eventType:e,emitter:n,form:i.$name,value:document.forms[i.$name][n].value,event:t})}})})},Form}();alert("samundra kc ");