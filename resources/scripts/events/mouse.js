
// Trigger Lightbox on click
$('.lto, .lto-description, .lto-title')
  .on('click', event => {
    openOverlay(event);
  });

// Handle click on previous img button
$(lightboxContainer).on('click', '.btn-prev', () => {
  previousImageIndex = getPreviousImageIndex(currentImageIndex);
  previousDescriptionText = getPreviousDescriptionText(previousImageIndex);
  previousImage = getPreviousImage(currentImageIndex, previousImageIndex);
  currentImageIndex = previousImageIndex;
  setImageDescription(previousDescriptionText);
  setImageNumber(previousImageIndex + 1);
  showLightboxImage(previousImage);
});

// Handle click on next img button
$(lightboxContainer).on('click', '.btn-next', () => {
  nextImageIndex = getNextImgIndex(currentImageIndex);
  nextDescriptionText = getDescriptionText(nextImageIndex);
  nextImage = getNextImg(nextImageIndex, imgCount);
  currentImageIndex = nextImageIndex;
  setImageDescription(nextDescriptionText);
  setImageNumber(nextImageIndex + 1);
  showLightboxImage(nextImage);
});

// Close Lightbox
$(lightboxContainer).on('click', '.btn-close', () => {
  $('.lo').hide();
  $('body').removeClass('no-scroll');
  clearPathAndIndex();
});
