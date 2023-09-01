function photographerTemplate(data) {
    const { name, portrait, price, country, city, tagline } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement( 'article' );

        const link = document.createElement( 'a' );
        link.setAttribute("href", "#");
        link.setAttribute("aria-label", name);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

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
    return { name, picture, getUserCardDOM }
}