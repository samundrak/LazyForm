Array.prototype.insert=function(t,e){this.splice(t,0,e)};var Form=function(){function t(){var t=this;this.$replaceString="$input",this.$submitCallback=void 0,this.$name=void 0,this.$inputFieldsName=[],this.getRawHTML=function(){return t.$container.innerHTML}}return t.prototype.setFormOptions=function(t){this.$formOptions=t},t.prototype.setInputValue=function(t,e){-1!==this.$inputFieldsName.indexOf(t)&&(document.forms[this.$name][t].value=e)},t.prototype.getInputValue=function(t){return-1===this.$inputFieldsName.indexOf(t)?void console.warn("This key("+t+") is not available"):document.forms[this.$name][t].value},t.prototype.getAllInputDom=function(){var t=this,e=[];return this.$inputFieldsName.forEach(function(n){e.push(document.forms[t.$name][n])}),e},t.prototype.getInputDom=function(t){return-1===this.$inputFieldsName.indexOf(t)?void console.warn("This key("+t+") is not available"):document.forms[this.$name][t]},t.prototype.getAllInputValue=function(){var t=this,e={};return this.$inputFieldsName.forEach(function(n){e[n]=document.forms[t.$name][n].value}),e},t.prototype.getContainer=function(){return this.$container},t.prototype.create=function(t){if(!this.$formOptions)return void console.warn("Form options must be set, to set form options you can call set$formOptions method");var e=this.buildForm();this.placeTheForm(e),this.buildChilds()},t.prototype.getValue=function(t){console.log()},t.prototype.placeTheForm=function(t){if(this.$formOptions.hasOwnProperty("container")){var e=this.$formOptions.container;if(e.startsWith(".")){var n=document.getElementsByClassName(e.substring(1,e.length));n.length&&(this.$container=n,n[0].appendChild(t))}else if(e.startsWith("#"))this.$container=document.getElementById(e.substring(1,e.length)),this.$container.appendChild(t);else{var n=document.getElementsByTagName(e);n.length&&(this.$container=n,n[0].appendChild(t))}console.log(t)}},t.prototype.createFields=function(t,e){var n,i=document.createElement(t);if(i.setAttribute("type","text"),this.$formOptions.fields.hasOwnProperty("common")){if(this.$formOptions.fields.common.attr)for(var r in this.$formOptions.fields.common.attr)i.setAttribute(r,this.$formOptions.fields.common.attr[r]);n=e.attr.hasOwnProperty("template")?e.attr.template:this.$formOptions.fields.common.hasOwnProperty("template")?this.$formOptions.fields.common.template:this.$replaceString}for(var r in e.attr)"name"===r&&this.$inputFieldsName.push(e.attr[r]),i.setAttribute(r,e.attr[r]);return{input:i,template:n}},t.prototype.buildChilds=function(){var t=this;if(this.$formOptions.hasOwnProperty("fields")&&this.$formOptions.fields.hasOwnProperty("fields")){var e,n=[];for(var i in this.$formOptions.fields.fields)switch(i){case"input":this.$formOptions.fields.fields[i].forEach(function(i){if(!Array.isArray(i.attr)){var r=document.createElement("temp"),o=t.createFields("input",i);r.appendChild(o.input);var s=o.template.replace(t.$replaceString,r.innerHTML);"submit"==i.attr.type||"Submit"===i.attr.type?e=s:n.push({index:i.rank||-1,data:s})}});break;case"select":this.$formOptions.fields.fields[i].forEach(function(e){var i=document.createElement("temp"),r=t.createFields("select",e);e.options.forEach(function(t){var e=document.createElement("option");for(var n in t.attr)e.setAttribute(n,t.attr[n]),e.innerHTML=t.text;r.input.appendChild(e)}),i.appendChild(r.input);var o=r.template.replace(t.$replaceString,i.innerHTML);n.push({index:e.rank||-1,data:o})});break;case"checkbox":case"radio":this.$formOptions.fields.fields[i].forEach(function(e){var r=i;e.name&&t.$inputFieldsName.push(e.name);var o=document.createElement("temp");e.fields.forEach(function(t){var n=(document.createElement("temp"),document.createElement("input"));n.setAttribute("type",r),e.name&&n.setAttribute("name",e.name||""),e["class"]&&n.setAttribute("class",e["class"]);for(var i in t)"text"!=i&&n.setAttribute(i,t[i]);if(o.appendChild(n),t.text){var s=document.createElement("span");s.innerHTML=t.text,o.appendChild(s)}else{var s=document.createElement("span");s.innerHTML=t.value,o.appendChild(s)}});var s=e.template?e.template:t.$formOptions.fields.common.hasOwnProperty("template")?t.$formOptions.fields.common.template:t.$replaceString,a=s.replace(t.$replaceString,o.innerHTML);n.push({index:e.rank||-1,data:a})})}var r=[];n.forEach(function(t){var e=t.index<0?n.length:t.index;r.insert(e,t.data)}),r.forEach(function(e){t.$form.innerHTML=t.$form.innerHTML+e}),this.$form.innerHTML=this.$form.innerHTML+e}},t.prototype.buildForm=function(){var t=document.createElement("Form");if(void 0!==this.$formOptions)return this.$formOptions.hasOwnProperty("attribute")&&"object"==typeof this.$formOptions.attribute&&(this.setAttributes(this.$formOptions.attribute,t),this.$name=this.$formOptions.attribute.name||Date.now()),this.$form=t,t},t.prototype.setAttributes=function(t,e){for(var n in t)e.setAttribute(n,t[n])},t}();