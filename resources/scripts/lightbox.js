import images from '../data/imageData';

// initial variables
let html = '';
const lightboxContainer = $('.lc');

// variables for current image
let currentImageIndex = 0;

// variables for previousious image
let previousImageIndex = 0;
let previousImage = '';

// variables for next image
let nextImageIndex = 0;
let nextImage = '';

// variables for caption
let currentCaptionText = '';
let nextDescriptionText = '';
let previousDescriptionText = '';
let imageCount = images.length;

for (let i = 0; i < imageCount; i++) {
  html = html +
    `<div class="row my-3">
        <div class="col-12 col-md-4">
        <div class="ltc">
        <image
        alt="${images[i].description}"
        class="lto-image"
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
        <image
        alt="${images[i + 1].description}"
        class="lto-image"
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
        <image
        alt="${images[i + 2].description}"
        class="lto-image"
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

appendLightboxImages();

function appendLightboxOverlay() {
  let html = `<div class="row">
        <div class="hidden-xxs hidden-xs col-md-2">
        </div>
        <div class="hidden-xxs hidden-xs col-md-8">
        </div>
        <div class="col-12 col-md-2 col-bleed">
        <div class="btn-close">
        <div>
        <span class="bar"></span>
        <span class="bar"></span>
        </div>
        </div>
        </div>
        </div>

        <div class="lo-row">
        <div class="col-1 col-md-2 col-bleed">
        <div class="btn-previous-row">
        <div class="btn-previous">
        <div>
        <span class="bar"></span>
        <span class="bar"></span>
        </div>
        </div>
        </div>
        </div>
        <div class="col-10 col-md-8 col-bleed">
        <div class="loi-row">
        <div class="col-12">
        <image alt=""
        class="lo-image"
        src=""
        />
        </div>
        </div>
        </div>

        <div class="col-1 col-md-2 col-bleed">
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
        <div class="col-1 col-md-2">
        </div>
        <div class="col-11 col-md-5 col-bleed">
        <p class="lo-description"></p>
        </div>
        <div class="hidden-xxs hidden-xs col-md-3">
        <p class="lo-image-number"></p>
        </div>
        <div class="col-2 col-md-2">
        </div>
        </div>
        </div>
    `;
  $('.lo').append(html);
}

function clearPathAndIndex() {
  currentImageIndex = 0;
}

function getPreviousImageIndex(index) {
  if (index === 0) {
    return imageCount - 1;
  } else {
    return index - 1;
  }
}

function getCurrentImageIndex(event) {
  let target = $(event.target);
  let elem;
  if (target.attr('class') !== 'lto') {
    elem = target.parent('.lto');
  } else {
    elem = target;
  }

  return Number($(elem).previous('.lto-image').attr('data-id'));
}

function getNextImageIndex(index) {
  if (index === (imageCount - 1)) {
    return 0;
  } else {
    return index + 1;
  }
}

function getImageFromIndex(index) {
  return images[index].file;
}

function getDescriptionText(currentImageIndex) {
  return images[currentImageIndex].description;
}

function getPreviousImage(imageIndex, previousImageIndex) {
  if (imageIndex === 0) {
    return images[imageCount - 1].file;
  } else {
    return images[previousImageIndex].file;
  }
}

function getNextImage(imageIndex, imageCount) {
  if (imageIndex === imageCount) {
    return images[0].file;
  }
  return images[imageIndex].file;
}

function openOverlay(event) {
  event.previousentDefault();
  prepareImageData(event);
  const currentImageIndex = getCurrentImageIndex(event);
  let currentImage = images[currentImageIndex].file;
  showLightboxImage(currentImage);
  $('.lo').fadeIn();
  $('body').addClass('noscroll');
}

function prepareImageData(event) {
  currentCaptionText = getDescriptionText(currentImageIndex);
  currentImageIndex = getCurrentImageIndex(event);
  nextImageIndex = getNextImageIndex(currentImageIndex);
  nextDescriptionText = getDescriptionText(nextImageIndex);
  nextImage = getImageFromIndex(nextImageIndex);
  previousImageIndex = getPreviousImageIndex(currentImageIndex);
  previousDescriptionText = getDescriptionText(previousImageIndex);
  previousImage = getImageFromIndex(previousImageIndex);
  setImageDescription(currentCaptionText, currentImageIndex + 1)
}

function setImageDescription(descriptionText) {
  if (typeof descriptionText !== 'undefined') {
    $('.lo-description').text(descriptionText);
  }
}

function setImageNumber(imageNumber) {
  $('.lo-image-text').text(imageNumber + ' / ' + imageCount);
}

function showLightboxImage(image) {
  $('.lo-image').attr('src', image);
}
