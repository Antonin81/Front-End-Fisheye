let order = null;

//displays the lightbox modal

function displayMedia(){
    const lightbox = document.getElementById("lightbox_modal");
    lightbox.querySelector(`[data-order="${order}"]`).style.display="block";
}

//shows the previous media in the lightbox

function previousMedia(){
    const lightbox = document.getElementById("lightbox_modal");
    const maxOrder = lightbox.getAttribute("data-max-order");

    if(order==0){
        lightbox.querySelector(`[data-order="${maxOrder-1}"]`).style.display="block";
        lightbox.querySelector(`[data-order="${maxOrder-1}"]`).setAttribute("aria-hidden","false");
        lightbox.querySelector(`[data-order="${order}"]`).style.display="none";
        lightbox.querySelector(`[data-order="${order}"]`).setAttribute("aria-hidden","true");
        order=maxOrder-1;
    } else {
        lightbox.querySelector(`[data-order="${order-1}"]`).style.display="block";
        lightbox.querySelector(`[data-order="${order-1}"]`).setAttribute("aria-hidden","false");
        lightbox.querySelector(`[data-order="${order}"]`).style.display="none";
        lightbox.querySelector(`[data-order="${order}"]`).setAttribute("aria-hidden","true");
        order--;
    }

}

//shows the next media in the lightbox

function nextMedia(){
    const lightbox = document.getElementById("lightbox_modal");
    const maxOrder = lightbox.getAttribute("data-max-order");
    if(order==maxOrder-1){
        lightbox.querySelector(`[data-order="${0}"]`).style.display="block";
        lightbox.querySelector(`[data-order="${0}"]`).setAttribute("aria-hidden","false");
        lightbox.querySelector(`[data-order="${order}"]`).style.display="none";
        lightbox.querySelector(`[data-order="${order}"]`).setAttribute("aria-hidden","true");
        order=0;
    } else {
        lightbox.querySelector(`[data-order="${order+1}"]`).style.display="block";
        lightbox.querySelector(`[data-order="${order+1}"]`).setAttribute("aria-hidden","false");
        lightbox.querySelector(`[data-order="${order}"]`).style.display="none";
        lightbox.querySelector(`[data-order="${order}"]`).setAttribute("aria-hidden","true");
        order++;
    }
}

//closes the lightbox

function closeLightboxModal(){
    const lightbox = document.getElementById("lightbox_modal");
    lightbox.style.display="none";
    document.querySelector("header").setAttribute("aria-hidden","false");
    document.querySelector("main").setAttribute("aria-hidden","false");
    lightbox.setAttribute("aria-hidden","true");
    document.getElementById("pictures").querySelector(`[data-order="${order}"]`).querySelector("a").focus();
}

//opens the lightbox

function openLightboxModal(e){
    let article = e.target;
    while (!article.classList.contains("picture")){
        article=article.parentElement;
    }
    order = parseInt(article.getAttribute("data-order"));
    const lightbox = document.getElementById("lightbox_modal");
    const cross = document.querySelector(".lightbox-cross");
    lightbox.style.display="block";
    document.querySelector("header").setAttribute("aria-hidden","true");
    document.querySelector("main").setAttribute("aria-hidden","true");
    document.getElementById("contact_modal").setAttribute("aria-hidden","true");
    lightbox.setAttribute("aria-hidden","false");
    cross.focus();
    let mediasList = lightbox.querySelectorAll("li");
    for (let media of mediasList){
        media.style.display="none";
    }
    displayMedia();
}

//initializes the lightbox

function initLightbox(){
    const cross = document.querySelector(".lightbox-cross");
    const lightbox = document.getElementById("lightbox_modal");
    const leftArrow = document.querySelector(".lightbox-arrow-left");
    const rightArrow = document.querySelector(".lightbox-arrow-right");

    leftArrow.addEventListener("click",previousMedia);
    rightArrow.addEventListener("click",nextMedia);
    cross.addEventListener("click",closeLightboxModal);

    leftArrow.addEventListener("keydown",(e)=>{
        if(e.code=="Enter"){
            leftArrow.click();
        }
    });
    rightArrow.addEventListener("keydown",(e)=>{
        if(e.code=="Enter"){
            rightArrow.click();
        }
    });
    cross.addEventListener("keypress",(e)=>{
        if(e.code=="Enter"){
            cross.click();
        }
    });
    lightbox.addEventListener("keydown",(e)=>{
        if(e.code=="ArrowLeft"){
            leftArrow.click();
        }
        if(e.code=="ArrowRight"){
            rightArrow.click();
        }
        if(e.code=="Escape"){
            cross.click();
        }
    });
}

initLightbox();

export {openLightboxModal, closeLightboxModal, previousMedia, nextMedia, order};