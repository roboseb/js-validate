const Validator = (() => {
    const inputs = Array.from(document.querySelectorAll('input'));
    
    console.log(inputs);

    //Add event listeners for input change and validity to all inputs.
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            
            validate(input);
        });
    });

    //Valid input field based on type.
    const validate = (input) => {

        const label = document.querySelector(`label[for="${input.id}"]`);

        if (input.value === '') {
            console.log('empty')
            input.setCustomValidity(`${label.innerText} field is required.`);
            input.reportValidity();
            return;
        }


        if (input.id === 'email') {

            //Regex expression representing format x@y.z
            const regex  = /\b([A-z|0-9]+)@([A-z|0-9]+)[.]([A-z|0-9]+)\b/;

            //Display a message for input not matching format.
            if (!regex.test(input.value)) {
                errorMessage = "Email must be in the format 'a@b.c'";
                input.setCustomValidity(errorMessage);
            //Reset to valid if email matches regex.
            } else {
                input.setCustomValidity('');
            }
        }

        if (input.id === 'country') {
            input.setCustomValidity('');
        }

        if (input.id === 'zip') {

            //Regex expression representing format a1b2c3
            const regex  = /\b[A-z]{1}[0-9]{1}[A-z]{1}\s*[0-9]{1}[A-z]{1}[0-9]{1}\b/;

            //Display a message for input not matching format.
            if (!regex.test(input.value)) {
                errorMessage = "Postal code must be in the format a1b2c3, case insensitive.";
                input.setCustomValidity(errorMessage);
            //Reset to valid if postal code matches regex.
            } else {
                input.setCustomValidity('');
            }
        }

        if (input.id === 'pass' || input.id === 'passconfirm') {

            //Regex expression representing format a1b2c3
            const regex  = /(?=.*[0-9])/;

            const pass1 = document.getElementById('pass');
            const pass2 = document.getElementById('passconfirm');

            //Display a message for input not matching format.
            if (!regex.test(input.value) || input.value.length < 5) {
                errorMessage = "Password must be at least 6 characters and contain a number.";
                input.setCustomValidity(errorMessage);
            //Reset to valid if password matches regex.
            } else if (pass1.value !== pass2.value && pass2.value !== '') {
                input.setCustomValidity('Passwords need to match.');
            } else {
                pass1.setCustomValidity('');
                pass2.setCustomValidity('');
            }
        }

        input.reportValidity();
    }


})();