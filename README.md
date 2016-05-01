# LazyForm
Documentation will be available SOON!!
Dynamic Form builder
  ```
          var loginForm = {
            common: {
                template: '<li class="list-group-item "> $input  </li>',
                attr: {
                    required: true,
                    class: 'form-control',
                }
            },
            fields: {
                textarea : [{
                    rank:4,
                    attr:{
                        name :'description',
                        placeholder:'Enter more Details',

                    }
                }] ,
                input: [{
                    rank: 1,
                    before : [{
                        element: 'label',
                        attr :{},
                        value: 'Enter your username'
                    }],
                    after : [{ element: 'div',attr:{},value:''}],
                    attr: {
                        type: 'input',
                        name: 'username',
                        placeholder: 'Enter your username',
                    },
                    validation: 'req|min:2|max:10|alpha|num'

                }, {
                    rank:1,
                    attr: {
                        type: 'password',
                        placeholder: 'Enter your password',
                        name: 'password',
                    }
                }, {
                    rank: 3,
                    attr: {
                        type: 'email',
                        template: '<div class="label label-default">Email</div> <li class="list-group-item ">  $input </li>',
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
                    rank: 1,
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
                    template: '<li class="list-group-item"> What is ur sex? $input </li>',
                    name: 'sex',
                    fields: [{ value: 'male ', text: 'Male ' }, { value: 'female ', text: 'Female ' }]
                }],
                checkbox: [{
                    rank: 5,
                    template: '<li class="list-group-item"> What is ur sex? $input </li>',
                    name: 'interest',
                    fields: [{ value: 'male' }, { value: 'female ', text: 'Female ' }]
                }],

            }

        }


        var form = new Form();
        form.setFormOptions({
            fields: loginForm,
            attribute: {
                name: 'samundra',
                method: 'GET',
                onSubmit: 'alert()'
            },
            container: "#formHere"
        });

        form.create(loginForm);
        form.attachListener(function(){

            this.onkeyup = function(event){
                // console.log(event.emitter + " " + event.value);
                console.log(event.emitter + " " + event.value)
            }

            this.onmouseover =  function(options){
                console.log(options)
            }

        });
