let imgUrls = [
    '01.jpg',
    '02.jpg',
    '03.jpg',
    '04.jpg',
    '05.jpg',
    '06.jpg',
    '07.jpg',
    '08.jpg',
    '09.jpg',
];

let imgTitles = [
    'Photo by Ian Turnell from Pexels',
    'Photo by Jaymantri from Pexels',
    'Photo by Markus Spiske temporausch.com from Pexels',
    'Photo by James Wheeler from Pexels',
    'Photo by Joyston Judah from Pexels',
    'Photo by Bess Hamiti from Pexels'
];

let imgDescriptions = [
    'Body of Water Between Green Leaf Trees',
    'High Angle-photography of Green Forest Trees',
    'Trees Under Blue Sky during Daytime',
    'Lake and Mountain',
    'White and Black Mountain Wallpaper',
    'Multicolored Hot Air Balloon over Calm Sea'
];

// initial variables
let html = '';
let initialImgUrl = '';
let paths = [];

// variables for current img
let currentImg = '';
let currentImgIndex = 0;
let currentImgUrl = '';

// variables for previous img
let previousImgIndex = 0;
let previousImgUrl = '';

// variables for next img
let nextImgIndex = 0;
let nextImgUrl = '';

// variables for caption
let currentCaptionText = '';
let nextCaptionText = '';
let previousCaptionText = '';
let imgCount = imgUrls.length;

for (let i = 0; i < imgCount; i++) {
    html = html +
        `<div class="row my-3">
        <div class="col-12 col-md-4">
        <div class="lightbox-thumbnail-container">
        <img 
        alt="${imgDescriptions[i]}" 
        class="lazy" 
        src="img/${imgUrls[i]}"
        width="400" 
        />
        <div class="lightbox-thumbnail-overlay">
        <div class="lto-title">${imgTitles[i]}</div>
        <div class="lto-description">${imgDescriptions[i]}</div> 
        </div> 
        </div> 
        </div> 
        <div class="col-12 col-md-4"> 
        <div class="lightbox-thumbnail-container"> 
        <img 
        alt="${imgDescriptions[i + 1]}" 
        class="lazy" 
        src="img/${imgUrls[i + 1]}" 
        width="400" 
        />
        <div class="lightbox-thumbnail-overlay"> 
        <div class="lto-title">${imgTitles[i + 1]}</div> 
        <div class="lto-description">${imgDescriptions[i + 1]}</div> 
        </div> 
        </div> 
        </div>
        <div class="col-12 col-md-4"> 
        <div class="lightbox-thumbnail-container"> 
        <img 
            alt="${imgDescriptions[i + 2]}"
            class="lazy" 
            src="img/${imgUrls[i + 2]}"
            width="400" 
        />
        <div class="lightbox-thumbnail-overlay"> 
        <div class="lto-title">${imgTitles[i + 2]}</div> 
        <div class="lto-description">${imgDescriptions[i + 2]}</div> 
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
    $('.lightbox-thumbnail-container').each((index, item) => {
        initialImgUrl = $(item).find('img').attr('src');
        $(item).attr('src', initialImgUrl);
        paths.push(initialImgUrl);
    });
});

// Trigger Lightbox on click
$('.lightbox-thumbnail-overlay, .lto-description, .lto-title')
    .on('click', event => {
        openOverlay(event);
    });

// Handle click on previous img button
$('.btn-prev').on('click', () => {
    previousCaptionText = getCaptionText(previousImgIndex);
    previousImgIndex = getPreviousImgIndex(currentImgIndex);
    previousImgUrl = getPreviousImgUrl(currentImgIndex);
    currentImgIndex = previousImgIndex;
    setImgText(previousCaptionText, previousImgIndex - 1);
    showLightboxImg(previousImgUrl);
});

// Handle click on next img button
$('.btn-next').on('click', () => {
    nextCaptionText = getCaptionText(nextImgIndex);
    nextImgIndex = getNextImgIndex(currentImgIndex);
    nextImgUrl = getNextImgPath(nextImgIndex);
    currentImgIndex = nextImgIndex;
    setImgText(nextCaptionText, nextImgIndex + 1);
    showLightboxImg(nextImgUrl);
});

// Close Lightbox
$('.btn-close').on('click', () => {
    $('.lightbox-overlay').hide();
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
    let html = `<div class="btn-close">
        <span class="bar"></span>
        <span class="bar"></span>
        </div>

        <div class="lightbox-overlay-row">
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
        <div class="lightbox-item-row">
        <div class="col-12">
        <img alt=""
class="lightbox-img"
    src=""
        />
        </div>

        <div class="col-12">
        <div class="row">
        <div class="col-8">
        <p class="caption-left"></p>
        </div>
        <div class="col-4">
        <p class="caption-right"></p>
        </div>
        </div>
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
    `;
    $('.lightbox-overlay').append(html);
}

function clearPathAndIndex() {
    currentImgIndex = 0;
    currentImg = '';
    currentImgUrl = '';
}

function getInitialImgUrl(event) {
    let target = $(event.target);
    if (target.is('div.lto-description') || target.is('div.lto-title')) {
        initialImgUrl = $(event.target)
            .closest('.lightbox-thumbnail-container')
            .attr('src');
    } else {
        initialImgUrl = $(event.target).parent().attr('src');
    }
    return initialImgUrl;
}

function getPreviousImgIndex(index) {
    if (index === 0) {
        return imgCount - 1;
    } else {
        return index - 1;
    }
}

function getCurrentImgIndex(imgUrl) {
    return $.inArray(imgUrl, imgUrls);
}

function getNextImgIndex(index) {
    if (index === imgCount - 1) {
        return 0;
    } else {
        return index + 1;
    }
}

function getImgUrlFromIndex(index) {
    return imgUrls[index];
}

function getCaptionText(currentImgIndex) {
    return imgDescriptions[currentImgIndex];
}

function getPreviousImgUrl(imgIndex) {
    if (imgIndex === 0) {
        return imgUrls[imgCount - 1];
    } else {
        return imgUrls[previousImgIndex];
    }
}

function getNextImgPath(imgIndex) {
    if (imgIndex === imgCount) {
        return imgUrls[0];
    }
    return imgUrls[imgIndex];
}

function openOverlay(event) {
    event.preventDefault();
    prepareImgData(event);
    showLightboxImg(currentImgUrl);
    $('.lightbox-overlay').fadeIn();
}

function prepareImgData(event) {
    currentCaptionText = getCaptionText(currentImgIndex);
    currentImgIndex = getCurrentImgIndex(currentImgUrl);
    currentImgUrl = getInitialImgUrl(event);
    nextCaptionText = getCaptionText(nextImgIndex);
    nextImgIndex = getNextImgIndex(currentImgIndex);
    nextImgUrl = getImgUrlFromIndex(nextImgIndex);
    previousCaptionText = getCaptionText(previousImgIndex);
    previousImgIndex = getPreviousImgIndex(currentImgIndex);
    previousImgUrl = getImgUrlFromIndex(previousImgIndex);
    setImgText(currentCaptionText, currentImgIndex + 1)
}

function setImgText(captionText, imgNumber) {
    if (typeof captionText === 'undefined') {
        $('.caption-left').text('');
    } else {
        $('.caption-left').text(captionText);
    }
    $('.caption-right').text(imgNumber + ' / ' + imgCount);
}

function showLightboxImg(imgUrl) {
    $('.lightbox-img').attr('src', imgUrl);
}
