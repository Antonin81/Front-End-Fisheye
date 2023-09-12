function mediaTemplate(data) {

    const { id, photographerId, title, image, video, likes, date, price } = data;
    const picturePath = `assets/Sample Photos/${photographerId}/${image}`;
    const videoPath = `assets/Sample Photos/${photographerId}/${video}`;
 
    function getPictureGridCardDOM() {

        const pictureCard = document.createElement('article');
        pictureCard.classList.add("picture");

        const pictureLink = document.createElement('a');
        pictureLink.setAttribute("href","#");
        pictureLink.setAttribute("title",title+", closeup view");

        if(image!=undefined){
            const pictureImg = document.createElement('img');
            pictureImg.setAttribute("src",picturePath);
            pictureImg.setAttribute("alt",title);
            pictureLink.appendChild(pictureImg);
            pictureCard.appendChild(pictureLink);
        } else {
            const pictureVideo = document.createElement('video');
            const videoSrc = document.createElement("source");
            videoSrc.setAttribute("src",videoPath);
            pictureVideo.appendChild(videoSrc);
            pictureLink.appendChild(pictureVideo);
            pictureCard.appendChild(pictureLink);
        }
        const pictureFooter = document.createElement('div');

        const pictureTitle = document.createElement('h2');
        pictureTitle.textContent = title;

        const pictureLikes = document.createElement('p');
        pictureLikes.textContent = likes;

        const pictureLikesIcon = document.createElement('i');
        pictureLikesIcon.classList.add("fa-solid");
        pictureLikesIcon.classList.add("fa-heart");
        pictureLikesIcon.setAttribute("aria-label","likes");
        pictureLikes.appendChild(pictureLikesIcon);

        pictureFooter.appendChild(pictureTitle);
        pictureFooter.appendChild(pictureLikes);

        pictureCard.appendChild(pictureFooter);

        return pictureCard;
    }

    return { getPictureGridCardDOM }
}