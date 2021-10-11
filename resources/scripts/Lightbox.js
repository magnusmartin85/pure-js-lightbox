import images from '../data/images';

class Lightbox {
  constructor() {
  }

  body = document.querySelector('body');
  html = '';

  currentCaptionText = '';
  currentImageIndex = 0;

  previousDescriptionText = '';
  previousImage = '';
  previousImageIndex = 0;

  nextDescriptionText = '';
  nextImage = '';
  nextImageIndex = 0;

  imageCount = images.length;


  /**
   *
   * @param html
   */
  addPreviewImagesHtmlToDom(html) {
    document.querySelector('.preview-image-grid').insertAdjacentHTML('beforeend', html);
  }

  /**
   *
   * @param html
   */
  addLightboxOverlayHtmlToDom(html) {
    // remove old dom elements
    const lightboxOverlay = document.querySelector('.lightbox-backdrop');
    lightboxOverlay.innerHTML = '';
    document.querySelector('.lightbox-overlay').insertAdjacentHTML('beforeend', html);
  }

  addClickListenersToPreviewImages() {
    const triggerCollection = document.getElementsByClassName('preview-image-overlay');

    for (let i = 0; i < triggerCollection.length; i++) {
      const currentTrigger = triggerCollection[i];
      currentTrigger.addEventListener('click', (event) => {
        this.openLightboxOverlay(event);
      })
    }
  }

  addClickListenerToCloseButton() {
    const closeButton = document.querySelector('.btn-close');
    const overlay = document.querySelector('.lightbox-overlay');
    closeButton.addEventListener('click', event => {
      this.hideLightboxOverlay(overlay);
    });
  }

  addClickListenerToNextButton() {
    const nextButton = document.querySelector('.btn-next');
    nextButton.addEventListener('click', () => {
      const nextImageIndex = this.getNextImageIndex(this.currentImageIndex);
      const nextImagePath = this.getNextImagePath(nextImageIndex, this.imageCount);
      this.updateImageIndex(nextImageIndex);
      this.showImage(nextImagePath);
      this.updateFooterData(nextImageIndex);
    });
  }

  addClickListenerToPreviousButton() {
    const previousButton = document.querySelector('.btn-previous');
    previousButton.addEventListener('click', () => {
      const previousImageIndex = this.getPreviousImageIndex(this.currentImageIndex);
      const previousImagePath = this.getPreviousImagePath(previousImageIndex, this.imageCount);
      this.updateImageIndex(previousImageIndex);
      this.showImage(previousImagePath);
      this.updateFooterData(previousImageIndex);
    });
  }

  /**
   *
   */
  clearPathAndIndex() {
    this.currentImageIndex = 0;
  }

  displayPreviewImages() {
    const html = this.getPreviewImageHtml();

    this.addPreviewImagesHtmlToDom(html);
  }

  /**
   *
   * @param index
   * @returns {number}
   */
  getPreviousImageIndex(index) {
    if (index === 0) {
      return this.imageCount - 1;
    } else {
      return index - 1;
    }
  }

  /**
   *
   * @param event
   * @returns {number}
   */
  getCurrentImageIndex(event) {
    const target = event.target;
    let elem;
    if (target.getAttribute('class') !== 'preview-image-overlay') {
      elem = target.parentNode;
    } else {
      elem = target;
    }

    return Number(elem.previousElementSibling.getAttribute('data-id'));
  }

  /**
   *
   * @param index
   * @returns {number|*}
   */
  getNextImageIndex(index) {
    if (index === (this.imageCount - 1)) {
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
  getImageFromIndex(index) {
    return images[index].imagePath;
  }

  /**
   *
   * @returns {string}
   */
  getLightboxOverlayHtml() {
    return `<div class="lightbox-overlay-header-row">
        <div class="btn-close">
            ✕
        </div>
        </div>

        <div class="lightbox-overlay-body-row">
        <div class="lightbox-overlay-body-col-1">
        <div class="btn-previous-row">
        <div class="btn-previous">
            ‹
        </div>
        </div>
        </div>
        <div class="lightbox-overlay-body-col-2">
        <img alt=""
        class="lightbox-overlay-image"
        src=""
        />
        </div>

        <div class="lightbox-overlay-body-col-3">
        <div class="btn-next-row">
        <div class="btn-next">
           ›
        </div>
        </div>
        </div>
        </div>

        <div class="lightbox-overlay-footer-row">
        <div class="lightbox-overlay-footer-col-1">
        <p class="lightbox-overlay-image-source"></p>
        </div>
        <div class="lightbox-overlay-footer-col-2">
        <p class="lightbox-overlay-image-description"></p>
        </div>
        <div class="lightbox-overlay-footer-col-3">
        <p class="lightbox-overlay-image-number"></p>
        </div>
        <div class="lightbox-overlay-footer-col-4">
        </div>
        </div>
        </div>
    `;
  }

  /**
   *
   * @returns {*}
   */
  getPreviewImageHtml() {
    let html = ``;
    for (let i = 0; i < images.length; i++) {
      html +=
        `<div class="preview-image-row">
        <div class="preview-image-col">
        <div class="preview-image-container">
        <img
        alt="${images[i].description}"
        class="preview-image"
        data-id="${images[i].id}"
        src="${images[i].imagePath}"
        width="400"
        />
        <div class="preview-image-overlay">
        <div class="preview-image-overlay-title">${images[i].description}</div>
        <div class="preview-image-overlay-description">${images[i].source}</div>
        </div>
        </div>
        </div>
        <div class="preview-image-col">
        <div class="preview-image-container">
        <img
        alt="${images[i + 1].description}"
        class="preview-image"
        data-id="${images[i + 1].id}"
        src="${images[i + 1].imagePath}"
        width="400"
        />
        <div class="preview-image-overlay">
        <div class="preview-image-overlay-title">${images[i + 1].description}</div>
        <div class="preview-image-overlay-description">${images[i + 1].source}</div>
        </div>
        </div>
        </div>
        <div class="preview-image-col">
        <div class="preview-image-container">
        <img
        alt="${images[i + 2].description}"
        class="preview-image"
        data-id="${images[i + 2].id}"
        src="${images[i + 2].imagePath}"
        width="400"
        />
        <div class="preview-image-overlay">
        <div class="preview-image-overlay-title">${images[i + 2].description}</div>
        <div class="preview-image-overlay-description">${images[i + 2].source}</div>
        </div>
        </div>
        </div>
        </div>`;
      i = i + 2;
    }
    return html;
  }

  /**
   *
   * @param currentImageIndex
   * @returns {string|*}
   */
  getDescriptionText(currentImageIndex) {
    return images[currentImageIndex].description;
  }

  /**
   *
   * @param currentImageIndex
   * @returns {string|*}
   */
  getSourceText(currentImageIndex) {
    return images[currentImageIndex].source;
  }

  /**
   *
   * @param imageIndex
   * @param imageCount
   * @returns {string|*}
   */
  getPreviousImagePath(imageIndex, imageCount) {
    if (imageIndex === 0) {
      return images[imageCount - 1].imagePath;
    } else {
      return images[imageIndex].imagePath;
    }
  }

  /**
   *
   * @param imageIndex
   * @param imageCount
   * @returns {string|string|*}
   */
  getNextImagePath(imageIndex, imageCount) {
    if (imageIndex === imageCount) {
      return images[0].imagePath;
    }
    return images[imageIndex].imagePath;
  }

  hideLightboxOverlay(overlay) {
    overlay.classList.add('hide');
    overlay.classList.remove('show');
    this.removeBackdropFromDom();
  }

  openLightboxOverlay(event) {
    event.preventDefault();

    const overlayHtml = this.getLightboxOverlayHtml();
    const currentImageIndex = this.getCurrentImageIndex(event);
    const currentImagePath = images[currentImageIndex].imagePath;
    const overlay = document.querySelector('.lightbox-overlay');

    this.addOverlayToDom();
    this.addLightboxOverlayHtmlToDom(overlayHtml);
    this.showLightboxImage(currentImagePath);
    this.showLightboxOverlay(overlay);
    this.updateFooterData(currentImageIndex);
    this.setBodyOverflow(this.body);


    this.addClickListenerToCloseButton();
    this.addClickListenerToNextButton();
    this.addClickListenerToPreviousButton();
  }

  removeBackdropFromDom() {
    const backdropDiv = document.querySelector('.lightbox-backdrop');
    backdropDiv && backdropDiv.remove();
  }

  setBodyOverflow(body) {
    body.classList.add('no-scroll');
  }

  setImageDescription(currentImageIndex) {
    const descriptionText = this.getDescriptionText(currentImageIndex);

    if (typeof descriptionText !== 'undefined') {
      document.querySelector('.lightbox-overlay-image-description').textContent = descriptionText;
    }
  }

  setImageSource(currentImageIndex) {
    const text = this.getSourceText(currentImageIndex);

    if (typeof text !== 'undefined') {
      document.querySelector('.lightbox-overlay-image-source').textContent = text;
    }
  }

  setImageNumber(imageNumber) {
    document.querySelector('.lightbox-overlay-image-number').textContent = imageNumber + ' / ' + this.imageCount;
  }

  showLightboxOverlay(overlay) {
    overlay.classList.add('show');
    overlay.classList.remove('hide');
  }

  showLightboxImage(imagePath) {
    document.querySelector('.lightbox-overlay-image').setAttribute('src', imagePath);
  }

  showImage(imagePath) {
    document.querySelector('.lightbox-overlay-image').setAttribute('src', imagePath);
  }

  updateFooterData(currentImageIndex) {
    this.setImageDescription(currentImageIndex);
    this.setImageSource(currentImageIndex);
    this.setImageNumber(currentImageIndex + 1);
  }

  updateImageIndex(newIndex) {
    this.currentImageIndex = newIndex;
  }

  addOverlayToDom() {
    const overlayDiv = document.createElement('div');
    overlayDiv.className = 'lightbox-overlay';
    document.body.appendChild(overlayDiv);
  }

}

export default Lightbox;
