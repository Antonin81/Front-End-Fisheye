import { photographerTemplate } from "../templates/photographer.js";
import { mediaTemplate } from "../templates/media.js";
import { initTri } from "../utils/tri.js";

//gets the photographer that has for id the object "id" from the database
async function getPhotographer(id) {

    let photographer=null;

    await fetch("data/photographers.json")
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        data.photographers.forEach(dataPhotographer => {
            if(dataPhotographer.id==id){
                photographer=dataPhotographer;
            }
        });
    });

    return ({photographer: photographer});
}

//gets all the pictures of one photographer
async function getPictures(id){

    let pictures = [];

    await fetch("data/photographers.json")
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        data.media.forEach(dataPicture => {
            if(dataPicture.photographerId==id){
                pictures.push(dataPicture);
            }
        });
    }); 

    return pictures;
}

//displays all the photographer page's content
async function displayData(photographer, pictures) {
    const main = document.getElementById("main");
    const header = main.querySelector(".photograph-header");
    const { headerFirstPart, img } = photographerTemplate(photographer).getUserDescDOM();
    const lightbox = document.getElementById("lightbox_modal");

    lightbox.setAttribute("data-max-order",pictures.length);

    let likesCount = 0;
    let mediaOrder = 0;
    const picturesSection = document.getElementById("pictures");
    let lightboxContentSection = document.querySelector(".lightbox-medias");
    for (let picture of pictures){
        picturesSection.appendChild(mediaTemplate(picture).getPictureGridCardDOM(mediaOrder));
        lightboxContentSection.appendChild(mediaTemplate(picture).getLightboxMediaDOM(mediaOrder));
        mediaOrder+=1;
    }

    pictures.forEach(picture=>{
        likesCount += picture.likes;
    });
    const bottomSection = photographerTemplate(photographer).getBottomSectionDOM(likesCount);
    header.prepend(headerFirstPart);
    header.append(img);
    main.appendChild(bottomSection);
}

async function init() {
    const urlParams = new URL(document.location).searchParams;
    const photographerId = urlParams.get("id");
    const { photographer } = await getPhotographer(photographerId);
    const pictures = await getPictures(photographer.id);
    displayData(photographer, pictures);
    let modalTitle = document.getElementById("contact_modal-h2");
    modalTitle.textContent = modalTitle.textContent+" "+photographer.name;
    modalTitle.setAttribute("aria-label",modalTitle.getAttribute("aria-label")+" "+photographer.name);
    photographerTemplate({}).eventLikeButtons();
    initTri();
}

init();

export {getPhotographer, getPictures};