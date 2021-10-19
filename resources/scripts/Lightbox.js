class Lightbox {
  constructor(config) {
    this.images = config.images;
    this.imageCount = config.images.length;
    this.imageSlider = config.imageSlider;
    this.previewImage = config.previewImage;
  }

  body = document.querySelector('body');
  currentImageIndex = 0;

  /**
   *
   */
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
    const backdrop = document.querySelector('.lightbox-backdrop');
    const slider = document.querySelector('.image-slider');
    closeButton.addEventListener('click', () => {
      this.hideBackdrop(backdrop);
      this.hideSlider(slider);
      this.removeBodyOverflow();
    });
  }

  addClickListenerToNextButton() {
    const nextButton = document.querySelector('.btn-next');

    nextButton.addEventListener('click', () => {
      const nextImageIndex = this.getNextImageIndex(this.currentImageIndex);
      const nextImagePath = this.getNextImagePath(nextImageIndex, this.imageCount);
      this.updateImageIndex(nextImageIndex);
      this.showLightboxImage(nextImagePath);
      this.updateFooterData(nextImageIndex);
    });
  }

  addClickListenerToPreviousButton() {
    const previousButton = document.querySelector('.btn-previous');
    previousButton.addEventListener('click', () => {
      const previousImageIndex = this.getPreviousImageIndex(this.currentImageIndex);
      const previousImagePath = this.getPreviousImagePath(previousImageIndex, this.imageCount);
      this.updateImageIndex(previousImageIndex);
      this.showLightboxImage(previousImagePath);
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
   * @param {number} index
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
   * @returns {string}
   */
  addSliderHtmlToDom(event) {
    const Mustache = require('mustache');
    const currentImageIndex = this.getCurrentImageIndex(event);
    const currentImagePath = this.images[currentImageIndex].imagePath;

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
        this.showLightboxImage(currentImagePath);
        this.updateFooterData(currentImageIndex);
        this.addClickListenerToCloseButton();
        this.addClickListenerToNextButton();
        this.addClickListenerToPreviousButton();
      });
  }

  /**
   *
   * @returns {string}
   */
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
   * @returns {string|*}
   */
  getDescriptionText(currentImageIndex) {
    return this.images[currentImageIndex].description;
  }

  /**
   *
   * @param {number} currentImageIndex
   * @returns {string|*}
   */
  getSourceText(currentImageIndex) {
    return this.images[currentImageIndex].source;
  }

  /**
   *
   * @param index
   * @returns {{image3: {imagePath: (string|*), description, source, id}, imageSlider: {showImageSource: (boolean|*), showImageNumbers: (boolean|*), showImageTitle}, image1: {imagePath: (string|*), description, source, id}, image2: {imagePath: (string|*), description, source, id}, previewImage: {overlay: {showImageDescription: (boolean|*), showImageSource: (boolean|*)}}}}
   */
  getPreviewImageConfig(index) {
    return {
      imageSlider: {
        showImageSource: this.imageSlider.showImageSource,
        showImageTitle: this.imageSlider.showImageDescription,
        showImageNumbers: this.imageSlider.showImageNumbers
      },
      previewImage: {
        overlay: {
          showImageDescription: this.previewImage.overlay.showImageDescription,
          showImageSource: this.previewImage.overlay.showImageSource,
        }
      },
      image1:
        {
          description: this.images[index].description,
          imagePath: this.images[index].imagePath,
          source: this.images[index].source,
          id: this.images[index].id,
        },
      image2:
        {
          description: this.images[index + 1].description,
          imagePath: this.images[index + 1].imagePath,
          source: this.images[index + 1].source,
          id: this.images[index + 1].id,
        },
      image3:
        {
          description: this.images[index + 2].description,
          imagePath: this.images[index + 2].imagePath,
          source: this.images[index + 2].source,
          id: this.images[index + 2].id,
        },
    }
  }

  /**
   *
   * @param {number} imageIndex
   * @param {number} imageCount
   * @returns {string|*}
   */
  getPreviousImagePath(imageIndex, imageCount) {
    return this.images[imageIndex].imagePath;
  }

  /**
   *
   * @param {number} imageIndex
   * @param {number} imageCount
   * @returns {string|string|*}
   */
  getNextImagePath(imageIndex, imageCount) {
    if (imageIndex === imageCount) {
      return this.images[0].imagePath;
    }
    return this.images[imageIndex].imagePath;
  }

  /**
   *
   * @param {object} backdrop
   */
  hideBackdrop(backdrop) {
    backdrop.classList.add('hide');
    backdrop.classList.remove('show');
    this.removeBackdropHtmlFromDom();
  }

  /**
   *
   * @param {object} slider
   */
  hideSlider(slider) {
    slider.classList.add('hide');
    slider.classList.remove('show');
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
    const currentImageIndex = this.getCurrentImageIndex(event);

    this.addSliderHtmlToDom(event);
    this.setCurrentImageIndex(currentImageIndex);
    this.addBackdropHtmlToDom();
    this.setBodyOverflow();
    this.addEventListenersForKeyboard();

    this.addEventListenersForTouch();
  }

  removeBackdropHtmlFromDom() {
    const backdropDiv = document.querySelector('.lightbox-backdrop');
    backdropDiv && backdropDiv.remove();
  }

  setBodyOverflow() {
    this.body.classList.add('no-scroll');
  }

  removeBodyOverflow() {
    this.body.classList.remove('no-scroll');
  }


  /**
   *
   * @param {number} index
   * @returns {number}
   */
  setCurrentImageIndex(index) {
    this.currentImageIndex = index;
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
    const text = this.getSourceText(currentImageIndex);

    if (typeof text !== 'undefined') {
      document.querySelector('.lightbox-overlay-image-source').textContent = text;
    }
  }

  /**
   *
   * @param {number} imageNumber
   */
  setImageNumber(imageNumber) {
    document.querySelector('.lightbox-overlay-image-number').textContent = imageNumber + ' / ' + this.imageCount;
  }

  /**
   *
   * @param {string} imagePath
   */
  showLightboxImage(imagePath) {
    document.querySelector('.lightbox-overlay-image').setAttribute('src', imagePath);
  }

  /**
   *
   * @param {number} currentImageIndex
   */
  updateFooterData(currentImageIndex) {
    this.setImageDescription(currentImageIndex);
    this.setImageSource(currentImageIndex);
    this.setImageNumber(currentImageIndex + 1);
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
    document.body.appendChild(backdropDiv);
  }

}

export default Lightbox;
