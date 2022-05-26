const Validator = (() => {
    const inputs = Array.from(document.querySelectorAll('input'));
    const submitButton = document.querySelector('button');
    const header = document.querySelector('h1');

    //Add event listeners for input change and validity to all inputs.
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            
            validate(input);
        });
    });

    //Change header text if all inputs become valid or invalid.
    submitButton.addEventListener('click', () => {
        let validInputs = 0;
        inputs.forEach(input => {   
            if (input.validity.valid) {
                validInputs ++;
            }
        }); 
        if (validInputs === 5) {
            header.innerText = 'Congrats!';
        } else {
            header.innerText = 'Try again!';
        }
    });

    //Valid input field based on type.
    const validate = (input) => {

        const label = document.querySelector(`label[for="${input.id}"]`);

        if (input.value === '') {
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

//Change backdrop style based on correct inputs.
const imageFilter = (() => {
    const image = document.getElementById('backdrop');

    const inputs = Array.from(document.querySelectorAll('input'));

    let amountValid = 0;
    
    //Set animation length in seconds for JS and CSS.
    const anilength = 1;
    let root = document.documentElement;
    root.style.setProperty('--anilength', `${anilength}s`);

    //Check validity of all inputs on input input.
    //Animate backdrop based on amount that are valid.
    inputs.forEach(input => {
        input.addEventListener('input', () => {

            //Rest check for valid inputs.
            amountValid = 0;

            inputs.forEach(input => {
                if (input.validity.valid) {
                    amountValid ++;
                }
            });
            updateImage();
        });
    });

    //Animate the backdrop image based on valid inputs.
    const updateImage = () => {
        console.log(image.src.endsWith('filtered.png'));
        if (amountValid < 2) {
            
            if (image.src.endsWith('filtered.png')) {
                return;
            } else {
                blurImage();
                setTimeout(() => {
                    image.src = 'images/filtered.png';
                }, anilength * 500);
            }
        } else if (amountValid >= 2 && amountValid < 3) {
            if (image.src.endsWith('oil.png')) {
                return;
            } else {
                blurImage();
                setTimeout(() => {
                    image.src = 'images/oil.png';
                }, anilength * 500);
            }
            
        } else if (amountValid >= 3 && amountValid < 5) {
            if (image.src.endsWith('cubism.png')) {
                return;
            } else {
                blurImage();
                setTimeout(() => {
                    image.src = 'images/cubism.png';
                }, anilength * 500);
            }
            
        } else {
            if (image.src.endsWith('backdrop.png')) {
                return;
            } else {
                blurImage();
                setTimeout(() => {
                    image.src = 'images/backdrop.png';
                }, anilength * 500);
            }
        }
    }

    const blurImage = () => {
        image.classList.add('backdropchange');
        setTimeout(() => {
          image.classList.remove('backdropchange');
        }, anilength * 1000);
    }

})();