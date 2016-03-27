var $icn_prv = $('<div class="grid__col--4"><div class="icn-prv"><a href="#"><span class="icon-bar"></span><span class="icon-bar"></span></a></div></div>');
var $overlay = $('<div id="overlay"></div>');
var $icn_nxt = $('<div class="grid__col--4"><div class="icn-nxt"><a href="#"><span class="icon-bar"></span><span class="icon-bar"></span></a></div></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
var $overlayClose = $("<div class='overlay-close'><div><a href='#'><span class='close-button'><span class='icon-bar'></span><span class='icon-bar'></span></span></a></div></div>");


var html = '';
var currentImage = '';
var captionText = '';
var nextImageLocation = '';
var previousImageLocation;
var imageLocation = '';
var currentImageIndex = 0;

appendOverlay();

var images = [
    "../src/img/1.jpeg",
    "../src/img/2.jpeg",
    "../src/img/3.jpeg",
    "../src/img/4.jpeg",
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

for (var i = 0; i < (images.length); i++) {
    html = html +
        '<div class="row">' +
        '<div class="grid__col--4">' +
        '<a href="#"><img class="lazy" data-original="' + images[i] + '" alt="' + captions[i] + '" /></a>' +
        '</div>' +

        '<div class="grid__col--4">' +
        '<a href="#"><img class="lazy" data-original="' + images[i + 1] + '" alt="' + captions[i + 1] + '" /></a>' +
        '</div>' +

        '<div class="grid__col--4">' +
        '<a href="#"><img class="lazy" data-original="' + images[i + 2] + '" alt="' + captions[i + 2] + '" /></a>' +
        '</div>' +
        '</div>';
    i = i + 2;
}

appendImageGrid();
appendOverlay();

//Capture the click event on a link to an image
$(".image-gallery a").click(function (event) {
    event.preventDefault();
    currentImage = event.target;

    imageLocation = $(this).find('img').attr("data-original");
    //Update overlay with the image linked in the link
    console.log(imageLocation);
    $image.attr("src", imageLocation);
    //Show the overlay.
    $overlay.fadeIn();

    captionText = getCaption(event);
    setCaption(captionText);


    $icn_prv.click(function () {
        $overlay.fadeIn();
        currentImageIndex = $.inArray(imageLocation, images);
        if (currentImageIndex == 0) {
            previousImageLocation = images[(images.length - 1)];
            captionText = captions[(images.length - 1)];
        }
        else {
            previousImageLocation = images[currentImageIndex - 1];
            captionText = captions[currentImageIndex - 1];
        }
        $image.attr("src", previousImageLocation);
        imageLocation = $image.attr("src");
        setCaption(captionText);
    });

    $icn_nxt.click(function () {
        $overlay.fadeIn();
        currentImageIndex = $.inArray(imageLocation, images);
        if (currentImageIndex < (images.length - 1)) {
            nextImageLocation = images[currentImageIndex + 1];
            captionText = captions[currentImageIndex + 1];
        }
        else {
            nextImageLocation = images[0];
            captionText = captions[0];
        }

        $image.attr("src", nextImageLocation);
        imageLocation = $image.attr("src");
        setCaption(captionText);
    });

});

//When overlay is clicked
$overlayClose.click(function () {
    //Hide the overlay
    $overlay.hide();
});

function getCaption(event) {
    captionText = $(event.target).attr("alt");
    return captionText;
}

function setCaption(captionText) {
    if (typeof captionText === 'undefined') {
        $caption.text('');
    }
    else {
        $caption.text(captionText);
    }
}

function appendImageGrid() {
    $('.image-gallery').append(html);
}

function appendOverlay() {
    $overlay.append($overlayClose);
    $overlay.append($icn_prv);
    $overlay.append($image);
    $overlay.append($icn_nxt);
    $overlay.append($caption);
    $("body").append($overlay);
}
