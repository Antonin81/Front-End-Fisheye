function openDropdown(dropdown){
    dropdown.classList.remove("hidden");
    dropdown.setAttribute("aria-hidden","false");
}

function closeDropdown(dropdown){
    dropdown.classList.add("hidden");
    dropdown.setAttribute("aria-hidden","true");
}

function toggleDropdown(){
    const dropdown = document.querySelector(".test-dropdown");
    if(dropdown.classList.contains("hidden")){
        openDropdown(dropdown);
    } else {
        closeDropdown(dropdown);
    }
}

function optionSelected(){
    let target = event.target;
    let dropdownButton = document.getElementById("sortSelect");
    let liTarget = target.parentElement;
    let ulTarget = liTarget.parentElement;
    if(target.getAttribute("aria-selected")=="false"){
        ulTarget.children[0].querySelector("button").setAttribute("aria-selected","false");

        dropdownButton.textContent=target.textContent;
        target.parentElement.remove();
        liTarget.querySelector("button").setAttribute("aria-selected","true");
        ulTarget.prepend(liTarget);
        sortMedias(target.getAttribute("data-value"));
    }
    closeDropdown(ulTarget);
}

async function sortMedias(sortMode){
    const urlParams = new URL(document.location).searchParams;
    const picturesSection = document.getElementById("pictures");
    const photographerId = urlParams.get('id');
    const { photographer } = await getPhotographer(photographerId);
    const pictures = await getPictures(photographer.id);
    let mediaOrder = 0;
    picturesSection.innerHTML="";
    switch (sortMode) {
        case "title":
            pictures.sort((a,b)=>{
                if(a.title < b.title){
                    return -1
                }
                if(a.title > b.title){
                    return 1
                }
                return 0
            })
            break;
        case "popularity":
            pictures.sort((a,b)=>{
                if(a.likes < b.likes){
                    return 1
                }
                if(a.likes > b.likes){
                    return -1
                }
                return 0
            })
            break;
        case "date":
            pictures.sort((a,b)=>{
                if(a.date < b.date){
                    return 1
                }
                if(a.date > b.date){
                    return -1
                }
                return 0
            })
            break;
        default:
            break;
    }
    for (let picture of pictures){
        picturesSection.appendChild(mediaTemplate(picture).getPictureGridCardDOM(mediaOrder));
        mediaOrder+=1;
    }
    
}