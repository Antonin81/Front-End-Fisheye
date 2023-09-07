function mediaTemplate(data) {

    const { id, photographerId, title, image, likes, date, price } = data;
    const picture = `assets/Sample Photos/${photographerId}/${image}`;
 
    function getPictureGridCardDOM() {

        const pictureCard = document.createElement('article');
        pictureCard.classList.add("picture");

        const pictureImg = document.createElement('img');
        pictureImg.setAttribute("src",picture);

        const pictureFooter = document.createElement('div');

        const pictureTitle = document.createElement('h2');
        pictureTitle.textContent = title;

        const pictureLikes = document.createElement('p');
        pictureLikes.textContent = likes;

        pictureFooter.appendChild(pictureTitle);
        pictureFooter.appendChild(pictureLikes);

        pictureCard.appendChild(pictureImg);
        pictureCard.appendChild(pictureFooter);

        return pictureCard;
    }

    return { getPictureGridCardDOM }
}