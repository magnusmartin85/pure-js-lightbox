var images = [
    "../src/img/img24.jpg",
    "../src/img/img19.jpg",
    "../src/img/img20.jpg",
    "../src/img/img23.jpg",
    "../src/img/5.jpeg",
    "../src/img/6.jpeg"
];

var captions = [
    "caption1",
    "caption2",
    "../src/img/3.jpeg",
    "../src/img/4.jpeg",
    "../src/img/5.jpeg",
    "../src/img/6.jpeg"
];

var html = '';
var currentImage = '';
var currentImagePath = '';
var currentImageIndex = $.inArray(currentImagePath, images);

var initialImagePath = '';
var previousImagePath = '';
var nextImagePath = '';

var captionText = '';

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
        currentImagePath = $(this).prev('div').find('img').attr("data-original");
        $(this).attr("data-target", currentImagePath);
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

// Trigger Overlay on click
$(".lightbox-thumbnail-hover-wrap, .lthw--title, .lthw--desc").click(function (event) {
    openOverlay(event);
});

// Trigger thumbnail-overlay on hover
var $wrap = $('.lightbox-thumbnail-hover-wrap');

$wrap.on('mouseenter', function () {
    $(this).css('opacity', '1');
});

$wrap.on('mouseleave', function () {
    $(this).css('opacity', '0');
});


$buttonPrevious.click(function () {
    showPreviousImage();
});

$buttonNext.click(function () {
    showNextImage();
});

//
$overlayClose.click(function () {
    $overlay.hide();
    currentImageIndex = 0;
    currentImage = '';

});


// ----------------------------------------------------------
//FUNCTIONS
// ----------------------------------------------------------

function appendImageGrid() {
    $('.image-gallery').append(html);
}

function openOverlay(event) {
    event.preventDefault();
    initialImagePath = getInitialImagePath(event);
    showOverlayImage(initialImagePath);
    $overlay.fadeIn();
    setCaptionText(getCaptionText(initialImagePath));
    setImageIndex(getCurrentImageIndex(initialImagePath) + 1);
}

function getInitialImagePath(event) {
    initialImagePath = $(event.target).closest('.lightbox-thumbnail-hover-wrap').attr('data-target');
    return initialImagePath;
}

function showOverlayImage(initialImagePath) {
    $overlayImage.attr('src', initialImagePath);
}

function getCaptionText(currentImagePath) {
    currentImageIndex = getCurrentImageIndex(currentImagePath);
    captionText = captions[currentImageIndex];
    return captionText;
}

function getCurrentImageIndex(currentImagePath) {
    currentImageIndex = $.inArray(currentImagePath, images);
    return currentImageIndex;
}

function setCaptionText(captionText) {
    if (typeof captionText === 'undefined') {
        $captionLeft.text('');
    }
    else {
        $captionLeft.text(captionText);
    }
    return captionText;
}

function setImageIndex(index) {
    $captionRight.text((index) + ' von ' + $imagesLength);
}

function showPreviousImage() {
    currentImagePath = getCurrentImagePath();
    currentImageIndex = getCurrentImageIndex(currentImagePath);
    if (currentImageIndex == 0) {
        previousImagePath = images[($imagesLength - 1)];
        setCaptionText(currentImagePath);
        setImageIndex($imagesLength - 1);
    }
    else {
        previousImagePath = setPreviousImagePath[currentImageIndex - 1];
        setCaptionText(currentImagePath);
        setImageIndex(currentImageIndex - 1);
    }
    $overlayImage.attr("src", previousImagePath);
}

function showNextImage() {
    currentImagePath = getCurrentImagePath();
    currentImageIndex = getCurrentImageIndex(currentImagePath);
    if (currentImageIndex == 0) {
        nextImagePath = setNextImagePath(currentImageIndex);
        setCaptionText(captions[currentImageIndex + 1]);
        setImageIndex(currentImageIndex + 1);
    }
    else if (currentImageIndex < ($imagesLength - 1)) {
        nextImagePath = setNextImagePath(0);
        setCaptionText(captions[0]);
        setImageIndex(1);
    }
    $overlayImage.attr("src", nextImagePath);
}

function setPreviousImagePath(currentImageIndex) {
    previousImagePath = images[currentImageIndex - 1];
    return previousImagePath;
}

function setNextImagePath(currentImageIndex) {
    nextImagePath = images[currentImageIndex + 1];
    return nextImagePath;
}

function getCurrentImagePath() {
    currentImagePath = $overlayImage.attr("src");
    return currentImagePath;
}
