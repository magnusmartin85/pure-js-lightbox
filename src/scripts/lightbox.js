import $ from 'jquery';
import images from '../data/imageData';

// initial variables
let html = '';
const lightboxContainer = $('.lc');

// variables for current img
let currentImgIndex = 0;

// variables for previous img
let prevImgIndex = 0;
let prevImg = '';

// variables for next img
let nextImgIndex = 0;
let nextImg = '';

// variables for caption
let currentCaptionText = '';
let nextDescriptionText = '';
let prevDescriptionText = '';
let imgCount = images.length;

for (let i = 0; i < imgCount; i++) {
    html = html +
        `<div class="row my-3">
        <div class="col-12 col-md-4">
        <div class="ltc">
        <img 
        alt="${images[i].description}" 
        class="lto-img" 
        data-id="${images[i].id}"
        src="${images[i].file}"
        width="400" 
        />
        <div class="lto">
        <div class="lto-title">${images[i].description}</div>
        <div class="lto-description">${images[i].source}</div> 
        </div> 
        </div> 
        </div> 
        <div class="col-12 col-md-4"> 
        <div class="ltc"> 
        <img 
        alt="${images[i + 1].description}" 
        class="lto-img" 
        data-id="${images[i + 1].id}"
        src="${images[i + 1].file}" 
        width="400" 
        />
        <div class="lto"> 
        <div class="lto-title">${images[i + 1].description}</div> 
        <div class="lto-description">${images[i + 1].source}</div> 
        </div> 
        </div> 
        </div>
        <div class="col-12 col-md-4"> 
        <div class="ltc"> 
        <img 
        alt="${images[i + 2].description}"
        class="lto-img" 
        data-id="${images[i + 2].id}"
        src="${images[i + 2].file}"
        width="400" 
        />
        <div class="lto"> 
        <div class="lto-title">${images[i + 2].description}</div> 
        <div class="lto-description">${images[i + 2].source}</div> 
        </div> 
        </div>  
        </div> 
        </div>`;
    i = i + 2;
}

appendLightboxImgs();

// On load
$(document).ready(() => {
    appendLightboxOverlay();
});

// Trigger Lightbox on click
$('.lto, .lto-description, .lto-title')
    .on('click', event => {
        openOverlay(event);
    });

// Handle click on previous img button
$(lightboxContainer).on('click', '.btn-prev', () => {
    prevImgIndex = getPrevImgIndex(currentImgIndex);
    prevDescriptionText = getDescriptionText(prevImgIndex);
    prevImg = getPrevImg(currentImgIndex, prevImgIndex);
    currentImgIndex = prevImgIndex;
    setImgDescription(prevDescriptionText);
    setImgNumber(prevImgIndex + 1);
    showLightboxImg(prevImg);
});

// Handle click on next img button
$(lightboxContainer).on('click', '.btn-next', () => {
    nextImgIndex = getNextImgIndex(currentImgIndex);
    nextDescriptionText = getDescriptionText(nextImgIndex);
    nextImg = getNextImg(nextImgIndex, imgCount);
    currentImgIndex = nextImgIndex;
    setImgDescription(nextDescriptionText);
    setImgNumber(nextImgIndex + 1);
    showLightboxImg(nextImg);
});

// Close Lightbox
$(lightboxContainer).on('click', '.btn-close', () => {
    $('.lo').hide();
    $('body').removeClass('noscroll');
    clearPathAndIndex();
});

// Keyboard events
$(document).on('keyup', event => {
    switch (event.keyCode) {
        case 27: // esc-key
            return $('.btn-close').click();

        case 37: // left-key
            return $('.btn-prev').click();

        case 39: // right-key
            return $('.btn-next').click();

        default:
            return;
    }
});


// ----------------------------------------------------------
// FUNCTIONS
// ----------------------------------------------------------

function appendLightboxImgs() {
    $('.lightbox').append(html);
}

function appendLightboxOverlay() {
    let html = `<div class="row">
        <div class="col-2 col-md-2">
        </div>
        <div class="col-8 col-md-8">
        </div>
        <div class="col-2 col-md-2">    
        <div class="btn-close">
        <div>
        <span class="bar"></span>
        <span class="bar"></span>
        </div>
        </div> 
        </div>
        </div>
        
        <div class="lo-row">
        <div class="col-2 col-md-2">
        <div class="btn-prev-row">
        <div class="btn-prev">
        <div>
        <span class="bar"></span>
        <span class="bar"></span>
        </div>
        </div>
        </div>
        </div>
        <div class="col-8 col-md-8">
        <div class="loi-row">
        <div class="col-12">
        <img alt=""
        class="lo-img"
        src=""
        />
        </div>
        </div>
        </div>

        <div class="col-2 col-md-2">
        <div class="btn-next-row">
        <div class="btn-next">
        <div>
        <span class="bar"></span>
        <span class="bar"></span>
        </div>
        </div>
        </div>
        </div>
        </div>
        
        <div class="row">
        <div class="col-2 col-md-2">
        </div>
        <div class="col-5 col-md-5">
        <p class="lo-description"></p>
        </div>
        <div class="col-3 col-md-3">    
        <p class="lo-img-number"></p>
        </div>
        <div class="col-2 col-md-2">
        </div>
        </div>
        </div>
    `;
    $('.lo').append(html);
}

function clearPathAndIndex() {
    currentImgIndex = 0;
}

function getPrevImgIndex(index) {
    if (index === 0) {
        return imgCount - 1;
    } else {
        return index - 1;
    }
}

function getCurrentImgIndex(event) {
    let target = $(event.target);
    let elem;
    if (target.attr('class') !== 'lto') {
        elem = target.parent('.lto');
    } else {
        elem = target;
    }

    return Number($(elem).prev('.lto-img').attr('data-id'));
}

function getNextImgIndex(index) {
    if (index === (imgCount - 1)) {
        return 0;
    } else {
        return index + 1;
    }
}

function getImgFromIndex(index) {
    return images[index].file;
}

function getDescriptionText(currentImgIndex) {
    return images[currentImgIndex].description;
}

function getPrevImg(imgIndex, prevImgIndex) {
    if (imgIndex === 0) {
        return images[imgCount - 1].file;
    } else {
        return images[prevImgIndex].file;
    }
}

function getNextImg(imgIndex, imgCount) {
    if (imgIndex === imgCount) {
        return images[0].file;
    }
    return images[imgIndex].file;
}

function openOverlay(event) {
    event.preventDefault();
    prepareImgData(event);
    const currentImgIndex = getCurrentImgIndex(event);
    let currentImg = images[currentImgIndex].file;
    showLightboxImg(currentImg);
    $('.lo').fadeIn();
    $('body').addClass('noscroll');
}

function prepareImgData(event) {
    currentCaptionText = getDescriptionText(currentImgIndex);
    currentImgIndex = getCurrentImgIndex(event);
    nextImgIndex = getNextImgIndex(currentImgIndex);
    nextDescriptionText = getDescriptionText(nextImgIndex);
    nextImg = getImgFromIndex(nextImgIndex);
    prevImgIndex = getPrevImgIndex(currentImgIndex);
    prevDescriptionText = getDescriptionText(prevImgIndex);
    prevImg = getImgFromIndex(prevImgIndex);
    setImgDescription(currentCaptionText, currentImgIndex + 1)
}

function setImgDescription(descriptionText) {
    if (typeof descriptionText !== 'undefined') {
        $('.lo-description').text(descriptionText);
    }
}

function setImgNumber(imgNumber) {
    $('.lo-img-text').text(imgNumber + ' / ' + imgCount);
}

function showLightboxImg(img) {
    $('.lo-img').attr('src', img);
}
