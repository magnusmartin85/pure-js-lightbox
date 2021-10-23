class Lightbox {
  constructor(config) {
    this.images = config.images;
    this.imageCount = config.images.length;
    this.imageSlider = config.imageSlider;
    this.previewImage = config.previewImage;
  }

  body = document.querySelector('body');
  currentImageIndex = 0;

  addClickListenersToPreviewImages() {
    const triggerCollection = document.getElementsByClassName('preview-image');

    for (let i = 0; i < triggerCollection.length; i++) {
      const currentTrigger = triggerCollection[i];
      currentTrigger.addEventListener('click', (event) => {
        this.openLightboxOverlay(event);
      })
    }
  }

  addClickListenerToCloseButton() {
    const closeButton = document.querySelector('.btn-close');
    closeButton.addEventListener('click', () => {
      this.hideBackdrop();
      this.hideSlider();
      this.removeBodyOverflow();
    });
  }

  addClickListenerToNextButton() {
    const nextButton = document.querySelector('.btn-next');

    nextButton.addEventListener('click', () => {
      const nextImageIndex = this.getNextImageIndex(this.currentImageIndex);
      const nextPath = this.getNextPath(nextImageIndex);
      const nextAltText = this.images[nextImageIndex].description;

      this.updateImageIndex(nextImageIndex);
      this.showLightboxImage(nextPath, nextAltText);
      this.updateFooterData(nextImageIndex);
    });
  }

  addClickListenerToPreviousButton() {
    const previousButton = document.querySelector('.btn-previous');
    previousButton.addEventListener('click', () => {
      const previousImageIndex = this.getPreviousImageIndex(this.currentImageIndex);
      const previousPath = this.getPreviousPath(previousImageIndex);
      const previousAltText = this.images[previousImageIndex].description;
      this.updateImageIndex(previousImageIndex);
      this.showLightboxImage(previousPath, previousAltText);
      this.updateFooterData(previousImageIndex);
    });
  }

  addEventListenersForTouch() {
    document.addEventListener('touchstart', this.handleTouchStart);
    document.addEventListener('touchmove', this.handleTouchMove);
  }

  removeEventListenersForTouch() {
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchmove', this.handleTouchMove);
  }

  /**
   *
   * @param {object} evt
   */
  handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    this.downX = firstTouch.clientX;
  }

  /**
   *
   * @param {object} evt
   */
  handleTouchMove(evt) {
    if (!this.downX) {
      return;
    }

    this.upX = evt.touches[0].clientX;

    this.diffX = this.downX - this.upX;

    if (this.diffX > 0) {
      document.querySelector('.btn-next').click();
    } else {
      document.querySelector('.btn-previous').click();
    }

    /* reset values */
    this.downX = null;
  }

  addEventListenersForKeyboard() {
    document.addEventListener('keydown', this.addKeyboardListeners);
  }

  removeEventListenersForKeyboard() {
    document.removeEventListener('keydown', this.addKeyboardListeners);
  }

  /**
   *
   * @param {number} index
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
   * @param {object} event
   * @returns {number}
   */
  getCurrentImageIndex(event) {
    return Number(event.target.getAttribute('data-id'));
  }

  /**
   *
   * @param {number} index
   * @returns {number}
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
   * @param {object} event
   */
  addSliderHtmlToDom(event) {
    const Mustache = require('mustache');
    const currentImageIndex = this.getCurrentImageIndex(event);
    const currentPath = this.images[currentImageIndex].path;
    const currentAltText = this.images[currentImageIndex].description;

    fetch('../templates/slider.html')
      .then((response) => response.text())
      .then((template) => {
        const renderedHtml = Mustache.render(template, {});
        const imageSlider = document.querySelector('.image-slider');
        // remove old dom elements
        imageSlider.innerHTML = '';
        imageSlider.innerHTML = renderedHtml;
        imageSlider.classList.add('show');
        imageSlider.classList.remove('hide');
        this.showLightboxImage(currentPath, currentAltText);
        this.updateFooterData(currentImageIndex);
        this.addClickListenerToCloseButton();
        this.addClickListenerToNextButton();
        this.addClickListenerToPreviousButton();
      });
  }

  addPreviewImageHtmlToDom() {
    const Mustache = require('mustache');

    fetch('../templates/preview.html')
      .then((response) => response.text())
      .then((template) => {
        let html = '';
        for (let i = 0; i < this.imageCount; i++) {
          const config = this.getPreviewImageConfig(i);
          const renderedHtml = Mustache.render(template, config);

          html += renderedHtml;
          i = i + 2;
        }
        document.querySelector('.image-preview-grid').insertAdjacentHTML('beforeend', html);
      })
      .then(() => this.addClickListenersToPreviewImages())
  }

  /**
   *
   * @param {number} currentImageIndex
   * @returns {string}
   */
  getDescriptionText(currentImageIndex) {
    return this.images[currentImageIndex].description;
  }

  /**
   *
   * @param {number} currentImageIndex
   * @returns {string}
   */
  getSourceText(currentImageIndex) {
    return this.images[currentImageIndex].source;
  }

  /**
   *
   * @param {number} index
   * @returns {{image3: {path: (string|*), description, previewPath: (string|*), source, id}, imageSlider: {showImageSource: (boolean|*), showImageCounter: (boolean|*), showImageTitle: boolean}, image1: {path: (string|*), description, previewPath: (string|*), source, id}, image2: {path: (string|*), description, previewPath: (string|*), source, id}}}
   */
  getPreviewImageConfig(index) {
    return {
      imageSlider: {
        showImageCounter: this.imageSlider.showImageCounter,
        showImageSource: this.imageSlider.showImageSource,
        showImageTitle: this.imageSlider.showImageDescription
      },
      image1:
        {
          description: this.images[index].description,
          path: this.images[index].path,
          previewPath: this.images[index].previewPath,
          source: this.images[index].source,
          id: this.images[index].id,
        },
      image2:
        {
          description: this.images[index + 1].description,
          path: this.images[index + 1].path,
          previewPath: this.images[index + 1].previewPath,
          source: this.images[index + 1].source,
          id: this.images[index + 1].id,
        },
      image3:
        {
          description: this.images[index + 2].description,
          path: this.images[index + 2].path,
          previewPath: this.images[index + 2].previewPath,
          source: this.images[index + 2].source,
          id: this.images[index + 2].id,
        },
    }
  }

  /**
   *
   * @param {number} imageIndex
   * @returns {string|*}
   */
  getPreviousPath(imageIndex) {
    return this.images[imageIndex].path;
  }

  /**
   *
   * @param {number} imageIndex
   * @returns {string}
   */
  getNextPath(imageIndex) {
    if (imageIndex === this.imageCount) {
      return this.images[0].path;
    }
    return this.images[imageIndex].path;
  }

  hideBackdrop() {
    document.querySelector('.lightbox-backdrop')
      .classList
      .replace('show', 'hide');
    this.removeBackdropHtmlFromDom();
  }

  hideSlider() {
    document.querySelector('.image-slider')
      .classList
      .replace('show', 'hide');
    this.removeEventListenersForKeyboard();
    this.removeEventListenersForTouch();
  }

  /**
   *
   * @param {object} lightbox - A lightbox instance.
   */
  initializeLightbox(lightbox) {
    lightbox.addPreviewImageHtmlToDom();
  }

  /**
   *
   * @param {object} evt
   * @returns {*}
   */
  addKeyboardListeners(evt) {
    switch (evt.key) {
      case 'Escape': // esc-key
        const btnClose = document.querySelector('.btn-close');
        return btnClose.click();

      case 'ArrowLeft': // left-key
        const btnPrevious = document.querySelector('.btn-previous');
        return btnPrevious.click();

      case 'ArrowRight': // right-key
        const btnNext = document.querySelector('.btn-next');
        return btnNext.click();
      default:
        return;
    }
  }

  /**
   *
   * @param {object} event
   */
  openLightboxOverlay(event) {
    event.preventDefault();
    this.currentImageIndex = this.getCurrentImageIndex(event);

    this.addSliderHtmlToDom(event);
    this.addBackdropHtmlToDom();
    this.setBodyOverflow();
    this.addEventListenersForKeyboard();
    this.addEventListenersForTouch();
  }

  removeBackdropHtmlFromDom() {
    const backdropDiv = document.querySelector('.lightbox-backdrop');
    backdropDiv && backdropDiv.remove();
  }

  removeBodyOverflow() {
    this.body.classList.remove('no-scroll');
  }

  setBodyOverflow() {
    this.body.classList.add('no-scroll');
  }

  /**
   *
   * @param {number} currentImageIndex
   */
  setImageDescription(currentImageIndex) {
    const descriptionText = this.getDescriptionText(currentImageIndex);

    if (typeof descriptionText !== 'undefined') {
      document.querySelector('.lightbox-overlay-image-description').textContent = descriptionText;
    }
  }

  /**
   *
   * @param {number} currentImageIndex
   */
  setImageSource(currentImageIndex) {
    const sourceText = this.getSourceText(currentImageIndex);

    if (typeof sourceText !== 'undefined') {
      document.querySelector('.lightbox-overlay-image-source').textContent = sourceText;
    }
  }

  /**
   *
   * @param {number} imageNumber
   */
  setImageCounter(imageNumber) {
    document.querySelector('.lightbox-overlay-image-counter').textContent = imageNumber + ' / ' + this.imageCount;
  }

  /**
   *
   * @param {string} path
   * @param {string} text
   */
  showLightboxImage(path, text) {
    const overlayImage = document.querySelector('.lightbox-overlay-image');
    overlayImage.setAttribute('src', path);
    overlayImage.setAttribute('alt', text);
  }

  /**
   *
   * @param {number} currentImageIndex
   */
  updateFooterData(currentImageIndex) {
    this.imageSlider.showImageDescription && this.setImageDescription(currentImageIndex);
    this.imageSlider.showImageSource && this.setImageSource(currentImageIndex);
    this.imageSlider.showImageCounter && this.setImageCounter(currentImageIndex + 1);
  }

  /**
   *
   * @param {number} newIndex
   */
  updateImageIndex(newIndex) {
    this.currentImageIndex = newIndex;
  }

  addBackdropHtmlToDom() {
    const backdropDiv = document.createElement('div');
    backdropDiv.className = 'lightbox-backdrop';
    this.body.appendChild(backdropDiv);
  }

}

export default Lightbox;
