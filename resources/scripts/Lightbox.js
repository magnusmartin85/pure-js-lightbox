class Lightbox {
  constructor(images) {
    this.images = images;
    this.imageCount = images.length;
  }

  body = document.querySelector('body');
  currentImageIndex = 0;


  /**
   *
   * @param {string} html
   */
  addPreviewImagesHtmlToDom(html) {
    console.warn('addPreviewImagesHtmlToDom html', typeof html);
    document.querySelector('.image-preview-grid').insertAdjacentHTML('beforeend', html);
  }

  /**
   *
   * @param {string} html
   */
  addImageSliderHtmlToDom(html) {
    const imageSlider = document.querySelector('.image-slider');
    // remove old dom elements
    imageSlider.innerHTML = '';
    imageSlider.innerHTML = html;
    imageSlider.classList.add('show');
    imageSlider.classList.remove('hide');
  }

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

  displayPreviewImages() {
    const html = this.getPreviewImageHtml();

    this.addPreviewImagesHtmlToDom(html);
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
   * @param {number} index
   * @returns {*}
   */
  getImageFromIndex(index) {
    return images[index].imagePath;
  }

  /**
   *
   * @returns {string}
   */
  getSliderHtml() {
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
   * @returns {string}
   */
  getPreviewImageHtml() {
    let html = ``;
    for (let i = 0; i < this.imageCount; i++) {
      html +=
        `<div class="image-preview-grid-row">
        <div class="image-preview-grid-col">
        <div class="preview-image-container">
        <img
        alt="${this.images[i].description}"
        class="preview-image"
        data-id="${this.images[i].id}"
        src="${this.images[i].imagePath}"
        width="400"
        />
        <div class="preview-image-overlay">
        <div class="preview-image-overlay-title">${this.images[i].description}</div>
        <div class="preview-image-overlay-description">${this.images[i].source}</div>
        </div>
        </div>
        </div>
        <div class="image-preview-grid-col">
        <div class="preview-image-container">
        <img
        alt="${this.images[i + 1].description}"
        class="preview-image"
        data-id="${this.images[i + 1].id}"
        src="${this.images[i + 1].imagePath}"
        width="400"
        />
        <div class="preview-image-overlay">
        <div class="preview-image-overlay-title">${this.images[i + 1].description}</div>
        <div class="preview-image-overlay-description">${this.images[i + 1].source}</div>
        </div>
        </div>
        </div>
        <div class="image-preview-grid-col">
        <div class="preview-image-container">
        <img
        alt="${this.images[i + 2].description}"
        class="preview-image"
        data-id="${this.images[i + 2].id}"
        src="${this.images[i + 2].imagePath}"
        width="400"
        />
        <div class="preview-image-overlay">
        <div class="preview-image-overlay-title">${this.images[i + 2].description}</div>
        <div class="preview-image-overlay-description">${this.images[i + 2].source}</div>
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
  }

  /**
   *
   * @param {object} event
   */
  openLightboxOverlay(event) {
    event.preventDefault();

    const sliderHtml = this.getSliderHtml();
    const currentImageIndex = this.getCurrentImageIndex(event);
    const currentImagePath = this.images[currentImageIndex].imagePath;

    this.setCurrentImageIndex(currentImageIndex);
    this.addBackdropHtmlToDom();
    this.addImageSliderHtmlToDom(sliderHtml);
    this.showLightboxImage(currentImagePath);
    this.updateFooterData(currentImageIndex);
    this.setBodyOverflow(this.body);

    this.addClickListenerToCloseButton();
    this.addClickListenerToNextButton();
    this.addClickListenerToPreviousButton();
  }

  removeBackdropHtmlFromDom() {
    const backdropDiv = document.querySelector('.lightbox-backdrop');
    backdropDiv && backdropDiv.remove();
  }

  setBodyOverflow(body) {
    body.classList.add('no-scroll');
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
   * @param {number} imagePath
   */
  showLightboxImage(imagePath) {
    document.querySelector('.lightbox-overlay-image').setAttribute('src', imagePath);
  }

  /**
   *
   * @param {number} imagePath
   */
  showImage(imagePath) {
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
