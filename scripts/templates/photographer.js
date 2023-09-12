function photographerTemplate(data) {
    const { id, name, portrait, price, country, city, tagline } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement( 'article' );

        const link = document.createElement( 'a' );
        link.setAttribute("href", "./photographer.html?id="+id);
        link.setAttribute("aria-label", name);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt","");

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);

        const location = document.createElement( 'p' );
        location.textContent=city+", "+country;
        location.classList.add("location");

        const taglineParagraph = document.createElement( 'p' );
        taglineParagraph.textContent=tagline;
        taglineParagraph.classList.add("tagline");

        const priceParagraph = document.createElement( 'p' );
        priceParagraph.textContent=price+"€/jour";
        priceParagraph.classList.add("price");

        article.appendChild(location);
        article.appendChild(taglineParagraph);
        article.appendChild(priceParagraph);

        return (article);
    }

    

    function getUserDescDOM() {

        const headerFirstPart = document.createElement("div");

        const nameTitle = document.createElement("h1");
        nameTitle.textContent=name;
        headerFirstPart.appendChild(nameTitle);

        const location = document.createElement( 'p' );
        location.textContent=city+", "+country;
        location.classList.add("location");
        headerFirstPart.appendChild(location);

        const taglineParagraph = document.createElement( 'p' );
        taglineParagraph.textContent=tagline;
        taglineParagraph.classList.add("tagline");
        headerFirstPart.appendChild(taglineParagraph);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt",name);

        return {headerFirstPart,img};
    }

    function getBottomSectionDOM(likesCount){

        const bottomSection = document.createElement('section');
        bottomSection.classList.add("bottom-section");

        const totalLikes = document.createElement('p');
        totalLikes.textContent=likesCount;

        const totalLikesIcon = document.createElement('i');
        totalLikesIcon.classList.add("fa-solid");
        totalLikesIcon.classList.add("fa-heart");
        totalLikesIcon.setAttribute("aria-label","likes");

        const photographerPrice = document.createElement('p');
        photographerPrice.textContent = price+"€ / jour"

        totalLikes.appendChild(totalLikesIcon);

        bottomSection.appendChild(totalLikes);
        bottomSection.appendChild(photographerPrice);

        return bottomSection
    }

    return { name, picture, getUserCardDOM, getUserDescDOM, getBottomSectionDOM }
}