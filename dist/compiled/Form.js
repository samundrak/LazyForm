Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
var Form = (function () {
    function Form() {
        var _this = this;
        this.$replaceString = "$input";
        this.$submitCallback = undefined;
        this.$name = undefined;
        this.$inputFieldsName = [];
        this.getForm = function () { return _this.$form; };
        this.getRawHTML = function () { return _this.$container.innerHTML; };
        this.$callback = undefined;
    }
    Form.prototype.setFormOptions = function (options) {
        this.$formOptions = options;
    };
    Form.prototype.setInputValue = function (key, value) {
        if (this.$inputFieldsName.indexOf(key) === -1)
            return;
        document.forms[this.$name][key].value = value;
    };
    Form.prototype.getInputValue = function (key) {
        if (this.$inputFieldsName.indexOf(key) === -1) {
            console.warn("This key(" + key + ") is not available");
            return;
        }
        return document.forms[this.$name][key].value;
    };
    Form.prototype.getAllInputDom = function () {
        var _this = this;
        var allInputValues = [];
        this.$inputFieldsName.forEach(function (item) {
            allInputValues.push(document.forms[_this.$name][item]);
        });
        return allInputValues;
    };
    Form.prototype.getInputDom = function (key) {
        if (this.$inputFieldsName.indexOf(key) === -1) {
            console.warn("This key(" + key + ") is not available");
            return;
        }
        return document.forms[this.$name][key];
    };
    Form.prototype.getAllInputValue = function () {
        var _this = this;
        var allInputValues = {};
        this.$inputFieldsName.forEach(function (item) {
            allInputValues[item] = document.forms[_this.$name][item].value;
        });
        return allInputValues;
    };
    Form.prototype.getContainer = function () {
        return this.$container;
    };
    Form.prototype.create = function (fields) {
        if (!this.$formOptions) {
            console.warn("Form options must be set, to set form options you can call set$formOptions method");
            return;
        }
        var form = this.buildForm();
        this.placeTheForm(form);
        this.buildChilds();
        this.attachEvents();
        document.forms[this.$name].onsubmit = function () {
            console.log('form submitted');
            return false;
        };
    };
    Form.prototype.getValue = function (name) {
        console.log();
    };
    Form.prototype.placeTheForm = function (form) {
        if (!this.$formOptions.hasOwnProperty('container'))
            return;
        var container = this.$formOptions.container;
        if (container.startsWith('.')) {
            // console.log('This is class');
            var tagName = document
                .getElementsByClassName(container.substring(1, container.length));
            if (tagName.length) {
                this.$container = tagName;
                tagName[0].appendChild(form);
            }
        }
        else if (container.startsWith('#')) {
            // console.log('This is id');
            this.$container = document.getElementById(container.substring(1, container.length));
            this.$container.appendChild(form);
        }
        else {
            // console.log('this is element');
            var tagName = document.getElementsByTagName(container);
            if (tagName.length) {
                this.$container = tagName;
                tagName[0].appendChild(form);
            }
            ;
        }
    };
    Form.prototype.createFields = function (tagName, item) {
        var input = document.createElement(tagName);
        var template;
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
        return { input: input, template: template };
    };
    Form.prototype.createElements = function (arrayOfElements, customMessage) {
        var tempDiv = document.createElement('div');
        if (customMessage) {
            tempDiv.style.display = 'none';
        }
        arrayOfElements.forEach(function (item) {
            var element = document.createElement(item.element || 'div');
            for (var key in item.attr) {
                element.setAttribute(key, item.attr[key]);
            }
            element.innerHTML = item.value || customMessage || '';
            tempDiv.appendChild(element);
        });
        return tempDiv;
    };
    Form.prototype.buildChilds = function () {
        var _this = this;
        if (!this.$formOptions.hasOwnProperty('fields'))
            return;
        if (!this.$formOptions.fields.hasOwnProperty('fields'))
            return;
        var submitButton;
        var childElements = [];
        for (var key in this.$formOptions.fields.fields) {
            // var field = document.createElement("input");
            switch (key) {
                case 'textarea':
                case 'input':
                    this.$formOptions.fields.fields[key].forEach(function (item) {
                        if (Array.isArray(item.attr))
                            return;
                        var tempElement = document.createElement('temp');
                        var field = _this.createFields(key, item);
                        if (item.before)
                            tempElement.appendChild(_this.createElements(item.before));
                        tempElement.appendChild(field.input);
                        if (_this.$formOptions.fields.validationElement) {
                            if (item.attr.type != 'submit' && item.attr.type != 'Submit') {
                                tempElement.appendChild(_this.createElements([_this.$formOptions.fields.validationElement], 'This Field is required'));
                            }
                        }
                        if (item.after)
                            tempElement.appendChild(_this.createElements(item.after));
                        var changedItem = field.template.replace(_this.$replaceString, tempElement.innerHTML);
                        if (item.attr.type == 'submit' || item.attr.type === 'Submit') {
                            submitButton = changedItem;
                        }
                        else {
                            childElements.push({ index: item.rank || -1, data: changedItem });
                        }
                    });
                    break;
                case 'select':
                    this.$formOptions.fields.fields[key].forEach(function (item) {
                        var tempElement = document.createElement('temp');
                        var field = _this.createFields('select', item);
                        item.options.forEach(function (option) {
                            var tempOption = document.createElement('option');
                            for (var key in option.attr) {
                                tempOption.setAttribute(key, option.attr[key]);
                                tempOption.innerHTML = option.text;
                            }
                            field.input.appendChild(tempOption);
                        });
                        if (item.before)
                            tempElement.appendChild(_this.createElements(item.before));
                        tempElement.appendChild(field.input);
                        if (_this.$formOptions.fields.validationElement) {
                            tempElement.appendChild(_this.createElements([_this.$formOptions.fields.validationElement], 'This Field is required'));
                        }
                        if (item.after)
                            tempElement.appendChild(_this.createElements(item.after));
                        var changedItem = field.template.replace(_this.$replaceString, tempElement.innerHTML);
                        childElements.push({ index: item.rank || -1, data: changedItem });
                    });
                    break;
                case 'checkbox':
                case 'radio':
                    this.$formOptions.fields.fields[key].forEach(function (item) {
                        var radios = [];
                        var masterKey = key;
                        if (item.name) {
                            _this.$inputFieldsName.push(item.name);
                        }
                        var tempRadioButtonHolder = document.createElement('temp');
                        if (item.before)
                            tempRadioButtonHolder.appendChild(_this.createElements(item.before));
                        item.fields.forEach(function (radio) {
                            var tempElement = document.createElement('temp');
                            var field = document.createElement('input');
                            field.setAttribute('type', masterKey);
                            if (item.name)
                                field.setAttribute('name', item.name || '');
                            if (item.class)
                                field.setAttribute('class', item.class);
                            for (var key in radio) {
                                if (key != 'text')
                                    field.setAttribute(key, radio[key]);
                            }
                            // tempElement.appendChild(field);
                            tempRadioButtonHolder.appendChild(field);
                            if (radio.text) {
                                var tempDiv = document.createElement('span');
                                tempDiv.innerHTML = radio.text;
                                tempRadioButtonHolder.appendChild(tempDiv);
                            }
                            else {
                                var tempDiv = document.createElement('span');
                                tempDiv.innerHTML = radio.value;
                                tempRadioButtonHolder.appendChild(tempDiv);
                            }
                            // radios.push(tempElement.innerHTML);
                        });
                        if (_this.$formOptions.fields.validationElement) {
                            tempRadioButtonHolder.appendChild(_this.createElements([_this.$formOptions.fields.validationElement], 'This Field is required'));
                        }
                        if (item.after)
                            tempRadioButtonHolder.appendChild(_this.createElements(item.after));
                        var template = item.template ? item.template : _this.$formOptions.fields.common.hasOwnProperty('template') ? _this.$formOptions.fields.common.template : _this.$replaceString;
                        var changedItem = template.replace(_this.$replaceString, tempRadioButtonHolder.innerHTML);
                        childElements.push({ index: item.rank || -1, data: changedItem });
                    });
                    break;
            }
        }
        var sortedChildElements = Utils.sorter(childElements);
        this.$form.innerHTML = '';
        Utils.reArrange(sortedChildElements).forEach(function (element) {
            _this.$form.innerHTML = _this.$form.innerHTML + element.data;
        });
        this.$form.innerHTML = this.$form.innerHTML + submitButton;
    };
    Form.prototype.buildForm = function () {
        var form = document.createElement("Form");
        form.onfocus = function (evt) {
            console.log(evt);
        };
        if (this.$formOptions === undefined)
            return;
        if (this.$formOptions.hasOwnProperty('attribute')) {
            if (typeof this.$formOptions.attribute === 'object') {
                this.setAttributes(this.$formOptions.attribute, form);
                this.$name = this.$formOptions.attribute.name || Date.now();
            }
        }
        this.$form = form;
        return form;
    };
    Form.prototype.setAttributes = function (attr, form) {
        for (var key in attr) {
            form.setAttribute(key, attr[key]);
        }
    };
    Form.prototype.attachListener = function (cb) {
        this.$inputFieldsName.forEach(function (item) { return cb.prototype[item] = new Object(); });
        this.$callback = new cb();
    };
    Form.prototype.observer = function (options) {
        var ignoreKeys = [8, 37, 38, 39, 40, 18, 91, 32, 16, 20, 9, 27];
        if (ignoreKeys.indexOf(options.event.keyCode) === -1) {
            if (this.$callback.__proto__.hasOwnProperty(options.emitter)
                && this.$callback.__proto__[options.emitter].hasOwnProperty(options.eventType)) {
                this.$callback.__proto__[options.emitter][options.eventType]({
                    input: options.emitter,
                    value: options.value,
                    form: options.form,
                    event: options.event
                });
            }
        }
    };
    Form.prototype.attachEvents = function () {
        var _this = this;
        var events = ['onkeyup', 'onkeydown', 'onmouseover', 'onmousedown', 'onclick', 'onfocus', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmousewheel'];
        var __this = this;
        this.$inputFieldsName.forEach(function (item) {
            events.forEach(function (eventType) {
                document.forms[_this.$name][item][eventType] = function (event) {
                    __this.observer({
                        eventType: eventType,
                        emitter: item,
                        form: __this.$name,
                        value: document.forms[__this.$name][item].value,
                        event: event
                    });
                };
            });
        });
    };
    return Form;
}());
