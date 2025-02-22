function photographerTemplate(data) {
    const { id, name, portrait, price, country, city, tagline } = data;
    const picture = `assets/photographers/${portrait}`;
    const likeButtons = document.querySelectorAll(".like-button");


    //Creates the dom for a photographer card on the home page
    function getUserCardDOM() {

        const article = document.createElement( "article" );

        const link = document.createElement( "a" );
        link.setAttribute("href", "./photographer.html?id="+id);
        link.setAttribute("aria-label", name);

        const img = document.createElement( "img" );
        img.setAttribute("src", picture);
        img.setAttribute("alt",name);

        const h2 = document.createElement( "h2" );
        h2.textContent = name;

        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);

        const location = document.createElement( "p" );
        location.textContent=city+", "+country;
        location.classList.add("location");

        const taglineParagraph = document.createElement( "p" );
        taglineParagraph.textContent=tagline;
        taglineParagraph.classList.add("tagline");

        const priceParagraph = document.createElement( "p" );
        priceParagraph.textContent=price+"€/jour";
        priceParagraph.classList.add("price");

        article.appendChild(location);
        article.appendChild(taglineParagraph);
        article.appendChild(priceParagraph);

        return (article);
    }

    
    //Creates the dom for a photographer card on the photographer page
    function getUserDescDOM() {

        const headerFirstPart = document.createElement("div");

        const nameTitle = document.createElement("h1");
        nameTitle.textContent=name;
        headerFirstPart.appendChild(nameTitle);

        const location = document.createElement( "p" );
        location.textContent=city+", "+country;
        location.classList.add("location");
        headerFirstPart.appendChild(location);

        const taglineParagraph = document.createElement( "p" );
        taglineParagraph.textContent=tagline;
        taglineParagraph.classList.add("tagline");
        headerFirstPart.appendChild(taglineParagraph);

        const img = document.createElement( "img" );
        img.setAttribute("src", picture);
        img.setAttribute("alt",name);

        return {headerFirstPart,img};
    }

    //Creates the dom for the bottom section of the photographer page
    function getBottomSectionDOM(likesCount){

        const bottomSection = document.createElement("div");
        bottomSection.classList.add("bottom-section");

        const totalLikesSpan = document.createElement("p");

        const totalLikes = document.createElement("span");
        totalLikes.classList.add("total-likes");
        totalLikes.textContent=likesCount;

        const totalLikesIcon = document.createElement("em");
        totalLikesIcon.classList.add("fa-solid");
        totalLikesIcon.classList.add("fa-heart");
        totalLikesIcon.setAttribute("aria-label","likes");

        const photographerPrice = document.createElement("p");
        photographerPrice.textContent = price+"€ / jour";

        totalLikesSpan.appendChild(totalLikes);
        totalLikesSpan.appendChild(totalLikesIcon);

        bottomSection.appendChild(totalLikesSpan);
        bottomSection.appendChild(photographerPrice);

        return bottomSection;
    }

    //adds event listeners to like buttons on medias in the photographer page
    function eventLikeButtons(){
        for (let likeButton of likeButtons){
            likeButton.addEventListener("click",()=>{
                if(likeButton.getAttribute("data-liked")=="false"){
                    likeButton.setAttribute("data-liked","true");
                    likeButton.previousSibling.textContent++;
                    likeButton.classList.remove("fa-regular");
                    likeButton.classList.add("fa-solid");
                    document.querySelector(".total-likes").textContent++;
                } else {
                    likeButton.setAttribute("data-liked","false");
                    likeButton.previousSibling.textContent--;
                    likeButton.classList.remove("fa-solid");
                    likeButton.classList.add("fa-regular");
                    document.querySelector(".total-likes").textContent--;
                }
            });
            likeButton.addEventListener("keypress",(e)=>{
                if(e.code == "Enter"){
                    likeButton.click();
                }
            });
        }
    }

    return { name, picture, getUserCardDOM, getUserDescDOM, getBottomSectionDOM, eventLikeButtons };
}

export {photographerTemplate};