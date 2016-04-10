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
    "../src/img/5.jpeg",
    "../src/img/6.jpeg"
];

var paths = [];

var html = '';
var currentImage = '';
var currentImagePath = '';
var currentImageIndex = 0;

/* Initial Variables */
var initialImagePath = '';

/* Previous Variables */
var previousImagePath = '';
var previousImageIndex = 0;

/* Next Variables */
var nextImagePath = '';
var nextImageIndex = 0;

/* Caption Variables */
var captionText = '';
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
    prepareImageData();
    showOverlayImage(currentImagePath);
    $overlay.fadeIn();
}

function prepareImageData() {
    currentImagePath = getInitialImagePath(event);
    currentImageIndex = getImageIndex(currentImagePath);
    nextImageIndex = getNextImageIndex(currentImageIndex);
    previousImageIndex = getPreviousImageIndex(currentImageIndex);
    nextImagePath = getImagePathFromIndex(nextImageIndex);
    previousImagePath = getImagePathFromIndex(previousImageIndex);
    nextCaptionText = getCaptionText(nextImagePath);
    previousCaptionText = getCaptionText(previousImagePath);
}


/* NEXT AND PREVIOUS */
$buttonPrevious.click(function () {
    showPreviousImage();
});

$buttonNext.click(function () {
    setCaptionText(getCaptionText(currentImagePath));
    setNextImagePath(currentImageIndex);
    nextImageIndex = getNextImageIndex(currentImageIndex);
    showNextImage(nextImagePath);
    currentImagePath = nextImagePath;
    console.log(currentImagePath);
    currentImageIndex = nextImageIndex;
    console.log(currentImageIndex);
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
    getImageIndex(initialImagePath);
    return initialImagePath;

}

function getImagePath() {
    return $overlayImage.attr('src');
}

function getPreviousImageIndex(index) {
    if (index == 0) {
        previousImageIndex = $imagesLength;
        return previousImageIndex;
    }
    else {
        previousImageIndex = index - 1;
        return previousImageIndex;
    }
}

function getImageIndex(imagePath) {
    currentImageIndex = $.inArray(imagePath, images);
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

function setImageIndex(index) {
    $captionRight.text((index + 1) + ' von ' + $imagesLength);
    currentImageIndex = index;
}

function getImagePathFromIndex(index) {
    imagePath = images[index];
    return imagePath;
}
function getCaptionText(imagePath) {
    currentImageIndex = getImageIndex(imagePath);
    captionText = captions[currentImageIndex];
    return captionText;
}

function setCaptionText(captionText) {
    if (typeof captionText === 'undefined') {
        $captionLeft.text('');
    }
    else {
        $captionLeft.text(captionText);
    }
}

function showPreviousImage() {
    $overlayImage.attr("src", previousImagePath);
}

function showNextImage(nextImagePath) {
    $overlayImage.attr("src", nextImagePath);
}

function setPreviousImagePath(imageIndex) {
    if(imageIndex == 0) {
        previousImagePath = images[$imagesLength - 1];
        return previousImagePath;
    }
    else {
        previousImagePath = images[imageIndex - 1];
        return previousImagePath;
    }
}

function setNextImagePath(imageIndex) {
    if(imageIndex == $imagesLength - 1) {
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
