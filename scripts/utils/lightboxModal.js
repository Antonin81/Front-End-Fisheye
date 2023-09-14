function openLightboxModal({type, title, path}){
    event.preventDefault();
    console.log("type : "+type,"title : "+title,"path : "+path);
    const lightbox = document.getElementById("lightbox_modal");
    lightbox.style.display="block";
    clearLightbox();
    if(type=="image"){
        displayImage(type, title, path);
    } else {
        displayVideo(type, title, path);
    }
    displayTitle(title);
}

function clearLightbox(){
    const mediaSection = document.querySelector(".lightbox-media");
    console.log(mediaSection.firstChild.nodeType);
    if(mediaSection.firstChild.nodeType!=3){
        mediaSection.firstChild.remove();
    }
   
}

function displayImage(type, title, path){
    const imageSection = document.querySelector(".lightbox-media");

    const image = document.createElement('img');
    image.setAttribute("src",path);
    image.setAttribute("alt",title);
    image.classList.add("lightbox-media-content");

    imageSection.prepend(image);
}

function displayVideo(type, title, path){
    const imageSection = document.querySelector(".lightbox-media");

    const video = document.createElement('video');
    const videoSrc = document.createElement("source");
    videoSrc.setAttribute("src",path);
    video.setAttribute("controls","true");
    video.classList.add("lightbox-media-content");
    video.appendChild(videoSrc);

    imageSection.prepend(video);
}

function displayTitle(title){
    const titleSection = document.getElementById("lightbox_modal").querySelector("h3");
    titleSection.textContent=title;
}

function closeLightboxModal(){
    const lightbox = document.getElementById("lightbox_modal");
    lightbox.style.display="none";
}