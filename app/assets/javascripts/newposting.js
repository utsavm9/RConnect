function makeAgeRight() {
    const minCheckBox = document.getElementById('no-min-age');
    const minTextField = document.getElementById('input_min_age');
    const maxCheckBox = document.getElementById('no-max-age');
    const maxTextField = document.getElementById('input_max_age');
    
    if (minCheckBox.checked || minTextField.value === "") {
        minTextField.value = "0";
    }
    if (maxCheckBox.checked || maxTextField.value === "") {
        maxTextField.value = "81";
    }
    
    return true;
}

function minAgeCheck() {
    const checkBox = document.getElementById('no-min-age');
    const textField = document.getElementById('input_min_age');
    
    if (checkBox.checked) {
        textField.value = "";
        textField.readOnly = true;
    } else {
        textField.value = "0";
        textField.readOnly = false;
    }
}

function maxAgeCheck() {
    const checkBox = document.getElementById('no-max-age');
    const textField = document.getElementById('input_max_age');
    
    if (checkBox.checked) {
        textField.value = "";
        textField.readOnly = true;
    } else {
        textField.value = "80";
        textField.readOnly = false;
    }
}