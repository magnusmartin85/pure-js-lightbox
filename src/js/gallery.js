var html = '';
var currentImageIndex = 0;
var currentImage = '';
var captionText = '';
var height = 0;

var icn_prv = '';
var icn_nxt = '';

var locations = {
    nextImageLocation: '',
    previousImageLocation: '',
    imageLocation: ''
};


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
                            '</div>'+
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
        '</div>'+
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
        '</div>'+
        '</div>' +
        '</div>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>';
    i = i + 2;
}

appendImageGrid();


//Capture the click event on a link to an image
$(".image-gallery a").click(function (event) {
    openOverlay(event);
});

$icn_prv.click(function (event) {
    showPrvImg(event);
});

$icn_nxt.click(function (event) {
    showNxtImg(event);
});

//When overlay is clicked
$overlayClose.click(function () {
    $overlay.hide();
    currentImageIndex = 0;
    currentImage = '';
    captionText = '';
    locations.nextImageLocation = '';
    locations.previousImageLocation = '';
    locations.imageLocation = '';
});

function getCaption(event) {
    captionText = $(event.target).attr("alt");
    return captionText;
}

function setCaption(captionText) {
    if (typeof captionText === 'undefined') {
        $captionLeft.text('');
    }
    else {
        $captionLeft.text(captionText);
    }
}

function appendImageGrid() {
    $('.image-gallery').append(html);
}



function openOverlay(event) {
    event.preventDefault();
    currentImage = event.target;
    locations.imageLocation = $(event.target).attr("data-original");
    console.log(locations.imageLocation);
    $image.attr("src", locations.imageLocation);
    $overlay.fadeIn();

    setCaption(getCaption(event));
}

function showPrvImg(event) {
    $overlay.fadeIn();
    currentImageIndex = $.inArray(locations.imageLocation, images);
    if (currentImageIndex == 0) {
        locations.previousImageLocation = images[(images.length - 1)];
        captionText = captions[(images.length - 1)];
    }
    else {
        locations.previousImageLocation = images[currentImageIndex - 1];
        captionText = captions[currentImageIndex - 1];
    }
    $image.attr("src", locations.previousImageLocation);
    locations.imageLocation = $image.attr("src");
    setCaption(captionText);
}

function showNxtImg(event) {
    $overlay.fadeIn();
    currentImageIndex = $.inArray(locations.imageLocation, images);
    if (currentImageIndex < (images.length - 1)) {
        locations.nextImageLocation = images[currentImageIndex + 1];
        captionText = captions[currentImageIndex + 1];
    }
    else {
        locations.nextImageLocation = images[0];
        captionText = captions[0];
    }

    $image.attr("src", locations.nextImageLocation);
    locations.imageLocation = $image.attr("src");
    setCaption(captionText);
}

function getHeight (event) {
    height = $(event.target).height();
    return height;
}

function removeImageOverlay (event) {
    console.log(event.target);
    $(event.target).find('.image-hover-overlay').remove();
}
