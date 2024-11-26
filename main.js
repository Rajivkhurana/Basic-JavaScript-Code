// Get form elements by their IDs
var firstname = document.getElementById('firstName');
var lastname = document.getElementById('lastName');
var address = document.getElementById('address');
var city = document.getElementById('city');
var state = document.getElementById('state');
var pin = document.getElementById('pincode');
var genderM = document.getElementById('gender_male');
var genderF = document.getElementById('gender_female');
var hobbyG = document.getElementById('hobby_game');
var hobbyS = document.getElementById('hobby_song');
var dob = document.getElementById('dob');
var phone = document.getElementById('mobile');
var email = document.getElementById('email');
var tbody = document.getElementById('tbody');

// Get error message elements by their IDs
const firstNameError = document.getElementById('firstNameError');
const lastNameError = document.getElementById('lastNameError');
const addressError = document.getElementById('addressError');
const cityError = document.getElementById('cityError');
const stateError = document.getElementById('stateError');
const pincodeError = document.getElementById('pincodeError');
const genderError = document.getElementById('genderError');
const dobError = document.getElementById('dobError');
const hobbyError = document.getElementById('hobbyError');
const mobileError = document.getElementById('mobileError');
const emailError = document.getElementById('emailError');

var validationActive = true;

// Add event listeners for input validation
function afterSaveValidation() {
    firstname.addEventListener('blur', function() {
        if(validationActive) {
            firstNameError.innerHTML = '';
            blankFname();
        }
    });

    lastname.addEventListener('blur', function() {
        if(validationActive) {
            lastNameError.innerHTML = '';
            blankLname(); 
        }
    });

    address.addEventListener('blur', function() {
        if(validationActive) {
            addressError.innerHTML = '';
            blankAddress();
        }
    });

    city.addEventListener('change', function() {
        cityError.innerHTML = '';
        blankCity();
    });

    state.addEventListener('change', function() {
        stateError.innerHTML = '';
        blankState();
    });

    pin.addEventListener('blur', function() {
        if(validationActive) {
            pincodeError.innerHTML = '';
            blankPin();
        }
    });

    dob.addEventListener('change', function() {
        if(validationActive) {
            dobError.innerHTML = '';
            checkDob();
        }
    });

    genderM.addEventListener('change', function() {
        if(validationActive) {
            genderError.innerHTML = '';
            blankGender();
        }
    });

    genderF.addEventListener('change', function() {
        if(validationActive) {
            genderError.innerHTML = '';
            blankGender();
        }
    });

    phone.addEventListener('blur', function() {
        if(validationActive) {
            mobileError.innerHTML = '';
            blankPhone();            
        }
    });

    email.addEventListener('blur', function() {
        if(validationActive) {
            emailError.innerHTML = '';
            verifyEmail1();
        }
    });

    hobbyG.addEventListener('change', function() {
        if(validationActive) {
            hobbyError.innerHTML = '';
            blankHobby();
        }
    });

    hobbyS.addEventListener('change', function() {
        if(validationActive) {
            hobbyError.innerHTML = '';
            blankHobby();
        }
    });
}

// Function to handle form submission
function submitForm(e) {
    // Check all validation functions
    const isValid = [
        blankFname(),
        blankLname(),
        blankAddress(),
        blankCity(),
        blankState(),
        blankPin(),
        checkDob(),
        blankGender(),
        blankHobby(),
        verifyEmail1(),
        blankPhone()
    ].every(Boolean);
    
    afterSaveValidation();
    if (isValid) {
        saveAll();
        clearAll();
        validationActive = false; 
    } else {
        validationActive = true;
    }
}

// Save form data to a new row in the table
function saveAll() {
    var newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${firstname.value}</td>
    <td>${lastname.value}</td>
    <td>${address.value}</td>
    <td>${city.value}</td>
    <td>${state.value}</td>
    <td>${pin.value}</td>
    <td>${genderSelector()}</td>
    <td>${hobbiesSelector()}</td>
    <td>${dob.value}</td>
    <td>${phone.value}</td>
    <td>${email.value}</td>`;
    tbody.appendChild(newRow);

    // Display success message
    var message = document.getElementById('saveMessage');
    message.innerHTML = 'Saved Successfully';
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}

// Determine selected gender
function genderSelector() {
    if (genderM.checked) {
        return 'male';
    }
    if (genderF.checked) {
        return 'female';
    }
    return "please select a gender";
}

// Determine selected hobbies
function hobbiesSelector() {
    if (hobbyG.checked && hobbyS.checked) {
        return 'games and listen songs';
    }
    if (hobbyG.checked) {
        return 'games';
    }
    if (hobbyS.checked) {
        return "listen songs";
    }
    return 'Nothing Selected';
}

// Validate first name
function blankFname() {
    const message = document.getElementById('firstNameError');
    message.innerHTML = '';
    if(validateTextField('#firstName', '#firstNameError', 'First name is required.', /^[a-zA-Z]+$/)) {
        return true;
    }
}

// Validate last name
function blankLname() {
    const lnamemessage = document.getElementById('lastNameError');
    lnamemessage.innerHTML = '';
    if(validateTextField('#lastName', '#lastNameError', 'Last name is required.', /^[a-zA-Z]+$/)) {
        return true;
    }
}

// Validate address
function blankAddress() {    
    if(validateTextField('#address', '#addressError', 'Address is required.', /^[^@#$%^*{}[\]~`]+$/)) {
        return true;
    }   
}

// Validate city
function blankCity() {
    if(validateTextField('#city', '#cityError', 'City is required.')) {
        return true;
    } 
}

// Validate state
function blankState() {
    if(validateTextField('#state', '#stateError', 'State is required.')) {
        return true;
    }
}

// Validate pincode
function blankPin() {
    return(validateNumericField('#pincode', '#pincodeError', 'Pincode is required.', 6));
}

// Validate phone number
function blankPhone() {
    return(validateNumericField('#mobile', '#mobileError', 'Phone number is required.', 10));
}

// Validate date of birth
function checkDob() {
    const dob = document.getElementById('dob');
    const dobmsg = document.getElementById('dobError');
    const selectedDate = new Date(dob.value);
    const minDate = new Date('1900-01-01');

    dobmsg.innerHTML = '';

    if (dob.value === "" || dob.value === null) {
        dobmsg.innerHTML = 'Birthdate is required.';
        return false;
    }
    if (selectedDate > Date.now()) {
        dobmsg.innerHTML = 'Birthdate should not be in the future.';
        return false;
    }
    if (selectedDate < minDate) {
        dobmsg.innerHTML = 'Birthdate should be after 1 January 1900.';
        return false;
    }
    return true;
}

// Validate gender selection
function blankGender() {
    const genderMale = document.getElementById("gender_male");
    const genderFemale = document.getElementById("gender_female");
    const genderError = document.getElementById('genderError');
    genderError.innerHTML = '';
    if (!genderMale.checked && !genderFemale.checked) {
        genderError.innerHTML = 'Please select a gender.';
        return false;
    }
    return true;
}

// Validate hobby selection
function blankHobby() {
    const hobbyG = document.getElementById('hobby_game');
    const hobbyS = document.getElementById('hobby_song');
    const hobbyError = document.getElementById('hobbyError');
    hobbyError.innerHTML = '';
    if (!hobbyG.checked && !hobbyS.checked) {
        hobbyError.innerHTML = 'Please select a hobby.';
        return false;
    }
    return true;
}

// Validate email address
function verifyEmail1() {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i; 
    return validateTextField("#email", "#emailError", "Email is required.", emailPattern);
}

// Basic validation for required fields
function validateRequiredField(selector, errorSelector, errorMessage) {
    const element = document.querySelector(selector);
    const value = element.value;
    if (element.tagName === 'SELECT') {
        if (value === "" || value === "Select City" || value === "Select State") {
            document.querySelector(errorSelector).textContent = errorMessage;
            return false;
        }
    } else {
        if (value.trim() === "") {
            document.querySelector(errorSelector).textContent = errorMessage;
            return false;
        }
    }
    document.querySelector(errorSelector).textContent = ""; 
    return true;
}

// Validate text fields with optional pattern
function validateTextField(selector, errorSelector, errorMessage, pattern = /^[a-zA-Z]+$/) {
    const element = document.querySelector(selector);
    const value = element.value.trim();
    
    if (!validateRequiredField(selector, errorSelector, errorMessage)) {
        return false;
    } else if (!pattern.test(value)) {
        document.querySelector(errorSelector).textContent = "Invalid input.";
        return false;
    }
    document.querySelector(errorSelector).textContent = "";  
    return true;
}

// Validate numeric fields with specific length
function validateNumericField(selector, errorSelector, errorMessage, length) {
    const element = document.querySelector(selector);
    const value = element.value.trim();
    const pattern = /^\d+$/; 
    if (!validateRequiredField(selector, errorSelector, errorMessage)) {
        return false;
    } else if (!pattern.test(value)) {
        document.querySelector(errorSelector).textContent = "Only numbers are allowed.";
        return false;
    } else if (value.length !== length) {
        document.querySelector(errorSelector).textContent = `This field must be exactly ${length} digits.`;
        return false;
    }
    document.querySelector(errorSelector).textContent = ""; 
    return true;
}

// Clear all form fields
const clearAll = () => {
    firstname.value = '';
    lastname.value = '';
    address.value = '';
    city.value = '';
    state.value = '';
    pin.value = '';
    genderM.checked = false;
    genderF.checked = false;
    hobbyG.checked = false;
    hobbyS.checked = false;
    dob.value = '';
    phone.value = '';
    email.value = '';
}
