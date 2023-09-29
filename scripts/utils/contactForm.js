//Displays the success message in the contact modal
function logSuccessMessage(){
    const successMessage=document.getElementById("successMessage");
    successMessage.setAttribute("aria-hidden","false");
    successMessage.style.display="block";
}

//Hides the success message in the contact modal
function hideSuccessMessage(){
    const successMessage=document.getElementById("successMessage");
    successMessage.setAttribute("aria-hidden","true");
    successMessage.style.display="none";
}

//Reinitializes all the error messages in the contact modal
function reinitializeErrors(list){
    for (let inputError of list){
        inputError.setAttribute("aria-hidden","true");
        inputError.classList.add("hidden");
    }
}

//Empties all the inputs in the contact modal
function emptyInputs(list){
    for (let input of list){
        input.value="";
    }
}

//Tests the given firstname 
function validateFirstname(firstName){
    return firstName!="";
}

//Tests the given lastname 
function validateLastName(lastName){
    return lastName!="";
}

//Tests the given email 
function validateEmail(email){
    const regexEmail = new RegExp("^[a-z0-9._-]+@[a-z0-9-_]+\\.[a-z]{2,}$");
    return regexEmail.test(email);
}

//Tests the given message 
function validateMessage(message){
    return message!="";
}

//Displays the contact modal
function displayModal() {
    const modal = document.getElementById("contact_modal");
    const closeCross = modal.querySelector("img");
	modal.style.display = "block";
    closeCross.focus();
    document.querySelector("header").setAttribute("aria-hidden","true");
    document.querySelector("main").setAttribute("aria-hidden","true");
    document.getElementById("lightbox_modal").setAttribute("aria-hidden","true");
    modal.setAttribute("aria-hidden","false");
    hideSuccessMessage();
}

//Hides the contact modal
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.querySelector("header").setAttribute("aria-hidden","false");
    document.querySelector("main").setAttribute("aria-hidden","false");
    modal.setAttribute("aria-hidden","true");
    document.querySelector(".contact_modal_button").focus();
}

//Tests all the formular and sends the json result in the console
function validateForm(e) {

    e.preventDefault();

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
        };

        console.log(result);

        emptyInputs([firstNameInput, lastNameInput, emailInput, messageInput]);
        logSuccessMessage();
        document.querySelector(".close-contact-modal").focus();

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

function initContact(){
    const modal = document.getElementById("contact_modal");
    const closeCross = modal.querySelector("img");
    closeCross.addEventListener("keypress",(e)=>{
        if(e.code=="Enter"){
            closeCross.click();
        }
    });
    modal.addEventListener("keydown",(e)=>{
        if(e.code=="Escape"){
            closeCross.click();
        }
    });
    document.querySelector(".photograph-header .contact_button").addEventListener("click",displayModal);
    document.querySelector(".close-contact-modal").addEventListener("click",closeModal);
    document.getElementById("contact_modal").addEventListener("submit",validateForm);
}

initContact();

export{displayModal, closeModal, validateForm};