export {openLightboxModal, closeLightboxModal, previousMedia, nextMedia};

function openLightboxModal(order){
    event.preventDefault();
    const lightbox = document.getElementById("lightbox_modal");
    const cross = document.querySelector(".lightbox-cross");
    lightbox.style.display="block";
    document.querySelector("header").setAttribute("aria-hidden","true");
    document.querySelector("main").setAttribute("aria-hidden","true");
    document.getElementById("contact_modal").setAttribute("aria-hidden","true");
    lightbox.setAttribute("aria-hidden","false");
    cross.focus();
    cross.setAttribute("onclick",`closeLightboxModal(${order})`);
    let mediasList = lightbox.querySelectorAll("li");
    for (let media of mediasList){
        media.style.display="none";
    }
    displayMedia(order);
    setOrderArrow(order);
}

function displayMedia(order){
    const lightbox = document.getElementById("lightbox_modal");
    lightbox.querySelector(`[data-order="${order}"]`).style.display="block";
}

function closeLightboxModal(order){
    const lightbox = document.getElementById("lightbox_modal");
    lightbox.style.display="none";
    document.querySelector("header").setAttribute("aria-hidden","false");
    document.querySelector("main").setAttribute("aria-hidden","false");
    lightbox.setAttribute("aria-hidden","true");
    document.getElementById("pictures").querySelector(`[data-order="${order}"]`).querySelector("a").focus();
}

function setOrderArrow(order){
    const leftArrow = document.querySelector(".lightbox-arrow-left");
    const rightArrow = document.querySelector(".lightbox-arrow-right");
    const cross = document.querySelector(".lightbox-cross");

    leftArrow.setAttribute("onclick",`previousMedia(${order})`);
    rightArrow.setAttribute("onclick",`nextMedia(${order})`);
    cross.setAttribute("onclick",`closeLightboxModal(${order})`);
}

function previousMedia(order){
    const lightbox = document.getElementById("lightbox_modal");
    const maxOrder = lightbox.getAttribute("data-max-order");

    if(order==0){
        lightbox.querySelector(`[data-order="${maxOrder-1}"]`).style.display="block";
        lightbox.querySelector(`[data-order="${maxOrder-1}"]`).setAttribute("aria-hidden","false");
        lightbox.querySelector(`[data-order="${order}"]`).style.display="none";
        lightbox.querySelector(`[data-order="${order}"]`).setAttribute("aria-hidden","true");
        setOrderArrow(maxOrder-1);
    } else {
        lightbox.querySelector(`[data-order="${order-1}"]`).style.display="block";
        lightbox.querySelector(`[data-order="${order-1}"]`).setAttribute("aria-hidden","false");
        lightbox.querySelector(`[data-order="${order}"]`).style.display="none";
        lightbox.querySelector(`[data-order="${order}"]`).setAttribute("aria-hidden","true");
        setOrderArrow(order-1);
    }

}

function nextMedia(order){
    const lightbox = document.getElementById("lightbox_modal");
    const maxOrder = lightbox.getAttribute("data-max-order");

    if(order==maxOrder-1){
        lightbox.querySelector(`[data-order="${0}"]`).style.display="block";
        lightbox.querySelector(`[data-order="${0}"]`).setAttribute("aria-hidden","false");
        lightbox.querySelector(`[data-order="${order}"]`).style.display="none";
        lightbox.querySelector(`[data-order="${order}"]`).setAttribute("aria-hidden","true");
        setOrderArrow(0);
    } else {
        lightbox.querySelector(`[data-order="${order+1}"]`).style.display="block";
        lightbox.querySelector(`[data-order="${order+1}"]`).setAttribute("aria-hidden","false");
        lightbox.querySelector(`[data-order="${order}"]`).style.display="none";
        lightbox.querySelector(`[data-order="${order}"]`).setAttribute("aria-hidden","true");
        setOrderArrow(order+1);
    }
}

function initLightbox(){
    const cross = document.querySelector(".lightbox-cross");
    const lightbox = document.getElementById("lightbox_modal");
    const leftArrow = document.querySelector(".lightbox-arrow-left");
    const rightArrow = document.querySelector(".lightbox-arrow-right");
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
    cross.addEventListener("keydown",(e)=>{
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