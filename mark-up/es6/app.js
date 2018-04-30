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