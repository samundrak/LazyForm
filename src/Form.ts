Array.prototype.insert = function(index, item) {
	this.splice(index, 0, item);
}
class Form {
	$formOptions: any;
	$form: Element;
	$container: any;
	$replaceString: string = "$input";
	$submitCallback :any = undefined;
	$name: string = undefined;
	$inputFieldsName: string[] = [];
	setFormOptions(options: any): void {
		this.$formOptions = options;
	}

	getRawHTML = ():string => this.$container.innerHTML;
	
	getInputValue(key:string):string{
		if(this.$inputFieldsName.indexOf(key) === -1) {
			console.warn("This key("+key+") is not available");
			return;
		}
		return document.forms[this.$name][key].value;
	}
	getAllInputDom():string[]{
		var allInputValues = [];
		this.$inputFieldsName.forEach((item) => {
			allInputValues.push(document.forms[this.$name][item]);

		});
		return allInputValues;
	}
	getInputDom(key:string):string{
		if (this.$inputFieldsName.indexOf(key) === -1) {
			console.warn("This key(" + key + ") is not available");
			return;
		}
		return document.forms[this.$name][key];
	}
	getAllInputValue():any{
		var allInputValues = {};
		this.$inputFieldsName.forEach((item)=>{
			allInputValues[item] = document.forms[this.$name][item].value;
		});
		return allInputValues;
	}
	getContainer(){
		return this.$container;
	}
	create(fields: any): void {
		if (!this.$formOptions) {
			console.warn("Form options must be set, to set form options you can call set$formOptions method");
			return;
		}
		var form = this.buildForm();
		this.placeTheForm(form);
		this.buildChilds();
	}
	getValue(name:string){
		console.log()
	}
	private placeTheForm(form: any): void {
		if (!this.$formOptions.hasOwnProperty('container')) return;
		var container = this.$formOptions.container;
		if (container.startsWith('.')) {
			// console.log('This is class');
			var tagName: NodeListOf<Element> = document
				.getElementsByClassName(container.substring(1, container.length))
			if (tagName.length) {
				this.$container = tagName;
				tagName[0].appendChild(form);
			}
		}
		else if (container.startsWith('#')) {
			// console.log('This is id');
			this.$container = document.getElementById(container.substring(1, container.length));
			this.$container.appendChild(form);
		} else {
			// console.log('this is element');
			var tagName: NodeListOf<Element> = document.getElementsByTagName(container);
			if (tagName.length) {
				this.$container = tagName;
				tagName[0].appendChild(form);
			};
		}

		console.log(form)

	}

	private createFields(tagName:string,item:any):any{
		var input = document.createElement(tagName);
						var template: any;
		input.setAttribute('type', 'text');
		if (this.$formOptions.fields.hasOwnProperty('common')) {
			if (this.$formOptions.fields.common.attr) {
				for (var key in this.$formOptions.fields.common.attr) {
					input.setAttribute(key, this.$formOptions.fields.common.attr[key]);

				}
			}
			template = item.attr.hasOwnProperty('template') ? item.attr.template : this.$formOptions.fields.common.hasOwnProperty('template') ? this.$formOptions.fields.common.template : this.$replaceString;
		}
		for (var key in item.attr) {
			if (key === 'name') {
				this.$inputFieldsName.push(item.attr[key]);
			}
			input.setAttribute(key, item.attr[key]);
		}
		return {input:input,template:template};
	}
	private buildChilds():void {
		if (!this.$formOptions.hasOwnProperty('fields')) return;
		if (!this.$formOptions.fields.hasOwnProperty('fields')) return;
		var submitButton: string;
		var childElements: any[] = [];
		for (var key in this.$formOptions.fields.fields) {
			// var field = document.createElement("input");
			switch (key) {
				case 'input':
					this.$formOptions.fields.fields[key].forEach((item: any) => {
						if (Array.isArray(item.attr)) return;
						var tempElement = document.createElement('temp');
						var field = this.createFields('input', item);
						tempElement.appendChild(field.input);
						var changedItem = field.template.replace(this.$replaceString, tempElement.innerHTML); 
							if(item.attr.type == 'submit' || item.attr.type === 'Submit'){
								submitButton = changedItem;
							}else{
								childElements.push({ index: item.rank || -1,data:changedItem});
							}
					});
					break;
				case 'select':
					 this.$formOptions.fields.fields[key].forEach((item:any)=>{
						 var tempElement = document.createElement('temp');
						 var field = this.createFields('select', item);
						 item.options.forEach( (option:any)=>{
							 var tempOption = document.createElement('option');
							 for(var key  in option.attr){
								 tempOption.setAttribute(key, option.attr[key]);
								 tempOption.innerHTML = option.text;
							 }
							 field.input.appendChild(tempOption);
						 });
						 tempElement.appendChild(field.input);
						 var changedItem = field.template.replace(this.$replaceString, tempElement.innerHTML); 
						childElements.push({ index: item.rank || -1, data : changedItem });

					 });
					break;
				case 'checkbox':
				case 'radio':
				this.$formOptions.fields.fields[key].forEach((item:any)=>{
					var radios: any[] = [];
					var masterKey:string = key;
					if (item.name) {
						this.$inputFieldsName.push(item.name);
					}
					var tempRadioButtonHolder: Element = document.createElement('temp');
							item.fields.forEach((radio:any)=>{
								var tempElement = document.createElement('temp');
								var field = document.createElement('input');
								field.setAttribute('type', masterKey);
									if(item.name) field.setAttribute('name', item.name||'');
									if(item.class) field.setAttribute('class', item.class );
								for(var key in radio){
									field.setAttribute(key, radio[key]);
								}
								// tempElement.appendChild(field);
								tempRadioButtonHolder.appendChild(field);
								// radios.push(tempElement.innerHTML);
							});
							var template = item.template ? item.template : this.$formOptions.fields.common.hasOwnProperty('template') ? this.$formOptions.fields.common.template : this.this.$replaceString;
							var changedItem = template.replace(this.$replaceString, tempRadioButtonHolder.innerHTML);
							childElements.push({ index: item.rank || -1, data: changedItem });
				});
					break;
			}
		}
		var sortedChildElements:any = [];
		childElements.forEach((item:any)=>{
			var index = item.index < 0 ? childElements.length  : item.index; 
			sortedChildElements.insert(index,item.data);
		});
		sortedChildElements.forEach((item:any)=>{
			this.$form.innerHTML = this.$form.innerHTML + item;
		});
		this.$form.innerHTML = this.$form.innerHTML + submitButton;
	}
	private buildForm() {
		var form: any = document.createElement("Form");
		if (this.$formOptions === undefined) return;
		if (this.$formOptions.hasOwnProperty('attribute')) {
			if (typeof this.$formOptions.attribute === 'object') {
				// if(this.)
				this.setAttributes(this.$formOptions.attribute, form);
				this.$name = this.$formOptions.attribute.name || Date.now();
			}
		}
		this.$form = form;
		return form;
	}

	private setAttributes(attr: any, form: any) {
		for (var key in attr) {
			form.setAttribute(key, attr[key]);
		}
	}

}