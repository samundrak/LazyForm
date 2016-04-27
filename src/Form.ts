class Form {
	formOptions: any;
	form: Element;
	container: any;
	setFormOptions(options: any): void {
		this.formOptions = options;
	}

	getRawHTML(){
		return this.container.innerHTML;
	}
	getContainer(){
		return this.container;
	}
	create(fields: any): void {
		if (!this.formOptions) {
			console.warn("Form options must be set, to set form options you can call setFormOptions method");
			return;
		}
		var form = this.buildForm();
		this.placeTheForm(form);
		this.buildChilds();
	}

	private placeTheForm(form: any): void {
		if (!this.formOptions.hasOwnProperty('container')) return;
		var container = this.formOptions.container;
		if (container.startsWith('.')) {
			// console.log('This is class');
			var tagName: NodeListOf<Element> = document
				.getElementsByClassName(container.substring(1, container.length))
			if (tagName.length) {
				this.container = tagName;
				tagName[0].appendChild(form);
			}
		}
		else if (container.startsWith('#')) {
			// console.log('This is id');
			this.container = document.getElementById(container.substring(1, container.length));
			this.container.appendChild(form);
		} else {
			// console.log('this is element');
			var tagName: NodeListOf<Element> = document.getElementsByTagName(container);
			if (tagName.length) {
				this.container = tagName;
				tagName[0].appendChild(form);
			};
		}

		console.log(form)

	}

	private createFields(tagName:string,item:any):any{
		var input = document.createElement(tagName);
						var template: any;
		input.setAttribute('type', 'text');
		if (this.formOptions.fields.hasOwnProperty('common')) {
			if (this.formOptions.fields.common.attr) {
				for (var key in this.formOptions.fields.common.attr) {
					input.setAttribute(key, this.formOptions.fields.common.attr[key]);
				}
			}
			template = item.attr.hasOwnProperty('template') ? item.attr.template : this.formOptions.fields.common.hasOwnProperty('template') ? this.formOptions.fields.common.template : '{{input}}';
		}
		for (var key in item.attr) {
			input.setAttribute(key, item.attr[key]);
		}
		return {input:input,template:template};
	}
	private buildChilds():void {
		if (!this.formOptions.hasOwnProperty('fields')) return;
		if (!this.formOptions.fields.hasOwnProperty('fields')) return;
		var submitButton: string;
		var childElements: any[] = [];
		for (var key in this.formOptions.fields.fields) {
			// var field = document.createElement("input");
			switch (key) {
				case 'input':
					this.formOptions.fields.fields[key].forEach((item: any) => {
						if (Array.isArray(item.attr)) return;
						var tempElement = document.createElement('temp');
						var field = this.createFields('input', item);
						tempElement.appendChild(field.input);
						var changedItem = field.template.replace('{{input}}', tempElement.innerHTML); 
							if(item.attr.type == 'submit' || item.attr.type === 'Submit'){
								submitButton = changedItem;
							}else{
								childElements.push({ index: item.rank || -1,data:changedItem});
							}
					});
					break;
				case 'select':
					 this.formOptions.fields.fields[key].forEach((item:any)=>{
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
						var changedItem = field.template.replace('{{input}}', tempElement.innerHTML); 
						childElements.push({ index: item.rank || -1, data : changedItem });

					 });
					break;
				case 'radio':
				this.formOptions.fields.fields[key].forEach((item:any)=>{

				});
					break;
			}
		}
		childElements.forEach((item:any)=>{
			console.log(item.index)
			this.form.innerHTML = this.form.innerHTML + item.data;
		});
		this.form.innerHTML = this.form.innerHTML + submitButton;
	}
	private buildForm() {
		var form: any = document.createElement("Form");
		if (this.formOptions === undefined) return;
		if (this.formOptions.hasOwnProperty('attribute')) {
			if (typeof this.formOptions.attribute === 'object') {
				this.setAttributes(this.formOptions.attribute, form);
			}
		}
		this.form = form;
		return form;
	}

	private setAttributes(attr: any, form: any) {
		for (var key in attr) {
			form.setAttribute(key, attr[key]);
		}
	}

}