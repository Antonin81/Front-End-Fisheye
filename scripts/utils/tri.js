import {getPhotographer, getPictures} from "../pages/photographer.js";

//opens the select dropdown
function openDropdown(dropdown){
    const button = document.getElementById("sortSelect");
    dropdown.classList.remove("hidden");
    dropdown.setAttribute("aria-hidden","false");
    dropdown.children[0].children[0].focus();
    button.setAttribute("tabindex","-1"); 
}

//closes the select dropdown
function closeDropdown(dropdown){
    const button = document.getElementById("sortSelect");
    dropdown.classList.add("hidden");
    dropdown.setAttribute("aria-hidden","true");
    button.focus();
    button.setAttribute("tabindex","0");
}

//opens or closes the select dropdown depending of its current state
function toggleDropdown(){
    const dropdown = document.querySelector(".test-dropdown");
    if(dropdown.classList.contains("hidden")){
        openDropdown(dropdown);
    } else {
        closeDropdown(dropdown);
    }
}

//sorts all the medias by date/popularity/title
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
    // picturesSection.innerHTML="";
    // lightbox.innerHTML="";
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
                let aLikes = a.likes;
                let bLikes = b.likes;
                if(likedList.includes(a.id.toString())){
                    aLikes++;
                }
                if(likedList.includes(b.id.toString())){
                    bLikes++;
                }
                if(aLikes < bLikes){
                    return 1;
                }
                if(aLikes > bLikes){
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
        let pictureCard = document.querySelector(`[data-id="${picture.id}"]`);
        pictureCard.setAttribute("data-order",mediaOrder);
        picturesSection.appendChild(pictureCard);
        let lightboxCard = document.querySelector(`[data-lightbox-id="${picture.id}"]`);
        lightboxCard.setAttribute("data-order",mediaOrder);
        lightbox.appendChild(lightboxCard);
        mediaOrder+=1;
    }
    
}

//handles the option selection in the select dropdown. Rearranges the order of the options and calls some previous functions like sortMedias or closeDropdown
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

//initializes the sort system and sorts the media grid by title at the rendering of the photographer page
function initTri(){
    document.getElementById("sortSelect").addEventListener("click",toggleDropdown);
    document.querySelectorAll(".test-dropdown button").forEach(button=>{
        button.addEventListener("click",optionSelected);
    });
    sortMedias("title");
}

export{toggleDropdown, optionSelected, initTri};