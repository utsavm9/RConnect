/*global $*/

function test(text) {
    let element = document.createElement('p');
    element.innerHTML = text;
    document.getElementById('number-of-listings').appendChild(element);
}

function handleAuth(noAuthType) {
    let element = document.getElementById('no-auth-modal-body');
    if (noAuthType == 'del-inauth') {
        element.innerHTML = "You tried to delete a posting which you did not create.";
    } else if (noAuthType == 'del-nolog') {
        element.innerHTML = "You cannot delete any posting without first loggin in.";
    } else if (noAuthType == '-del-own') {
        element.innerHTML = "Posting has been deleted.";
    } else if (noAuthType == '-no-edit') {
        element.innerHTML = "No post has been edited.";
    } else if (noAuthType == '-updated') {
        element.innerHTML = "The post has been updated.";
    } else if (noAuthType == '-created') {
        element.innerHTML = "The post has been created.";
    } else if (noAuthType == '-user-ok') {
        element.innerHTML = "User preferences have been saved.";
    } else if (noAuthType == 'invalid-login') {
        element.innerHTML = "User not found. Check username and password.";
    }
    setTimeout('', 2000);
    $('#noAuthModal').modal();
}

window.onload = function() {
    console.log("Logging is working fine");
    
    //Set initial values of the sliders in filter
    document.getElementById('slider-pay').value = 0;
    document.getElementById('slider-age').value = 20;
};

function setNumberOfListings(count) {
    document.getElementById('number-of-listings').innerHTML = 
        count + ' listing' + (count != 1 ? 's' : '') + ' available';
}

function applyFilter() {
     
    //Extracting information from the form.
    const gender = document.querySelector('input[name=gridRadios]:checked').value; //Radio Buttons
    const uclaStudents = document.getElementById('check-ucla').checked;            //Check Buttons
    const mobileApp = document.getElementById('check-app').checked;
    const noMedical = document.getElementById('check-no-medical').checked;
    const myStudies = document.getElementById('check-my-studies').checked;
    const minPrice = parseInt(document.getElementById('slider-pay').value, 10);    //Sliders
    const age = parseInt(document.getElementById('slider-age').value, 10);
    const userEmail = document.getElementById('current-user-email').textContent;   //Current user
    
    let counter = 0, postingShown = 0;
    let box;
    
    //For each posting box... check with filter
    while (box = document.getElementById('info-' + counter)) {
        const node = box.childNodes;
        
        //Extracting information out of the current posting in consideration
        const _minAge   = parseInt(node[1].textContent, 10);
        const _maxAge   = parseInt(node[3].textContent, 10);
        const _gender   = node[5].textContent;
        const _ucla     = node[7].textContent === "true" ? true : false;
        const _app      = node[9].textContent === "true" ? true : false;
        const _medical  = node[11].textContent === "true" ? true : false;
        const _thisUser = node[13].textContent == userEmail ? true : false;
        const _pay      = parseInt(node[15].textContent, 10);
        
        const matchesFilter = (gender == "unspecified" || _gender == "unspecified" ? true : gender == _gender) && //Radio buttons
                             (uclaStudents ? _ucla : true) &&       //Check Boxes
                             (mobileApp ? _app : true) && 
                             (noMedical ? _medical : true) &&
                             (myStudies ? _thisUser : true) &&
                             (minPrice <= _pay) &&                  //Sliders
                             (age >= _minAge && age <= _maxAge);
                                     
        document.getElementById('postings-box-' + counter).style.display = matchesFilter ? "block" : "none";
        
        if (matchesFilter)
            ++postingShown;
        ++counter;
    }
    
    setNumberOfListings(postingShown);
        
    //Making the remove button appear again
    document.getElementById('remove-filter').style.display = "block";
}

function removeFilter() {
    document.getElementById('remove-filter').style.display = "none";
    let box, counter = 0;
    
    while (box = document.getElementById('postings-box-' + counter++)) {
        box.style.display = "block";
    }
    setNumberOfListings(counter - 1);
}


function sliderPriceChanged() {
    const label = document.getElementById('slider-pay-label');
    const slider = document.getElementById('slider-pay');
    
    label.innerHTML = "Minimum Pay: $" + slider.value;
}


function sliderAgeChanged() {
    const label = document.getElementById('slider-age-label');
    const slider = document.getElementById('slider-age');
    
    label.innerHTML = 'Age: ';
    if (slider.value === '1') {
        label.innerHTML += '1 year';
    }
    else if (slider.value === '0') {
        label.innerHTML += '<1 year';
    }
    else if (slider.value === '81') {
        label.innerHTML += '>80 years';
    } else {
        label.innerHTML += slider.value + ' years';
    }
}