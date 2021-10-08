import images from '../data/imageData';

import {
  html,
  lightboxContainer,
  currentCaptionText,
  currentImageIndex,
  previousDescriptionText,
  previousImage,
  previousImageIndex,
  nextImageIndex,
  nextImage,
  nextDescriptionText,
  imageCount,
} from './variables';

/**
 *
 */
function clearPathAndIndex() {
  currentImageIndex = 0;
}

/**
 *
 * @param index
 * @returns {number}
 */
function getPreviousImageIndex(index) {
  if (index === 0) {
    return imageCount - 1;
  } else {
    return index - 1;
  }
}

/**
 *
 * @param event
 * @returns {number}
 */
function getCurrentImageIndex(event) {
  const target = event.target;
  let elem;
  if (target.attr('class') !== 'lto') {
    elem = target.parent('.lto');
  } else {
    elem = target;
  }

  return Number(document.querySelector(elem).previousElementSibling('.lto-image').getAttribute('data-id'));
}

/**
 *
 * @param index
 * @returns {number|*}
 */

function getNextImageIndex(index) {
  if (index === (imageCount - 1)) {
    return 0;
  } else {
    return index + 1;
  }
}

/**
 *
 * @param index
 * @returns {*}
 */

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
  event.preventDefault();
  prepareImageData(event);
  const overlay = document.querySelector('.lo');
  const body = document.querySelector('body');
  const currentImageIndex = getCurrentImageIndex(event);
  const currentImage = images[currentImageIndex].file;
  showLightboxImage(currentImage);
  overlay.classList.add('show');
  overlay.classList.remove('hide');
  body.classList.add('no-scroll');
}

function getPreparedImageData(event) {
  const currentCaptionText = getDescriptionText(currentImageIndex);

  setImageDescription(currentCaptionText, currentImageIndex + 1);

  return {
    currentCaptionText,
    currentImageIndex: getCurrentImageIndex(event),
    nextImageIndex: getNextImageIndex(currentImageIndex),
    nextDescriptionText: getDescriptionText(nextImageIndex),
    nextImage: getImageFromIndex(nextImageIndex),
    previousImageIndex: getPreviousImageIndex(currentImageIndex),
    previousDescriptionText: getDescriptionText(previousImageIndex),
    previousImage: getImageFromIndex(previousImageIndex),
  }
}

function setImageDescription(descriptionText) {
  if (typeof descriptionText !== 'undefined') {
    document.querySelector('.lo-description').text(descriptionText);
  }
}

function setImageNumber(imageNumber) {
  document.querySelector('.lo-image-text').textContent = imageNumber + ' / ' + imageCount;
}

function showLightboxImage(image) {
  document.querySelector('.lo-image').setAttribute('src', image);
}

function appendLightboxImages() {
  document.querySelector('.lightbox').appendChild(html);
}
