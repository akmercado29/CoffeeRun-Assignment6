(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var noEmail = false;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');

        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });

            //Achievement modal
            if (data.size == 'Coffee-zilla' && data.flavor != '' && data.strength == '100') {
                $('#myModal').modal('show');

                document.getElementById('yes').addEventListener('click', function() {

                    if (data.emailAddress != '') {
                        $('#myModal').modal('hide');
                        $('#powerup-form').show();

                        console.log(data);
                        fn(data);

                        //resets label and intesity number color
                        $('#strengthLabel').html('Caffeine Rating: 30');
                        $('#strengthLabel').css('color', 'green');

                        this.reset();

                    } else {
                        $('#myModal').modal('hide');
                        if (noEmail == false) {
                            $('#emailError').modal('show');
                        }
                        noEmail = true;
                    }
                }.bind(this));

            } else {
                console.log(data);
                fn(data);
                this.reset();

                //resets label and intesity number color
                $('#strengthLabel').html('Caffeine Rating: 30');
                $('#strengthLabel').css('color', 'green');

                this.elements[0].focus();
            }
        });
    };

    //Silver Challenge from Chapter 10
    FormHandler.prototype.addSlideHandler = function() {
        var range = $('#strengthLevel');
        var label = $('#strengthLabel');

        this.$formElement.on('input', range, function() {
            label.html('Caffeine Rating: ' + range.val());

            if (range.val() < 34) {
                label.css('color', 'green');
            } else if (range.val() > 33 && range.val() < 67) {
                label.css('color', 'yellow');
            } else if (range.val() > 66) {
                label.css('color', 'red');
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
