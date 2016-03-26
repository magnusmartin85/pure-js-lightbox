var $icn_prv = $('<div class="grid__col--4 icn-prv"><a href="#">&#60;</a></div>');
var $overlay = $('<div class="grid__col--4" id="overlay"> </div>');
var $icn_nxt = $('<div class="grid__col--4 icn-nxt"><a href="#">&#62;</a></div>');

var $image = $("<img>");
var $caption = $("<p></p>");

var currentImage;

var images = [
    "../src/img/1.jpeg",
    "../src/img/2.jpeg",
    "../src/img/3.jpeg",
    "../src/img/4.jpeg",
    "../src/img/5.jpeg",
    "../src/img/6.jpeg"
];


for (var i = 0; i < images.length; i++) {

    var html;
    html = html +
        '<div class="row">' +
        '<div class="grid__col--4">' +
        '<a href="#"><img class="lazy" data-original="' + images[i] + '" alt="This is a nice caption" /></a>' +
        '</div>' +

        '<div class="grid__col--4">' +
        '<a href="#"><img class="lazy" data-original="' + images[i + 1] + '" alt="This is a nice caption" /></a>' +
        '</div>' +

        '<div class="grid__col--4">' +
        '<a href="#"><img class="lazy" data-original="' + images[i + 2] + '" alt="This is a nice caption" /></a>' +
        '</div>' +
        '</div>';
    i = i + 3;
}

appendImageGrid();

appendContainer();


function appendImageGrid() {
    $('.image-gallery').append(html);
}

function appendContainer() {
    $overlay.append($icn_prv);

    //An image to overlay
    $overlay.append($image);

    $overlay.append($icn_nxt);
    //A caption to overlay
    $overlay.append($caption);

    //Add overlay
    $("body").append($overlay);
}


//Capture the click event on a link to an image
$(".image-gallery a").click(function (event) {
    event.preventDefault();
    currentImage = event.target;
    console.log(currentImage);

    var imageLocation = $(this).find('img').attr("data-original");
    //Update overlay with the image linked in the link
    $image.attr("src", imageLocation).attr("max-width", "80%");

    //Show the overlay.
    $overlay.fadeIn();

    setCaption(event);


    $icn_prv.click(function () {
        $overlay.fadeIn();
        var currentImageIndex = $.inArray(imageLocation, images);
        var previousImageLocation = images[currentImageIndex - 1];
        $image.attr("src", previousImageLocation);
        imageLocation = $image.attr("src");
    });

    $icn_nxt.click(function () {
        $overlay.fadeIn();
        var currentImageIndex = $.inArray(imageLocation, images);
        var nextImageLocation = images[currentImageIndex + 1];
        $image.attr("src", nextImageLocation);
        imageLocation = $image.attr("src");
    });

});

//When overlay is clicked
$overlayClose.click(function () {
    //Hide the overlay
    //$overlay.hide();
});


function setCaption(event) {
    var captionText = $(event.target).children("img").attr("alt");
    if (typeof captionText === 'undefined') {
        $caption.text('');
    }
    else {
        $caption.text(captionText);
    }
}
