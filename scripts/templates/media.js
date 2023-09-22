import { openLightboxModal } from "../utils/lightboxModal.js";

function mediaTemplate(data) {

    const { photographerId, title, image, video, likes } = data;
    const picturePath = `assets/Sample_Photos/${photographerId}/${image}`;
    const videoPath = `assets/Sample_Photos/${photographerId}/${video}`;
 
    function getPictureGridCardDOM(mediaOrder) {
        const pictureCard = document.createElement("article");
        pictureCard.classList.add("picture");
        pictureCard.setAttribute("data-order",mediaOrder);

        const pictureLink = document.createElement("a");
        pictureLink.setAttribute("href","#");
        pictureLink.setAttribute("title",title+", closeup view");

        if(image!=undefined){
            pictureLink.addEventListener("click",(e)=>{openLightboxModal(e, mediaOrder);});
            const pictureImg = document.createElement("img");
            pictureImg.setAttribute("src",picturePath);
            pictureImg.setAttribute("alt",title);
            pictureLink.appendChild(pictureImg);
            pictureCard.appendChild(pictureLink);
        } else {
            pictureLink.addEventListener("click",(e)=>{openLightboxModal(e,mediaOrder);});
            const pictureVideo = document.createElement("video");
            const videoSrc = document.createElement("source");
            videoSrc.setAttribute("src",videoPath);
            pictureVideo.appendChild(videoSrc);
            pictureLink.appendChild(pictureVideo);
            pictureCard.appendChild(pictureLink);
        }
        const pictureFooter = document.createElement("div");

        const pictureTitle = document.createElement("h2");
        pictureTitle.textContent = title;

        const pictureLikes = document.createElement("p");
        pictureLikes.textContent = likes;

        const pictureLikesIcon = document.createElement("em");
        pictureLikesIcon.classList.add("fa-solid");
        pictureLikesIcon.classList.add("fa-heart");
        pictureLikesIcon.setAttribute("aria-label","likes");
        pictureLikesIcon.classList.add("like-button");
        pictureLikesIcon.setAttribute("data-liked","false");
        pictureLikes.appendChild(pictureLikesIcon);

        pictureFooter.appendChild(pictureTitle);
        pictureFooter.appendChild(pictureLikes);

        pictureCard.appendChild(pictureFooter);

        return pictureCard;
    }

    function getLightboxMediaDOM(mediaOrder){
        const lightboxMediaContainer = document.createElement("li");
        lightboxMediaContainer.setAttribute("data-order",mediaOrder);

        if(image!=undefined){

            const lightboxImg = document.createElement("img");
            lightboxImg.setAttribute("src",picturePath);
            lightboxImg.setAttribute("alt",title);
            lightboxImg.setAttribute("aria-hidden","true");
            lightboxMediaContainer.appendChild(lightboxImg);

        } else {

            const lightboxVideo = document.createElement("video");
            lightboxVideo.setAttribute("controls","");
            const videoSrc = document.createElement("source");
            videoSrc.setAttribute("src",videoPath);
            lightboxVideo.appendChild(videoSrc);
            lightboxVideo.setAttribute("aria-hidden","true");
            lightboxMediaContainer.appendChild(lightboxVideo);

        }

        const lightboxMediaTitle = document.createElement("h3");
        lightboxMediaTitle.textContent=title;

        lightboxMediaContainer.appendChild(lightboxMediaTitle);

        return lightboxMediaContainer;
    }

    return { getPictureGridCardDOM, getLightboxMediaDOM };
}

export {mediaTemplate};