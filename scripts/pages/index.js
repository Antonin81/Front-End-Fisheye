import { photographerTemplate } from "../templates/photographer.js";
//gets all the photographers from the database
async function getPhotographers() {

        let photographers=[];

        await fetch("data/photographers.json")
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            photographers.push(data.photographers);
        }); 

        return ({photographers: photographers});
}

//displays the photographer cards in the home page
async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        photographers[0].forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
}

async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
}
    
init();
    
