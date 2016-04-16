var images = [
    "../src/img/01.jpg",
    "../src/img/02.jpg",
    "../src/img/03.jpg",
    "../src/img/04.jpg",
    "../src/img/5.jpeg",
    "../src/img/6.jpeg"
];

var captions = [
    "caption1",
    "caption2",
    "caption3",
    "caption4",
    "caption5",
    "caption6"
];

var paths = [];

var html = '';
var currentImage = '';
var currentImagePath = '';
var currentImageIndex = 0;
var currentImageNumber = 0;

/* Initial Variables */
var initialImagePath = '';

/* Previous Variables */
var previousImagePath = '';
var previousImageIndex = 0;
var previousImageNumber = 0;

/* Next Variables */
var nextImagePath = '';
var nextImageIndex = 0;
var nextImageNumber = 0;

/* Caption Variables */
var currentCaptionText = '';
var nextCaptionText = '';
var previousCaptionText = '';

var $overlayClose = $('.overlay-close');
var $overlayImage = $('.overlay-image');
var $overlay = $('#lightbox-overlay');
var $captionLeft = $('.caption-left');
var $captionRight = $('.caption-right');

var $buttonPrevious = $('.icn-prv');
var $buttonNext = $('.icn-nxt');


var $imagesLength = images.length;
for (var i = 0; i < $imagesLength; i++) {
    html = html +
        '<div class="row">' +
        '<div class="grid__col--4">' +
        '<div class="lightbox-item-wrapper">' +
        '<a class="lightbox-thumbnail" href="#">' +
        '<div class="lightbox-thumbnail-default-wrap">' +
        '<img width="400" class="lazy" data-original="' + images[i] + '" alt="' + captions[i] + '" />' +
        '</div>' +
        '<div class="lightbox-thumbnail-hover-wrap">' +
        '<div class="lthw--align-left">' +
        '<div class="lthw--body">' +
        '<div class="lthw--title">Amet conse ctetur</div>' +
        '<div class="lthw--desc">Lorem ipsum dolor sit amet conse' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '</div>' +
        '</div>' +

        '<div class="grid__col--4">' +
        '<div class="lightbox-item-wrapper">' +
        '<a class="lightbox-thumbnail" href="#">' +
        '<div class="lightbox-thumbnail-default-wrap">' +
        '<img width="400" class="lazy" data-original="' + images[i + 1] + '" alt="' + captions[i + 1] + '" />' +
        '</div>' +
        '<div class="lightbox-thumbnail-hover-wrap">' +
        '<div class="lthw--align-left">' +
        '<div class="lthw--body">' +
        '<div class="lthw--title">Amet conse ctetur</div>' +
        '<div class="lthw--desc">Lorem ipsum dolor sit amet conse' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '</div>' +
        '</div>' +

        '<div class="grid__col--4">' +
        '<div class="lightbox-item-wrapper">' +
        '<a class="lightbox-thumbnail" href="#">' +
        '<div class="lightbox-thumbnail-default-wrap">' +
        '<img width="400" class="lazy" data-original="' + images[i + 2] + '" alt="' + captions[i + 2] + '" />' +
        '</div>' +
        '<div class="lightbox-thumbnail-hover-wrap">' +
        '<div class="lthw--align-left">' +
        '<div class="lthw--body">' +
        '<div class="lthw--title">Amet conse ctetur</div>' +
        '<div class="lthw--desc">Lorem ipsum dolor sit amet conse' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>';
    i = i + 2;
}

appendImageGrid();

// On load
$(document).ready(function () {
    $('.lightbox-thumbnail-hover-wrap').each(function () {
        initialImagePath = $(this).prev('div').find('img').attr("data-original");
        $(this).attr("data-target", initialImagePath);
        paths.push(initialImagePath);
    });
});

// Button hover states
$buttonNext.find('a').mouseenter(function (event) {
    $(event.target).find('.icon-bar').css('background-color', '#fff');
});

$buttonNext.find('a').mouseleave(function (event) {
    $(event.target).find('.icon-bar').css('background-color', '#BABAB5');
});

$buttonPrevious.find('a').mouseenter(function (event) {
    $(event.target).find('.icon-bar').css('background-color', '#fff');
});

$buttonPrevious.find('a').mouseleave(function (event) {
    $(event.target).find('.icon-bar').css('background-color', '#BABAB5');
});

var $wrap = $('.lightbox-thumbnail-hover-wrap');

// Trigger Overlay on click
$('.lightbox-thumbnail-hover-wrap, .lthw--desc, .lthw--title').click(function (event) {
    openOverlay(event);
});

// Trigger thumbnail-overlay on hover
$wrap.on('mouseenter', function () {
    $(this).css('opacity', '1');
});

$wrap.on('mouseleave', function () {
    $(this).css('opacity', '0');
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
    showOverlayImage(currentImagePath);
    $overlay.fadeIn();
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
    currentImageNumber = currentImageIndex + 1;
    setImageText(currentCaptionText, currentImageNumber)
}


/* NEXT AND PREVIOUS */
$buttonPrevious.click(function () {
    previousImageIndex = getPreviousImageIndex(currentImageIndex);
    previousImagePath = getPreviousImagePath(currentImageIndex);
    previousCaptionText = getCaptionText(previousImageIndex);
    previousImageNumber = previousImageIndex + 1;
    setImageText(previousCaptionText, previousImageNumber);
    showPreviousImage(previousImagePath);
    currentImageIndex = previousImageIndex;
});

$buttonNext.click(function () {
    nextImageIndex = getNextImageIndex(currentImageIndex);
    nextImagePath = getNextImagePath(nextImageIndex);
    nextCaptionText = getCaptionText(nextImageIndex);
    nextImageNumber = nextImageIndex + 1;
    setImageText(nextCaptionText, nextImageNumber);
    showNextImage(nextImagePath);
    currentImageIndex = nextImageIndex;
});


// Overlay Close
$overlayClose.click(function () {
    $overlay.hide();
    clearPathAndIndex();
});

function showOverlayImage(initialImagePath) {
    $overlayImage.attr('src', initialImagePath);
}

function getInitialImagePath(event) {
    var target = $(event.target);
    if ( target.is('div.lthw--desc') ||  target.is('div.lthw--title') ) {
        initialImagePath = $(event.target).closest('.lightbox-thumbnail-hover-wrap').attr('data-target');
    }
    else {
        initialImagePath = $(event.target).attr('data-target');
    }
    return initialImagePath;
}

function getPreviousImageIndex(index) {
    if (index == 0) {
        previousImageIndex = $imagesLength - 1;
        return previousImageIndex;
    }
    else {
        previousImageIndex = index - 1;
        return previousImageIndex;
    }
}

function getCurrentImageIndex(imagePath) {
    currentImageIndex = $.inArray(imagePath, images);
    console.log(currentImageIndex);
    return currentImageIndex;
}

function getNextImageIndex(index) {
    if (index == $imagesLength - 1) {
        nextImageIndex = 0;
        return nextImageIndex;
    }
    else {
        nextImageIndex = index + 1;
        return nextImageIndex;
    }
}

function setImageText(captionText, imageNumber) {
    if (typeof captionText === 'undefined') {
        $captionLeft.text('');
    }
    else {
        $captionLeft.text(captionText);
    }
    $captionRight.text((imageNumber) + ' von ' + $imagesLength);
    currentImageNumber = imageNumber;
    return currentImageNumber;
}

function getImagePathFromIndex(index) {
    imagePath = images[index];
    return imagePath;
}

function getCaptionText(currentImageIndex) {
    captionText = captions[currentImageIndex];
    return captionText;
}

function showPreviousImage(previousImagePath) {
    $overlayImage.attr("src", previousImagePath);
}

function showNextImage(nextImagePath) {
    $overlayImage.attr("src", nextImagePath);
}

function getPreviousImagePath(imageIndex) {
    if(imageIndex == 0) {
        previousImagePath = images[$imagesLength - 1];
        return previousImagePath;
    }
    else {
        previousImagePath = images[previousImageIndex];
        return previousImagePath;
    }
}

function getNextImagePath(imageIndex) {
    if(imageIndex == $imagesLength) {
        nextImagePath = images[0];
        return nextImagePath;
    }
    else {
        nextImagePath = images[imageIndex];
        return nextImagePath;
    }
}

function clearPathAndIndex () {
    currentImageIndex = 0;
    currentImage = '';
    currentImagePath = '';
}
