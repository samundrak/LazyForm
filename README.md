# LazyForm
Documentation will be available SOON!!
Dynamic Form builder
  ```
  var loginForm = {
      common: {
          template: '<li class="list-group-item "> {{input}} </li>',
          attr: {
              required: true,
              class: 'form-control',
          }
      },
      fields: {

        input: [{
            rank: 1,
            attr: {
                type: 'input',
                name: 'username',
                placeholder: 'Enter your username',
            }

        }, {
            rank: 2,
            attr: {
                type: 'password',
                placeholder: 'Enter your password',
                name: 'password',
            }
        }, {
            rank: 3,
            attr: {
            type: 'email',
                template: '<div class="label label-default">Email</div> <li class="list-group-item ">  {{input}} </li>',
                placeholder: 'Enter your email',
                name: 'email',
            }
        }, {
            rank: 5,
            attr: {
                type: 'submit',
                value: 'Submit',
                class: 'btn btn-primary'
            }
        }],
        select: [{
            rank: 4,
            attr: {
                name: 'select'
            },
            options: [
                { attr: { value: 'samundra' }, text: 'samundra' },
                { attr: { value: 'salman' }, text: 'salman' }
            ]
        }],
        radio: [{
            rank: 6,
            template: '<li class="list-group-item active"> What is ur sex? {{input}} </li>',
            name: 'sex',
            fields: [{ value: 'male' }, { value: 'female' }]
        }],

    }

    }
    
    
    var Form = new Form();
    Form.setFormOptions({
        fields: loginForm,
        attribute: {
            name: 'samundra',
            method: 'GET'
        },
        container: "#formHere"
    });
    
    Form.create(loginForm);
