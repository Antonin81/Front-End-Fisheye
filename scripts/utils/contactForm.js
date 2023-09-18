function displayModal() {
    const modal = document.getElementById("contact_modal");
    const closeCross = modal.querySelector("img");
	modal.style.display = "block";
    closeCross.focus();
    document.querySelector("header").setAttribute("aria-hidden","true");
    document.querySelector("main").setAttribute("aria-hidden","true");
    modal.setAttribute("aria-hidden","false");
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.querySelector("header").setAttribute("aria-hidden","false");
    document.querySelector("main").setAttribute("aria-hidden","false");
    modal.setAttribute("aria-hidden","true");
}

function validateForm() {

    event.preventDefault();

    const firstNameInput = document.getElementById("inputFirstname");
    const lastNameInput = document.getElementById("inputLastname");
    const emailInput = document.getElementById("inputEmail");
    const messageInput = document.getElementById("inputMessage");
    const firstNameInputError = document.getElementById("inputFirstnameError");
    const lastNameInputError = document.getElementById("inputLastnameError");
    const emailInputError = document.getElementById("inputEmailError");
    const messageInputError = document.getElementById("inputMessageError");
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    reinitializeErrors([firstNameInputError, lastNameInputError, emailInputError, messageInputError]);

    if(validateFirstname(firstName) && validateLastName(lastName) && validateEmail(email) && validateMessage(message)){
        let result = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            message : message
        }

        console.log(result);

        emptyInputs([firstNameInput, lastNameInput, emailInput, messageInput]);
        logSuccessMessage();

    } else {
        console.log("Invalid !");
        if(!validateFirstname(firstName)){
            firstNameInputError.setAttribute("aria-hidden","false");
            firstNameInputError.classList.remove("hidden");
        }
        if(!validateLastName(lastName)){
            lastNameInputError.setAttribute("aria-hidden","false");
            lastNameInputError.classList.remove("hidden");
        }
        if(!validateEmail(email)){
            emailInputError.setAttribute("aria-hidden","false");
            emailInputError.classList.remove("hidden");
        }
        if(!validateMessage(message)){
            messageInputError.setAttribute("aria-hidden","false");
            messageInputError.classList.remove("hidden");
        }
    }
}

function logSuccessMessage(){
    const successMessage=document.getElementById("successMessage");
    successMessage.setAttribute("aria-hidden","false");
    successMessage.classList.remove("hidden");
}

function hideSuccessMessage(){
    const successMessage=document.getElementById("successMessage");
    if (successMessage!=undefined){
        successMessage.setAttribute("aria-hidden","true");
        successMessage.classList.add("hidden");

    }
}

function reinitializeErrors(list){
    for (inputError of list){
        inputError.setAttribute("aria-hidden","true");
        inputError.classList.add("hidden");
    }
}

function emptyInputs(list){
    for (input of list){
        input.value="";
    }
}

function validateFirstname(firstName){
    return firstName!="";
}

function validateLastName(lastName){
    return lastName!="";
}

function validateEmail(email){
    const regexEmail = new RegExp("^[a-z0-9._-]+@[a-z0-9-_]+\\.[a-z]{2,}$");
    return regexEmail.test(email);
}

function validateMessage(message){
    return message!="";
}

function init(){
    const modal = document.getElementById("contact_modal");
    const closeCross = modal.querySelector("img");
    closeCross.addEventListener("keydown",(e)=>{
        if(e.keyCode==13){
            closeCross.click()
        }
    })
    modal.addEventListener("keydown",(e)=>{
        if(e.keyCode==27){
            closeCross.click()
        }
    })
}

init();