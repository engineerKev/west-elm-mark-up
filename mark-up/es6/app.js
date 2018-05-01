document.getElementsByClassName('image-selection')[0].addEventListener('click', (e) =>{
    document.getElementsByClassName('selected')[0].classList.toggle('selected')
    e.target.parentNode.classList.toggle('selected');
    var alt = e.target.alt;
    var largeImg = document.getElementById('apron-image');
    largeImg.src = e.target.src.replace('small', 'large');
    largeImg.alt = alt;
    var apronName = document.getElementsByClassName('apron-color');
    for(var i = 0; i < apronName.length; i++){
        apronName[i].textContent = alt;
    }

    
    document.getElementsByClassName('modal-apron-name')[0].textContent = alt;
});

//modal js
document.getElementById('add2cart').addEventListener('click', (e) => {
    let cartModal = document.getElementById(e.target.dataset.target);
    //console.log(e.target.dataset.target);
    cartModal.style.display = 'block';
    cartModal.classList.toggle('in');
    let modalBackdropDiv = document.createElement("div");
    modalBackdropDiv.setAttribute('class', 'modal-bdp fade in');
    document.body.appendChild(modalBackdropDiv);
});


document.addEventListener('click', (e) => {
    console.log(e.target)
    if(e.target.id === 'close'){
        let modal = document.getElementById('cartModal');
        modal.style.display = 'none';
        modal.classList.toggle('in')
        document.body.removeChild(document.getElementsByClassName('modal-bdp')[0]);
    }
})
