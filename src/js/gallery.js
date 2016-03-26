var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");

//An image to overlay
$overlay.append($image);

//A caption to overlay
$overlay.append($caption);

//Add overlay
$("body").append($overlay);
//Capture the click event on a link to an image
$(".image-gallery a").click(function (event) {
    event.preventDefault();
    var imageLocation = $(this).find('img').attr("data-original");
    console.log(imageLocation);
    //Update overlay with the image linked in the link
    $image.attr("src", imageLocation).attr("max-width", "100%");

    //Show the overlay.
    $overlay.fadeIn();

    //Get child's alt attribute and set caption
    var captionText = $(this).children("img").attr("alt");
    $caption.text(captionText);
});

//When overlay is clicked
$overlay.click(function () {
    //Hide the overlay
    $overlay.hide();
});


