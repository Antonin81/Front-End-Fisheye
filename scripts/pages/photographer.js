//Mettre le code JavaScript lié à la page photographer.html

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

async function displayData(photographer) {
    console.log(photographer);
    const main = document.getElementById("main");
    const header = main.querySelector(".photograph-header");
    const { headerFirstPart, img } = photographerTemplate(photographer).getUserDescDOM()
    header.prepend(headerFirstPart);
    header.append(img);
}

async function init() {
    const urlParams = new URL(document.location).searchParams;
    const photographerId = urlParams.get('id');
    const { photographer } = await getPhotographer(photographerId);
    displayData(photographer);
}

init();