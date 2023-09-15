function displayModal() {
    const modal = document.getElementById("contact_modal");
    const closeCross = modal.querySelector("img");
	modal.style.display = "block";
    closeCross.focus();
    document.querySelector("header").setAttribute("aria-hidden","true");
    document.querySelector("main").setAttribute("aria-hidden","true");
    document.getElementById("lightbox_modal").setAttribute("aria-hidden","true");
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

    const firstName = document.getElementById("inputFirstname").value;
    const lastName = document.getElementById("inputLastname").value;
    const email = document.getElementById("inputEmail").value;
    const message = document.getElementById("inputMessage").value;

    if(validateFirstname(firstName) && validateLastName(lastName) && validateEmail(email) && validateMessage(message)){
        let result = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            message : message
        }

        console.log(result);

    } else {
        console.log("Invalid !");
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