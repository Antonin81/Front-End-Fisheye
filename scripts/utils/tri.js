import {getPhotographer, getPictures} from "../pages/photographer.js";
import { mediaTemplate } from "../templates/media.js";

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
    let mediaOrder = 0;
    picturesSection.innerHTML="";
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
        picturesSection.appendChild(mediaTemplate(picture).getPictureGridCardDOM(mediaOrder));
        mediaOrder+=1;
    }
    
}

function optionSelected(){
    let target = event.target;
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
}

initTri();

export{toggleDropdown, optionSelected};