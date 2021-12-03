'use strict'

window.onload = function () {
  mainFunction()
}

window.onresize = function () {
  mainFunction()
}

function mainFunction() {

  var popup, clickHandler1, clickHandler2, clickHandler3, clickHandler4, clickHandler5, clickHandler6, borderWidth;

  borderWidth = document.getElementById('previewContainer').offsetWidth / 7 / 12;

  popup = document.querySelector('#popup');

  clickHandler1 = function (e) {
    if (screen.width > 766) { //CSS: @media (min-width: 320px) and (max-width: 767px) {
      popup.style.display = 'none';
      //popup.style.border = `${borderWidth}px solid transparent`;
      popup.style.border = borderWidth + "px solid transparent";
    }
  }

  clickHandler2 = function (e) {
    // popup.style.border = `${borderWidth}px solid #333333`
    popup.style.border = borderWidth + "px solid #333333";
  }

  clickHandler3 = function (e) {
    // popup.style.border = `${borderWidth}px solid transparent`
     popup.style.border = borderWidth + "px solid transparent";
  }

  if (popup) {
    popup.addEventListener('click', clickHandler1, false);
    popup.addEventListener('mouseover', clickHandler2, false);
    popup.addEventListener('mouseout', clickHandler3, false);

  }

  clickHandler4 = function (e) {
    document.querySelector('#popup').src = e.target.src
    document.querySelector('#popup').style.display = 'inline-block';
    // document.querySelector('#popup').style.border = `${borderWidth}px solid transparent`;
    document.querySelector('#popup').style.border = borderWidth + "px solid transparent";
  }

  clickHandler5 = function (e) {
    // e.target.style.border = `${borderWidth}px solid #333333`;
    e.target.style.border = borderWidth + "px solid #333333";
  }

  clickHandler6 = function (e) {
    // e.target.style.border = `${borderWidth}px solid transparent`;
    e.target.style.border = borderWidth + "px solid transparent";
  }

  var allImages = document.querySelectorAll("img.images");

  for (var x = 1; x < allImages.length + 1; x++) {
    document.querySelectorAll('img')[x].addEventListener('click', clickHandler4, false);
    document.querySelectorAll('img')[x].addEventListener('mouseover', clickHandler5, false);
    document.querySelectorAll('img')[x].addEventListener('mouseout', clickHandler6, false);
    //document.querySelectorAll('img')[x].style.border = `${borderWidth}px solid transparent`;
    document.querySelectorAll('img')[x].style.border = borderWidth + "px solid transparent";
  }

}