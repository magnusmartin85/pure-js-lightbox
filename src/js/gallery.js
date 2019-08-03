let images = [
    "../dist/img/01.jpg",
    "../dist/img/02.jpg",
    "../dist/img/03.jpg",
    "../dist/img/04.jpg",
    "../dist/img/05.jpg",
    "../dist/img/06.jpg",
    "../dist/img/07.jpg",
    "../dist/img/08.jpg",
    "../dist/img/09.jpg",
];

let imgTitles = [
    "Photo by Ian Turnell from Pexels",
    "Photo by Jaymantri from Pexels",
    "Photo by Markus Spiske temporausch.com from Pexels",
    "Photo by James Wheeler from Pexels",
    "Photo by Joyston Judah from Pexels",
    "Photo by Bess Hamiti from Pexels"

];

let imgDescriptions = [
    "Body of Water Between Green Leaf Trees",
    "High Angle-photography of Green Forest Trees",
    "Trees Under Blue Sky during Daytime",
    "Lake and Mountain",
    "White and Black Mountain Wallpaper",
    "Multicolored Hot Air Balloon over Calm Sea"
];

let paths = [];

let html = '';
let currentImage = '';
let currentImagePath = '';
let currentImageIndex = 0;
let currentImageNumber = 0;

/* Initial variables */
let initialImagePath = '';

/* Previous variables */
let previousImagePath = '';
let previousImageIndex = 0;
let previousImageNumber = 0;

/* Next variables */
let nextImagePath = '';
let nextImageIndex = 0;
let nextImageNumber = 0;

/* Caption variables */
let currentCaptionText = '';
let nextCaptionText = '';
let previousCaptionText = '';

let $buttonClose = $('.button-close');
let $buttonNext = $('.button-next');
let $buttonPrevious = $('.button-prev');
let $captionLeft = $('.caption-left');
let $captionRight = $('.caption-right');
let $lightboxOverlay = $('.lightbox-overlay');
let $lightboxImage = $('.lightbox-image');
let $imagesLength = images.length;

for (let i = 0; i < $imagesLength; i++) {
    html = html +
        `<div class="row my-3">
        <div class="col-12 col-md-4">
        <div class="lightbox-thumbnail-container">
        <img 
        alt="${imgDescriptions[i]}" 
        class="lazy" 
        data-original="${images[i]}" 
        src=""
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
        data-original="${images[i + 1]}" 
        src=""
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
            data-original="${images[i + 2]}"
            src=""
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
appendImageGrid();

// On load
$(document).ready(() => {
    $('.lightbox-thumbnail-container').each((index, item) => {
        initialImagePath = $(item).find('img').attr("data-original");
        $(item).attr("data-target", initialImagePath);
        paths.push(initialImagePath);
    });
});

// Trigger Lightbox on click
$('.lightbox-thumbnail-overlay, .lto-description, .lto-title').on('click', event => {
    openOverlay(event);
});


$buttonPrevious.on('click', () => {
    previousImageIndex = getPreviousImageIndex(currentImageIndex);
    previousImagePath = getPreviousImagePath(currentImageIndex);
    previousCaptionText = getCaptionText(previousImageIndex);
    previousImageNumber = previousImageIndex + 1;
    setImageText(previousCaptionText, previousImageNumber);
    showPreviousImage(previousImagePath);
    currentImageIndex = previousImageIndex;
});

$buttonNext.on('click', () => {
    nextImageIndex = getNextImageIndex(currentImageIndex);
    nextImagePath = getNextImagePath(nextImageIndex);
    nextCaptionText = getCaptionText(nextImageIndex);
    nextImageNumber = nextImageIndex + 1;
    setImageText(nextCaptionText, nextImageNumber);
    showNextImage(nextImagePath);
    currentImageIndex = nextImageIndex;
});


// Close lightboxOverlay
$buttonClose.on('click', () => {
    $lightboxOverlay.hide();
    clearPathAndIndex();
});

// Key events
$(document).keyup(event => {
    switch (event.keyCode) {
        case 27: // esc
            return $('.button-close').click();

        case 37: // left
            return $('.button-prev').click();

        case 39: // right
            return $('.button-next').click();

        default:
            return;
    }
});

// ----------------------------------------------------------
//FUNCTIONS
// ----------------------------------------------------------

function appendImageGrid() {
    $('.image-gallery').append(html);
}

function openOverlay(event) {
    event.preventDefault();
    prepareImageData(event);
    showLightboxImage(currentImagePath);
    $lightboxOverlay.fadeIn();
}

function prepareImageData(event) {
    currentImagePath = getInitialImagePath(event);
    currentImageIndex = getCurrentImageIndex(currentImagePath);
    nextImageIndex = getNextImageIndex(currentImageIndex);
    previousImageIndex = getPreviousImageIndex(currentImageIndex);
    nextImagePath = getImagePathFromIndex(nextImageIndex);
    previousImagePath = getImagePathFromIndex(previousImageIndex);
    nextCaptionText = getCaptionText(nextImageIndex);
    currentCaptionText = getCaptionText(currentImageIndex);
    previousCaptionText = getCaptionText(previousImageIndex);
    setImageText(currentCaptionText, currentImageIndex + 1)
}

function showLightboxImage(initialImagePath) {
    $lightboxImage.attr('src', initialImagePath);
}

function getInitialImagePath(event) {
    let target = $(event.target);
    if (target.is('div.lto-description') || target.is('div.lto-title')) {
        initialImagePath = $(event.target).closest('.lightbox-thumbnail-container').attr('data-target');
    } else {
        initialImagePath = $(event.target).parent().attr('data-target');
    }
    return initialImagePath;
}

function getPreviousImageIndex(index) {
    if (index === 0) {
        previousImageIndex = $imagesLength - 1;
        return previousImageIndex;
    } else {
        previousImageIndex = index - 1;
        return previousImageIndex;
    }
}

function getCurrentImageIndex(imagePath) {
    currentImageIndex = $.inArray(imagePath, images);
    return currentImageIndex;
}

function getNextImageIndex(index) {
    if (index === $imagesLength - 1) {
        nextImageIndex = 0;
        return nextImageIndex;
    } else {
        nextImageIndex = index + 1;
        return nextImageIndex;
    }
}

function setImageText(captionText, imageNumber) {
    if (typeof captionText === 'undefined') {
        $captionLeft.text('');
    } else {
        $captionLeft.text(captionText);
    }
    $captionRight.text((imageNumber) + ' von ' + $imagesLength);
    currentImageNumber = imageNumber;
    return currentImageNumber;
}

function getImagePathFromIndex(index) {
    return images[index];
}

function getCaptionText(currentImageIndex) {
    return imgDescriptions[currentImageIndex];
}

function showPreviousImage(previousImagePath) {
    $lightboxImage.attr("src", previousImagePath);
}

function showNextImage(nextImagePath) {
    $lightboxImage.attr("src", nextImagePath);
}

function getPreviousImagePath(imageIndex) {
    if (imageIndex === 0) {
        previousImagePath = images[$imagesLength - 1];
        return previousImagePath;
    } else {
        previousImagePath = images[previousImageIndex];
        return previousImagePath;
    }
}

function getNextImagePath(imageIndex) {
    if (imageIndex === $imagesLength) {
        return images[0];
    }
    return images[imageIndex];
}

function clearPathAndIndex() {
    currentImageIndex = 0;
    currentImage = '';
    currentImagePath = '';
}
