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

	getForm = () => this.$form;
	getRawHTML = ():string => this.$container.innerHTML;
	setInputValue(key: string, value: string):void{
		if (this.$inputFieldsName.indexOf(key) === -1) return;
		document.forms[this.$name][key].value = value;
	}	
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
		this.attachEvents();
		document.forms[this.$name].onsubmit = function() {
			console.log('form submitted');
			return false;
		}
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
	private createElements(arrayOfElements:any[],customMessage:string){
		var tempDiv = document.createElement('div');
		if(customMessage){
			tempDiv.style.display = 'none';
		}
		arrayOfElements.forEach(item=>{
			var element = document.createElement(item.element || 'div');
			for(var key in item.attr){
				element.setAttribute(key, item.attr[key]);
			}
			element.innerHTML = item.value || customMessage || '';
			tempDiv.appendChild(element);
		});

		return tempDiv;
	}
	private buildChilds():void {
		if (!this.$formOptions.hasOwnProperty('fields')) return;
		if (!this.$formOptions.fields.hasOwnProperty('fields')) return;
		var submitButton: string;
		var childElements: any[] = [];
		for (var key in this.$formOptions.fields.fields) {
			// var field = document.createElement("input");
			switch (key) {
				case 'textarea':
				case 'input':
					this.$formOptions.fields.fields[key].forEach((item: any) => {
						if (Array.isArray(item.attr)) return;
						var tempElement = document.createElement('temp');
						var field = this.createFields(key, item);
						if(item.before) tempElement.appendChild(this.createElements(item.before));
						tempElement.appendChild(field.input);
						if (this.$formOptions.fields.validationElement) {
							if (item.attr.type != 'submit' && item.attr.type != 'Submit'){
								tempElement.appendChild(this.createElements([this.$formOptions.fields.validationElement],'This Field is required'));
							}
						}
						if(item.after) tempElement.appendChild(this.createElements(item.after));
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
						 if(item.before)tempElement.appendChild(this.createElements(item.before));
						 tempElement.appendChild(field.input);
						 if (this.$formOptions.fields.validationElement) {
							 tempElement.appendChild(this.createElements([this.$formOptions.fields.validationElement], 'This Field is required'));
						 }
						 if(item.after) tempElement.appendChild(this.createElements(item.after));
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
					if (item.before) tempRadioButtonHolder.appendChild(this.createElements(item.before));
							item.fields.forEach((radio:any)=>{
								var tempElement = document.createElement('temp');
								var field = document.createElement('input');
								field.setAttribute('type', masterKey);
									if(item.name) field.setAttribute('name', item.name||'');
									if(item.class) field.setAttribute('class', item.class );
								for(var key in radio){
									if(key != 'text')
										field.setAttribute(key, radio[key]);
								}
								// tempElement.appendChild(field);
								tempRadioButtonHolder.appendChild(field);
								if(radio.text){
									var tempDiv = document.createElement('span');
									tempDiv.innerHTML = radio.text;
									tempRadioButtonHolder.appendChild(tempDiv);
								}else{
									var tempDiv = document.createElement('span');
									tempDiv.innerHTML = radio.value;
									tempRadioButtonHolder.appendChild(tempDiv);

								}
								// radios.push(tempElement.innerHTML);
							});
							if (this.$formOptions.fields.validationElement) {
								tempRadioButtonHolder.appendChild(this.createElements([this.$formOptions.fields.validationElement], 'This Field is required'));
							}
					if (item.after) tempRadioButtonHolder.appendChild(this.createElements(item.after));
							var template = item.template ? item.template : this.$formOptions.fields.common.hasOwnProperty('template') ? this.$formOptions.fields.common.template : this.$replaceString;
							var changedItem = template.replace(this.$replaceString, tempRadioButtonHolder.innerHTML);
							childElements.push({ index: item.rank || -1, data: changedItem });
				});
					break;
			}
		}
		var sortedChildElements: any = sorter(childElements);
		this.$form.innerHTML = '';
		reArrange(sortedChildElements).forEach(element=>{
				this.$form.innerHTML = this.$form.innerHTML + element.data;
		});
		this.$form.innerHTML = this.$form.innerHTML + submitButton;
	}
	private buildForm() {
		var form: any = document.createElement("Form");
		form.onfocus =  function(evt){
			console.log(evt);
		}
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
	$callback = undefined;
	attachListener(cb) {
		this.$callback = new  cb();
	}
	private observer(options){
		var ignoreKeys = [8, 37, 38, 39, 40, ,18,91,32,16, 20, 9, 27];
		if(ignoreKeys.indexOf(options.event.keyCode) === -1){
			if(this.$callback.hasOwnProperty(options.eventType)){
				// delete options.eventType;
				this.$callback[options.eventType]({
					input: options.emitter,
					value:options.value,
					form:options.form,
					event:options.event
				});
			}
		}
	}
	private attachEvents(){
		var events = ['onkeyup', 'onkeydown', 'onmouseover', 'onmousedown', 'onclick', 'onfocus', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmousewheel'];
		var __this = this;
		this.$inputFieldsName.forEach((item) => {
			events.forEach(eventType => {
			 document.forms[this.$name][item][eventType] = function(event){
				 __this.observer({
				 	 eventType,
					 emitter: item,
					 form: __this.$name,
					 value: document.forms[__this.$name][item].value,
					 event
				 	});
				 }
			});
		});
	}
}

function sorter(array){
	var tempObject = {};
	array.forEach((item,index)=>{
		if(item.index){
			if(tempObject.hasOwnProperty('index_'+item.index)){
				tempObject['index_' + item.index].push({ index: item.index,data: item.data } );
			}else{
				tempObject['index_' + item.index] = new Array();
				tempObject['index_' + item.index].push({index: item.index,data:item.data});
			}
		}else{
				tempObject['index_' + array.length+1] = new Array();
				tempObject['index_' + array.length+1].push({index:item.index,data:item.data});
		}
	});
	return tempObject;
}

function reArrange(tempObject){
	var sortedRanked = [];
	for(var key in tempObject){
		sortedRanked.push(tempObject[key][0].index);
	}
	sortedRanked.sort();
	var sortedElements = [];
	var isUnrankedIndex = false;
	sortedRanked.forEach(item	=>	{
		if(item != -1){
			tempObject['index_' + item].forEach( elements=>{
				sortedElements.push(elements);
			})
		}else{
			isUnrankedIndex = true;
		}
	});
	if(isUnrankedIndex){
		tempObject['index_-1'].forEach(item=>{
			sortedElements.push(item);
		})
	}
	return sortedElements;
}