
$(document).ready(function () {


  $("#btnSubmit").on("click", function () {
    $("input, select,textarea").on("change", function (e) {
      if(validationActive){
        validate(e);

      }
     });

      submitForm();
  });
});

// Flag for enabling/disabling validation
var validationActive = true;

// Patterns for validation
var addressPattern = /^[^@#$%^*{}[\]~`]+$/;
var emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i; // Basic email pattern

// Validation functions stored in an object
var everyFeildValidation = {
  'firstName': () => validateTextField("#firstName", "#firstNameError", "First name is required."),
  'lastName': () => validateTextField("#lastName", "#lastNameError", "Last name is required."),
  'address': () => validateTextField("#address", "#addressError", "Address is required.", addressPattern),
  'city': () => validateRequiredField("#city", "#cityError", "City is required."),
  'state': () => validateRequiredField("#state", "#stateError", "State is required."),
  'pincode': () => validateNumericField("#pincode", "#pincodeError", "Pincode is required.", 6),
  'dob': () => isValidDob(),
  'gender_male': () => isValidGender(),
  'gender_female': () => isValidGender(),
  'mobile': () => validateNumericField("#mobile", "#mobileError", "Mobile number is required.", 10),
  'email': () => validateTextField("#email", "#emailError", "Email is required.", emailPattern),
  'hobby_game': () => isValidHobby(),
  'hobby_song': () => isValidHobby()
};

// Validate fields based on event
function validate(e) {
  var targetId = $(e.target).attr('id');
  if (everyFeildValidation[targetId]) {
      everyFeildValidation[targetId]();
  }
}

// Function to check if all validations pass
function areAllValid() {
  // Collect validation results
  const results = Object.keys(everyFeildValidation).map(id => everyFeildValidation[id]());
  // Check if all results are true
  return results.every(result => result === true);
}

// Function to validate all fields on form submission
function submitForm() {
  if (areAllValid()) {
      saveAll(); // Perform save operations if all validations are true
      clearAll(); // Clear the form fields
      validationActive = false;
  } else {
      validationActive = true;
      // Optionally handle form submission failure
  }
}

// Save data to the table
function saveAll() {
  var newRow = $(`<tr></tr>`);
  newRow.html(`
        <td>${$("#firstName").val()}</td>
        <td>${$("#lastName").val()}</td>
        <td>${$("#address").val()}</td>
        <td>${$("#city").val()}</td>
        <td>${$("#state").val()}</td>
        <td>${$("#pincode").val()}</td>
        <td>${genderSelector()}</td>
        <td>${hobbiesSelector()}</td>
        <td>${$("#dob").val()}</td>
        <td>${$("#mobile").val()}</td>
        <td>${$("#email").val()}</td>`);
  $("#tbody").append(newRow);
  $("#saveMessage").text("Saved Successfully");
  $("#saveMessage").show().delay(3000).fadeOut();
}

// Helper functions to get selected gender and hobbies
function genderSelector() {
  return $("#gender_male").is(":checked") ? "Male" :
         $("#gender_female").is(":checked") ? "Female" :
         "Please select a gender";
}

function hobbiesSelector() {
  const hobbies = [
      $("#hobby_game").is(":checked") ? "Games" : "",
      $("#hobby_song").is(":checked") ? "Listening to Songs" : ""
  ];
  return hobbies.join(" ");
}

// Validation functions
function validateRequiredField(selector, errorSelector, errorMessage) {
  const value = $(selector).val();
  if (value === "" || value === null || value.trim() === "") {
      $(errorSelector).text(errorMessage);
      return false;
  }
  $(errorSelector).text(""); // Clear any previous error message
  return true;
}

function validateTextField(selector, errorSelector, errorMessage, pattern = /^[a-zA-Z]+$/) {
  const value = $(selector).val().trim();
  $(errorSelector).text(""); // Clear any previous error message
  if (!validateRequiredField(selector, errorSelector, errorMessage)) {
      return false;
  } else if (!pattern.test(value)) {
      $(errorSelector).text("Invalid input.");
      return false;
  }
  return true;
}

function validateNumericField(selector, errorSelector, errorMessage, length) {
  const value = $(selector).val().trim();
  const pattern = /^\d+$/;
  if (!validateRequiredField(selector, errorSelector, errorMessage)) {
      return false;
  } else if (!pattern.test(value)) {
      $(errorSelector).text("Only numbers are allowed.");
      return false;
  } else if (value.length !== length) {
      $(errorSelector).text(`This field must be exactly ${length} digits.`);
      return false;
  }
  $(errorSelector).text(""); // Clear any previous error message
  return true;
}

function isValidDob() {
  const dob = $("#dob").val();
  const dobMessage = $("#dobError");
  const selectedDate = new Date(dob);
  const minDate = new Date("1900-01-01");
  dobMessage.text(
      dob === "" || dob === null ? "Date of birth is required." :
      selectedDate > Date.now() ? "Birthdate should not be in the future." :
      selectedDate < minDate ? "Birthdate should be after 1 January 1900." : "");
  return dob !== "" && dob !== null && selectedDate <= Date.now() && selectedDate >= minDate;
}

function isValidGender() {
  const genderError = $("#genderError");
  const isChecked = $("#gender_male").is(":checked") || $("#gender_female").is(":checked");
  genderError.text(isChecked ? "" : "Please select a gender.");
  return isChecked;
}

function isValidHobby() {
  const hobbyError = $("#hobbyError");
  hobbyError.text("");
  if (!$("#hobby_game").is(":checked") && !$("#hobby_song").is(":checked")) {
      hobbyError.text("Please select a hobby.");
      return false;
  }
  return true;
}

// Clear form after submission
function clearAll() {
  $("#firstName, #lastName, #address, #city, #state, #pincode, #dob, #mobile, #email").val("");
  $("input[type=radio], input[type=checkbox]").prop("checked", false);
}
