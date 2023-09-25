import {getPhotographer, getPictures} from "../pages/photographer.js";
import { mediaTemplate } from "../templates/media.js";
import { photographerTemplate } from "../templates/photographer.js";

function openDropdown(dropdown){
    const button = document.getElementById("sortSelect");
    dropdown.classList.remove("hidden");
    dropdown.setAttribute("aria-hidden","false");
    dropdown.children[0].children[0].focus();
    button.setAttribute("tabindex","-1"); 
}

function closeDropdown(dropdown){
    const button = document.getElementById("sortSelect");
    dropdown.classList.add("hidden");
    dropdown.setAttribute("aria-hidden","true");
    dropdown.focus();
    button.setAttribute("tabindex","0");
}

function toggleDropdown(){
    const dropdown = document.querySelector(".test-dropdown");
    if(dropdown.classList.contains("hidden")){
        openDropdown(dropdown);
    } else {
        closeDropdown(dropdown);
    }
}

async function sortMedias(sortMode){
    const urlParams = new URL(document.location).searchParams;
    const picturesSection = document.getElementById("pictures");
    const photographerId = urlParams.get("id");
    const { photographer } = await getPhotographer(photographerId);
    const pictures = await getPictures(photographer.id);
    const lightbox = document.querySelector(".lightbox-medias");
    const likedList = [];
    let mediaOrder = 0;
    document.querySelectorAll("[data-liked=true]").forEach(liked => {
        likedList.push(liked.getAttribute("data-image"));
    });
    picturesSection.innerHTML="";
    lightbox.innerHTML="";
    switch (sortMode) {
        case "title":
            pictures.sort((a,b)=>{
                if(a.title < b.title){
                    return -1;
                }
                if(a.title > b.title){
                    return 1;
                }
                return 0;
            });
            break;
        case "popularity":
            pictures.sort((a,b)=>{
                if(a.likes < b.likes){
                    return 1;
                }
                if(a.likes > b.likes){
                    return -1;
                }
                return 0;
            });
            break;
        case "date":
            pictures.sort((a,b)=>{
                if(a.date < b.date){
                    return 1;
                }
                if(a.date > b.date){
                    return -1;
                }
                return 0;
            });
            break;
        default:
            break;
    }
    for (let picture of pictures){
        const pictureCard = mediaTemplate(picture).getPictureGridCardDOM(mediaOrder);
        const pictureLikeButton = pictureCard.querySelector("em");
        if(likedList.includes(pictureLikeButton.getAttribute("data-image"))){
            pictureLikeButton.setAttribute("data-liked",true);
            pictureLikeButton.classList.remove("fa-regular");
            pictureLikeButton.classList.add("fa-solid");
            pictureLikeButton.previousSibling.textContent++;
        }
        picturesSection.appendChild(pictureCard);
        lightbox.appendChild(mediaTemplate(picture).getLightboxMediaDOM(mediaOrder));
        
        mediaOrder+=1;
    }
    photographerTemplate({}).eventLikeButtons();
    
}

function optionSelected(e){
    let target = e.target;
    let dropdownButton = document.getElementById("sortSelect");
    let liTarget = target.parentElement;
    let ulTarget = liTarget.parentElement;
    if(target.getAttribute("aria-selected")=="false"){
        ulTarget.children[0].querySelector("button").setAttribute("aria-selected","false");
        ulTarget.children[0].querySelector("button").setAttribute("aria-checked","false");

        dropdownButton.textContent=target.textContent;
        target.parentElement.remove();
        liTarget.querySelector("button").setAttribute("aria-selected","true");
        liTarget.querySelector("button").setAttribute("aria-checked","true");
        ulTarget.prepend(liTarget);
        ulTarget.setAttribute("aria-activedescendant",liTarget.id);
        sortMedias(target.getAttribute("data-value"));
    }
    closeDropdown(ulTarget);
}

function initTri(){
    document.getElementById("sortSelect").addEventListener("click",toggleDropdown);
    document.querySelectorAll(".test-dropdown button").forEach(button=>{
        button.addEventListener("click",optionSelected);
    });
    sortMedias("title");
}

initTri();

export{toggleDropdown, optionSelected};