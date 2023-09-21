export{toggleDropdown, optionSelected};

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
        console.log(target.getAttribute("data-value"));

        dropdownButton.textContent=target.textContent;
        target.parentElement.remove();
        liTarget.querySelector("button").setAttribute("aria-selected","true");
        ulTarget.prepend(liTarget);
    }
    closeDropdown(ulTarget);
}