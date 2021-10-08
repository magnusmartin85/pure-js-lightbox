import images from '../data/imageData';

const lightboxContainer = document.querySelector('.lc');
let html = '';

let currentCaptionText = '';
let currentImageIndex = 0;

let previousDescriptionText = '';
let previousImage = '';
let previousImageIndex = 0;

let nextDescriptionText = '';
let nextImage = '';
let nextImageIndex = 0;

let imageCount = images.length;

export {
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
}
