    async function getPhotographers() {

        let photographers=[];

        await fetch("data/photographers.json")
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            photographers.push(data.photographers);
        }) 

        return ({
            photographers: photographers})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        photographers[0].forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
