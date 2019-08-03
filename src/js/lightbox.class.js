class Lightbox {
    constructor(id) {
        this.id = id;
    }



    paths = [];

    html = '';
    currentImage = '';
    currentImagePath = '';
    currentImageIndex = 0;

    /* Initial variables */
    initialImagePath = '';

    /* Previous variables */
    previousImagePath = '';
    previousImageIndex = 0;
    previousImageNumber = 0;

    /* Next variables */
    nextImagePath = '';
    nextImageIndex = 0;
    nextImageNumber = 0;

    /* Caption variables */
    currentCaptionText = '';
    nextCaptionText = '';
    previousCaptionText = '';

    $buttonClose = $('.button-close');
    $buttonNext = $('.button-next');
    $buttonPrevious = $('.button-prev');
    $captionLeft = $('.caption-left');
    $captionRight = $('.caption-right');
    $lightboxOverlay = $('.lightbox-overlay');
    $lightboxImage = $('.lightbox-image');
    numImages = images.length;

    appendImageGrid() {
        $(this.id).append(html);
    }

    openLightbox(event) {
        event.preventDefault();
        this.prepareImageData(event);
        this.showLightboxImage(currentImagePath);
        $lightboxOverlay.fadeIn();
    }

    prepareImageData(event) {
        currentImagePath = this.getInitialImagePath(event);
        currentImageIndex = this.getCurrentImageIndex(currentImagePath);
        nextImageIndex = this.getNextImageIndex(currentImageIndex);
        previousImageIndex = this.getPreviousImageIndex(currentImageIndex);
        nextImagePath = this.getImagePathFromIndex(nextImageIndex);
        previousImagePath = this.getImagePathFromIndex(previousImageIndex);
        nextCaptionText = this.getCaptionText(nextImageIndex);
        currentCaptionText = this.getCaptionText(currentImageIndex);
        previousCaptionText = this.getCaptionText(previousImageIndex);
        setImageText(currentCaptionText, currentImageNumber + 1)
    }

    showLightboxImage(initialImagePath) {
        this.lightboxImage.attr('src', initialImagePath);
    }

    getInitialImagePath(event) {
        let target = $(event.target);
        if (target.is('div.lto-description') || target.is('div.lto-title')) {
            initialImagePath = $(event.target).closest('.lightbox-thumbnail-container').attr('data-target');
        } else {
            initialImagePath = $(event.target).parent().attr('data-target');
        }
        return initialImagePath;
    }

    getPreviousImageIndex(index) {
        if (index === 0) {
            previousImageIndex = this.numImages - 1;
            return previousImageIndex;
        } else {
            previousImageIndex = index - 1;
            return previousImageIndex;
        }
    }

    getCurrentImageIndex(imagePath) {
        currentImageIndex = $.inArray(imagePath, images);
        return currentImageIndex;
    }

    getNextImageIndex(index) {
        if (index === this.numImages - 1) {
            nextImageIndex = 0;
            return nextImageIndex;
        } else {
            nextImageIndex = index + 1;
            return nextImageIndex;
        }
    }

    setImageText(captionText, imageNumber) {
        if (typeof captionText === 'undefined') {
            $captionLeft.text('');
        } else {
            $captionLeft.text(captionText);
        }
        $captionRight.text((imageNumber) + ' von ' + this.numImages);
        currentImageNumber = imageNumber;
        return currentImageNumber;
    }

    getImagePathFromIndex(index) {
        return images[index];
    }

    getCaptionText(currentImageIndex) {
        return imgDescriptions[currentImageIndex];
    }

    showPreviousImage(previousImagePath) {
        $lightboxImage.attr("src", previousImagePath);
    }

    showNextImage(nextImagePath) {
        $lightboxImage.attr("src", nextImagePath);
    }

    getPreviousImagePath(imageIndex) {
        if (imageIndex === 0) {
            previousImagePath = images[this.numImages - 1];
            return previousImagePath;
        } else {
            previousImagePath = images[previousImageIndex];
            return previousImagePath;
        }
    }

    getNextImagePath(imageIndex) {
        if (imageIndex === this.numImages) {
            return images[0];
        }
        return images[imageIndex];
    }

    clearPathAndIndex() {
        this.currentImageIndex = 0;
        this.currentImage = '';
        this.currentImagePath = '';
    }

    createHtml() {
        for (let i = 0; i < this.numImages; i++) {
            html = html +
                `<div class="row my-3">
        <div class="col-12 col-md-4">
        <div class="lightbox-thumbnail-container">
        <img 
        alt="${imgDescriptions[i]}" 
        class="lazy" 
        data-original="${images[i]}" 
        src=""
        width="400" 
        />
        <div class="lightbox-thumbnail-overlay">
        <div class="lto-title">${imgTitles[i]}</div>
        <div class="lto-description">${imgDescriptions[i]}</div> 
        </div> 
        </div> 
        </div> 
        <div class="col-12 col-md-4"> 
        <div class="lightbox-thumbnail-container"> 
        <img 
        alt="${imgDescriptions[i + 1]}" 
        class="lazy" 
        data-original="${images[i + 1]}" 
        src=""
        width="400" 
        />
        <div class="lightbox-thumbnail-overlay"> 
        <div class="lto-title">${imgTitles[i + 1]}</div> 
        <div class="lto-description">${imgDescriptions[i + 1]}</div> 
        </div> 
        </div> 
        </div>
        <div class="col-12 col-md-4"> 
        <div class="lightbox-thumbnail-container"> 
        <img 
            alt="${imgDescriptions[i + 2]}"
            class="lazy" 
            data-original="${images[i + 2]}"
            src=""
            width="400" 
        />
        <div class="lightbox-thumbnail-overlay"> 
        <div class="lto-title">${imgTitles[i + 2]}</div> 
        <div class="lto-description">${imgDescriptions[i + 2]}</div> 
        </div> 
        </div>  
        </div> 
        </div>`;
            i = i + 2;
        }
    }

}
