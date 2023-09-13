function openLightboxModal({type, title, path}){
    event.preventDefault();
    console.log("type : "+type,"title : "+title,"path : "+path);
    const lightbox = document.getElementById("lightbox_modal");
    lightbox.style.display="block";
}

function closeLightboxModal(){
    const lightbox = document.getElementById("lightbox_modal");
    lightbox.style.display="none";
}