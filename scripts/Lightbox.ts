/**
 * Lightbox v1.0.2
 * by Magnus Martin
 *
 * Author:
 * https://mgnmrt.com
 *
 * Demo:
 * https://pure-js-lightbox.com
 *
 */
import { CSS_CLASSES, HTML_ATTRIBUTES } from "./constants";
import { getOverlayMarkup, getOverlayThumbnailImagesMarkup } from "./Markup";
import {
  getHtmlElementByClassName,
  getHtmlElementByTagName,
  getHtmlElementsByClassName,
  waitForElementToBeVisible
} from "./helper";
import {
  ConfigProps,
  ImageProps,
  ImageSetProps,
  ImageSetsProps
} from "./types";

class Lightbox {
  imageSets: ImageSetsProps;
  private imageSlider: {
    showImageCounter: boolean;
    showImageDescription: boolean;
    showImageSource: boolean;
  };
  private swipedLeftOrRight: boolean;
  private leftOrRightSwipeAmount: number;
  private body = getHtmlElementByTagName("body");
  private currentImageIndex = 0;
  private currentImageSet: ImageSetProps;
  private currentImageSetLength: number;

  constructor(config: ConfigProps) {
    this.imageSets = this.getImageSets();
    this.imageSlider = config.imageSlider;
    this.swipedLeftOrRight = false;
    this.leftOrRightSwipeAmount = 0;
    this.currentImageSet = this.imageSets[0];
    this.currentImageSetLength = this.currentImageSet.length;
  }

  /**
   *  Create image objects.
   */
  getImageSets = (): ImageSetsProps => {
    const imageCollection = getHtmlElementsByClassName(
      CSS_CLASSES.PREVIEW_IMAGE
    );

    // Create array of objects
    const images = Array.from(imageCollection).map((image) => ({
      description: image.getAttribute(HTML_ATTRIBUTES.ALT),
      url: image.getAttribute(HTML_ATTRIBUTES.SRC),
      photographer: image.getAttribute(HTML_ATTRIBUTES.DATA_PHOTOGRAPHER),
      imageSetId: image.getAttribute(HTML_ATTRIBUTES.DATA_LIGHTBOX_ID) || ""
    }));
    const imageSets: ImageSetsProps = [];
    let currentImageSetId = "";
    let currentImageSetIndex = -1;
    let currentImageId = -1;

    images.forEach((image: ImageProps) => {
      if (image.imageSetId !== currentImageSetId) {
        currentImageId = -1;
        currentImageSetIndex++;
        currentImageId++;
        currentImageSetId = image.imageSetId;
        image["id"] = currentImageId;
        imageSets[currentImageSetIndex] = [];
        imageSets[currentImageSetIndex].push(image);
      } else {
        currentImageId++;
        image["id"] = currentImageId;
        imageSets[currentImageSetIndex].push(image);
      }
    });

    return imageSets;
  };

  /**
   *
   */
  addClickListenersToPreviewImages(): void {
    const previewImages: HTMLCollectionOf<Element> = getHtmlElementsByClassName(
      CSS_CLASSES.PREVIEW_IMAGE
    );

    for (let i = 0; i < previewImages.length; i++) {
      const currentTrigger = previewImages[i];
      currentTrigger.addEventListener("click", (event) => {
        this.setCurrentImageProperties(event);
        this.openLightboxOverlay(event);
        this.showBackdrop();
      });
    }
  }

  /**
   *
   */
  addClickListenersToThumbnailImages(): void {
    const thumbnailImages: HTMLCollectionOf<Element> =
      getHtmlElementsByClassName(CSS_CLASSES.LIGHTBOX_OVERLAY_THUMBNAIL);

    for (let i = 0; i < thumbnailImages.length; i++) {
      const currentTrigger = thumbnailImages[i];
      currentTrigger.addEventListener("click", () => {
        const imageIndex = Number(
          currentTrigger.children[0].getAttribute(HTML_ATTRIBUTES.DATA_ID)
        );
        const imageAltText =
          currentTrigger.children[0].getAttribute(HTML_ATTRIBUTES.ALT) || "";
        const imageUrl =
          currentTrigger.children[0].getAttribute(HTML_ATTRIBUTES.SRC) || "";
        this.updateImageIndex(imageIndex);
        this.showLightboxOverlayImage(imageUrl, imageAltText || "");
        this.updateFooterData(imageIndex);
        this.setActiveThumbnailImage(imageIndex);
      });
    }
  }

  /**
   *
   */
  addClickListenerToCloseButton(): void {
    const closeButton = getHtmlElementByClassName(CSS_CLASSES.BUTTON_CLOSE);

    closeButton.addEventListener("click", () => {
      this.hideBackdrop();
      this.hideOverlay();
      this.removeBodyOverflow();
    });
  }

  /**
   *
   */
  addClickListenerToNextButton(): void {
    const nextButton = getHtmlElementByClassName(CSS_CLASSES.BUTTON_NEXT);

    this.currentImageSetLength > 1
      ? nextButton.addEventListener("click", () => {
          const nextImageIndex: number = this.getNextImageIndex(
            this.currentImageIndex
          );
          const nextImageUrl: string = this.getNextImageUrl(nextImageIndex);
          const nextImage: ImageProps = this.currentImageSet[nextImageIndex];
          const nextAltText: string | null | undefined = nextImage
            ? nextImage.description
            : "";

          this.updateImageIndex(nextImageIndex);
          this.showLightboxOverlayImage(nextImageUrl, nextAltText || "");
          this.updateFooterData(nextImageIndex);
          this.setActiveThumbnailImage(nextImageIndex);
        })
      : nextButton.remove();
  }

  /**
   *
   */
  addClickListenerToPreviousButton(): void {
    const previousButton = getHtmlElementByClassName(
      CSS_CLASSES.BUTTON_PREVIOUS
    );

    this.currentImageSetLength > 1
      ? previousButton.addEventListener("click", () => {
          const previousImageIndex = this.getPreviousImageIndex(
            this.currentImageIndex
          );
          const previousImageUrl = this.getPreviousImageUrl(previousImageIndex);
          const previousAltText = this.currentImageSet
            ? this.currentImageSet[previousImageIndex].description
            : "";
          this.updateImageIndex(previousImageIndex);
          this.showLightboxOverlayImage(
            previousImageUrl,
            previousAltText || ""
          );
          this.updateFooterData(previousImageIndex);
          this.setActiveThumbnailImage(previousImageIndex);
        })
      : previousButton.remove();
  }

  /**
   *
   */
  addEventListenersForTouch(): void {
    document.addEventListener("touchstart", this.handleTouchStart);
    document.addEventListener("touchmove", this.handleTouchMove);
  }

  /**
   *
   */
  removeEventListenersForTouch(): void {
    document.removeEventListener("touchstart", this.handleTouchStart);
    document.removeEventListener("touchmove", this.handleTouchMove);
  }

  /**
   *
   * @param event
   */
  handleTouchStart(event: TouchEvent): void {
    const firstTouch = event.touches[0];
    this.leftOrRightSwipeAmount = firstTouch.clientX;
    this.swipedLeftOrRight = firstTouch.clientX > 0;
  }

  /**
   *
   * @param event
   */
  handleTouchMove(event: TouchEvent): void {
    if (!this.swipedLeftOrRight) {
      return;
    }

    const upX = event.touches[0].clientX;
    const diffX = this.leftOrRightSwipeAmount - upX;

    if (diffX > 0) {
      const buttonNext = getHtmlElementByClassName(CSS_CLASSES.BUTTON_NEXT);
      buttonNext.click();
    } else {
      const buttonPrevious = getHtmlElementByClassName(
        CSS_CLASSES.BUTTON_PREVIOUS
      );
      buttonPrevious.click();
    }

    // Reset swiped status
    this.swipedLeftOrRight = false;
  }

  addEventListenersForKeyboard(): void {
    document.addEventListener("keydown", this.addKeyboardListeners);
  }

  removeEventListenersForKeyboard(): void {
    document.removeEventListener("keydown", this.addKeyboardListeners);
  }

  /**
   *
   * @param index
   */
  getPreviousImageIndex(index: number): number {
    if (index === 0) {
      return this.currentImageSet
        ? Object.values(this.currentImageSet).length - 1
        : -1;
    } else {
      return index - 1;
    }
  }

  /**
   *
   * @param event
   */
  getImageIndex(event: Event): number {
    const element = event.target as HTMLElement;
    const imageSrc = element.getAttribute(HTML_ATTRIBUTES.SRC);
    return this.currentImageSet
      ? Object.values(this.currentImageSet).findIndex(
          (image) => image.url === imageSrc
        )
      : -1;
  }

  /**
   *
   * @param currentImageIndex
   */
  getNextImageIndex(currentImageIndex: number): number {
    const currentImageSetLength = this.currentImageSet
      ? Object.values(this.currentImageSet).length
      : -1;

    if (currentImageIndex === currentImageSetLength - 1) {
      return 0;
    } else {
      return currentImageIndex + 1;
    }
  }

  /**
   *
   * @param event
   */
  addLightboxHtmlToDom(event: Event): void {
    const imageSetId = this.getImageSetId(event);
    const imageIndex = this.getImageIndex(event);
    const imageSet = this.imageSets[imageSetId]
      ? this.imageSets[imageSetId]
      : null;

    const imageUrl: string = imageSet ? <string>imageSet[imageIndex].url : "";

    const imageDescription: string = imageSet
      ? <string>imageSet[imageIndex].description
      : "";

    const lightboxOverlay = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY
    );

    // Handle DOM Elements
    this.prepareLightboxOverlay(lightboxOverlay);
    this.showLightboxOverlayImage(imageUrl, imageDescription);
    this.updateFooterData(imageIndex);
    this.addClickListenerToCloseButton();
    this.addClickListenerToNextButton();
    this.addClickListenerToPreviousButton();
    this.setActiveThumbnailImage(imageIndex);
  }

  /**
   *
   * @param currentImageIndex
   */
  getDescriptionText(currentImageIndex: number): string {
    return this.currentImageSet
      ? <string>this.currentImageSet[currentImageIndex].description
      : "";
  }

  /**
   *
   * @param currentImageIndex
   */
  getSourceText(currentImageIndex: number): string {
    return this.currentImageSet
      ? <string>this.currentImageSet[currentImageIndex].photographer
      : "";
  }

  /**
   *
   * @param imageIndex
   */
  getPreviousImageUrl(imageIndex: number): string {
    return this.currentImageSet
      ? <string>this.currentImageSet[imageIndex].url
      : "";
  }

  /**
   *
   * @param imageIndex
   */
  getNextImageUrl(imageIndex: number): string {
    if (imageIndex === this.currentImageSetLength) {
      return this.currentImageSet ? <string>this.currentImageSet[0].url : "";
    }
    return this.currentImageSet
      ? <string>this.currentImageSet[imageIndex].url
      : "";
  }

  /**
   * Check one image of each image set.
   * Look for the dataLightboxId string.
   * If found in an image set, this is the current image set.
   * @param event
   */
  getImageSetId(event: Event): number {
    const element = event.target as HTMLElement;
    const lightboxId =
      element.getAttribute(HTML_ATTRIBUTES.DATA_LIGHTBOX_ID) || "";

    return this.imageSets.findIndex((imageSet) => {
      const firstImageSet = imageSet && imageSet[0];
      return firstImageSet?.imageSetId === lightboxId;
    });
  }

  hideBackdrop(): void {
    const backdrop = getHtmlElementByClassName(CSS_CLASSES.BACKDROP);
    backdrop.classList.replace(CSS_CLASSES.VISIBLE, CSS_CLASSES.HIDDEN);
  }

  showBackdrop(): void {
    const backdrop = getHtmlElementByClassName(CSS_CLASSES.BACKDROP);
    backdrop.classList.replace(CSS_CLASSES.HIDDEN, CSS_CLASSES.VISIBLE);
  }

  hideOverlay(): void {
    const overlay = getHtmlElementByClassName(CSS_CLASSES.LIGHTBOX_OVERLAY);
    overlay.classList.replace(CSS_CLASSES.VISIBLE, CSS_CLASSES.HIDDEN);
    this.removeEventListenersForKeyboard();
    this.removeEventListenersForTouch();
  }

  /**
   *
   * @param event
   */
  addKeyboardListeners(event: KeyboardEvent): void {
    let buttonClose: HTMLElement;
    let buttonPrevious: HTMLElement;
    let buttonNext: HTMLElement;

    switch (event.key) {
      case "Escape":
        buttonClose = getHtmlElementByClassName(CSS_CLASSES.BUTTON_CLOSE);
        return buttonClose.click();

      case "ArrowLeft":
        buttonPrevious = getHtmlElementByClassName(CSS_CLASSES.BUTTON_PREVIOUS);
        return buttonPrevious.click();

      case "ArrowRight":
        buttonNext = getHtmlElementByClassName(CSS_CLASSES.BUTTON_NEXT);
        return buttonNext.click();
      default:
        return;
    }
  }

  /**
   *
   * @param event
   */
  openLightboxOverlay(event: Event): void {
    event.preventDefault();
    this.currentImageIndex = this.getImageIndex(event);

    this.addLightboxHtmlToDom(event);
    this.setBodyOverflow();
    this.addEventListenersForKeyboard();
    this.addEventListenersForTouch();
    this.addClickListenersToThumbnailImages();
    this.addWindowResizeEventListener();
  }

  /**
   *
   */
  removeBodyOverflow(): void {
    const body = this.body as HTMLElement;
    body.classList.remove(CSS_CLASSES.NO_SCROLL);
  }

  /**
   *
   * @param imageIndex
   */
  setActiveThumbnailImage(imageIndex: number): void {
    const triggerCollection = getHtmlElementsByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_THUMBNAIL
    );

    for (let i = 0; i < triggerCollection.length; i++) {
      triggerCollection[i].classList.remove(CSS_CLASSES.ACTIVE);
    }

    const imageDiv = document.querySelector(`[data-id='${imageIndex}']`)
      ?.parentElement;
    imageDiv?.classList.add(CSS_CLASSES.ACTIVE);
  }

  /**
   *
   * @param event
   */
  setCurrentImageProperties(event: Event): void {
    const imageSetId = this.getImageSetId(event);
    this.currentImageSet = this.imageSets[imageSetId];
    this.currentImageSetLength = this.imageSets[imageSetId].length;
  }

  /**
   *
   */
  setBodyOverflow(): void {
    const body = this.body as HTMLElement;
    body.classList.add(CSS_CLASSES.NO_SCROLL);
  }

  /**
   *
   * @param lightboxOverlay
   */
  prepareLightboxOverlay(lightboxOverlay: HTMLElement): void {
    this.setLightboxOverlayMarkup(lightboxOverlay);
    this.setLightboxOverlayVisible(lightboxOverlay);
  }

  /**
   *
   * @param lightboxOverlay
   */
  setLightboxOverlayVisible(lightboxOverlay: HTMLElement): void {
    lightboxOverlay.classList.add(CSS_CLASSES.VISIBLE);
    lightboxOverlay.classList.remove(CSS_CLASSES.HIDDEN);
  }

  /**
   *
   * @param lightboxOverlay
   */
  setLightboxOverlayMarkup(lightboxOverlay: HTMLElement): void {
    let thumbnailImagesMarkup: string = "";

    if (this.currentImageSet.length > 1) {
      thumbnailImagesMarkup = getOverlayThumbnailImagesMarkup(
        this.currentImageSet
      );
    }

    const overlayMarkup = getOverlayMarkup(thumbnailImagesMarkup);

    lightboxOverlay.innerHTML = "";
    lightboxOverlay.innerHTML = overlayMarkup;
  }

  /**
   *
   * @param currentImageIndex
   */
  setImageDescription(currentImageIndex: number): void {
    const descriptionText = this.getDescriptionText(currentImageIndex);

    if (typeof descriptionText !== "undefined") {
      const description = getHtmlElementByClassName(
        CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE_DESCRIPTION
      );

      description.textContent = descriptionText;
    }
  }

  /**
   *
   * @param currentImageIndex
   */
  setImageSource(currentImageIndex: number): void {
    const sourceText = this.getSourceText(currentImageIndex);
    const imageSource = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE_SOURCE
    );
    if (typeof sourceText !== "undefined") {
      imageSource.textContent = sourceText;
    }
  }

  /**
   *
   * @param imageNumber
   */
  setImageCounter(imageNumber: number): void {
    const imageCounter = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE_COUNTER
    );

    imageCounter.innerHTML = `<span class="${
      CSS_CLASSES.IMAGE_COUNTER_FIRST_DIGIT
    }">${imageNumber}</span> / ${
      this.currentImageSet ? Object.values(this.currentImageSet).length : ""
    }`;
  }

  /**
   *
   * @param url
   * @param text
   */
  showLightboxOverlayImage(url: string, text?: string): void {
    this.showLoadingAnimation();

    const lightboxOverlayImage = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE
    );

    lightboxOverlayImage.remove();

    this.addNewImageToHtml(url.replace("small/", ""), text);
  }

  updateFooterData(currentImageIndex: number): void {
    this.imageSlider.showImageDescription &&
      this.setImageDescription(currentImageIndex);
    this.imageSlider.showImageSource && this.setImageSource(currentImageIndex);
    this.imageSlider.showImageCounter && this.currentImageSetLength > 1
      ? this.setImageCounter(currentImageIndex + 1)
      : null;
  }

  /**
   *
   * @param newIndex
   */
  updateImageIndex(newIndex: number): void {
    this.currentImageIndex = newIndex;
  }

  /**
   *
   * @param url
   * @param text
   */
  addNewImageToHtml(url: string, text?: string): void {
    const imageContainer = getHtmlElementByClassName(
      CSS_CLASSES.IMAGE_CONTAINER
    );

    const newImage = new Image();

    newImage.className = CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE;
    newImage.setAttribute(HTML_ATTRIBUTES.ALT, <string>text);
    newImage.onload = () => {
      this.hideLoadingAnimation();
      imageContainer.appendChild(newImage);
      this.adjustImageHeight();
    };
    newImage.src = url;
  }

  adjustImageHeight = () => {
    waitForElementToBeVisible(CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE).then(
      (): void => {
        const lightboxOverlayThumbnailsRow = getHtmlElementByClassName(
          CSS_CLASSES.LIGHTBOX_OVERLAY_THUMBNAIL_ROW
        );

        const lightboxOverlayImage = getHtmlElementByClassName(
          CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE
        );

        const lightboxOverlayBodyRow = getHtmlElementByClassName(
          CSS_CLASSES.LIGHTBOX_OVERLAY_BODY_ROW
        );

        if (lightboxOverlayThumbnailsRow) {
          this.handleImageHeightWithThumbnailRow();
        } else {
          this.handleImageHeightWithoutThumbnailRow();
        }

        const imageHeight = lightboxOverlayImage.offsetHeight;
        const imageContainerHeight = lightboxOverlayBodyRow.offsetHeight;

        if (imageContainerHeight > imageHeight) {
          lightboxOverlayBodyRow.style.height = `${imageHeight}px`;
        }
      }
    );
  };

  showLoadingAnimation(): void {
    const loadingAnimation = getHtmlElementByClassName(
      CSS_CLASSES.LOADING_ANIMATION
    );
    loadingAnimation.classList.add(CSS_CLASSES.VISIBLE);
    loadingAnimation.classList.remove(CSS_CLASSES.HIDDEN);
  }

  hideLoadingAnimation(): void {
    const loadingAnimationDiv = getHtmlElementByClassName(
      CSS_CLASSES.LOADING_ANIMATION
    );

    loadingAnimationDiv.classList.add(CSS_CLASSES.HIDDEN);
    loadingAnimationDiv.classList.remove(CSS_CLASSES.VISIBLE);
  }

  private handleImageHeightWithThumbnailRow() {
    const lightboxOverlay = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY
    );

    const lightboxOverlayThumbnailsRow = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_THUMBNAIL_ROW
    );

    const lightboxOverlayImage = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE
    );

    const lightboxOverlayHeaderRow = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_HEADER_ROW
    );

    const lightboxOverlayFooterRow = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_FOOTER_ROW
    );

    const loadingAnimation = getHtmlElementByClassName(
      CSS_CLASSES.LOADING_ANIMATION
    );

    const lightboxOverlayGroup1 = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_GROUP_1
    );

    const overlayHeight = lightboxOverlay.offsetHeight;
    const headerHeight = lightboxOverlayHeaderRow.offsetHeight;
    const footerHeight = lightboxOverlayFooterRow.offsetHeight;
    const thumbnailsHeight = lightboxOverlayThumbnailsRow.offsetHeight;

    lightboxOverlayGroup1.style.height = `${
      overlayHeight - thumbnailsHeight
    }px`;

    lightboxOverlayImage.style.maxHeight = `${
      overlayHeight - (thumbnailsHeight + headerHeight + footerHeight)
    }px`;

    loadingAnimation.style.height = `${
      overlayHeight - (thumbnailsHeight + headerHeight + footerHeight)
    }px`;
  }

  private handleImageHeightWithoutThumbnailRow() {
    const lightboxOverlay = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY
    );

    const lightboxOverlayImage = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE
    );

    const lightboxOverlayHeaderRow = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_HEADER_ROW
    );

    const lightboxOverlayFooterRow = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_FOOTER_ROW
    );

    const lightboxOverlayBodyRow = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_BODY_ROW
    );

    const loadingAnimation = getHtmlElementByClassName(
      CSS_CLASSES.LOADING_ANIMATION
    );

    const overlayHeight = lightboxOverlay.offsetHeight;
    const headerHeight = lightboxOverlayHeaderRow.offsetHeight;
    const footerHeight = lightboxOverlayFooterRow.offsetHeight;

    lightboxOverlayBodyRow.style.height = `${
      overlayHeight - (footerHeight + headerHeight)
    }px`;

    lightboxOverlayImage.style.maxHeight = `${
      overlayHeight - (footerHeight + headerHeight)
    }px`;

    loadingAnimation.style.height = `${
      overlayHeight - (footerHeight + headerHeight)
    }px`;
  }

  private addWindowResizeEventListener() {
    addEventListener("resize", () => {
      this.adjustImageHeight();
    });
  }
}

export default Lightbox;
