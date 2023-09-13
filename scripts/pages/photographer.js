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
    }) 

    return ({photographer: photographer})
}

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
    }) 

    return pictures;
}

async function displayData(photographer, pictures) {
    const main = document.getElementById("main");
    const header = main.querySelector(".photograph-header");
    const picturesSection = document.getElementById("pictures");
    const { headerFirstPart, img } = photographerTemplate(photographer).getUserDescDOM();
    let likesCount = 0;
    pictures.forEach(picture=>{
        likesCount += picture.likes;
        picturesSection.appendChild(mediaTemplate(picture).getPictureGridCardDOM(picture));
    });
    const bottomSection = photographerTemplate(photographer).getBottomSectionDOM(likesCount);
    header.prepend(headerFirstPart);
    header.append(img);
    main.appendChild(bottomSection);
}

async function init() {
    const urlParams = new URL(document.location).searchParams;
    const photographerId = urlParams.get('id');
    const { photographer } = await getPhotographer(photographerId);
    const pictures = await getPictures(photographer.id);
    displayData(photographer, pictures);
    let modalTitle = document.getElementById("contact_modal-h2");
    modalTitle.textContent = modalTitle.textContent+" "+photographer.name;
    modalTitle.setAttribute("aria-label",modalTitle.getAttribute("aria-label")+" "+photographer.name);
}

init();