/**
 * Lightbox v1.0
 * by Magnus Martin
 *
 * More info:
 * https://mgnmrt.com
 *
 */
import { CSS_CLASSES } from "./constants";
import { overlayMarkup } from "./OverlayMarkup";
import { getHtmlElementByClassName, waitForElementToBeVisible } from "./helper";
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
  body = document.querySelector("body");
  currentImageIndex = 0;
  currentImageSet: ImageSetProps;
  currentImageSetLength: number;

  constructor(config: ConfigProps) {
    this.imageSets = this.getImageSets();
    this.imageSlider = config.imageSlider;
    this.swipedLeftOrRight = false;
    this.leftOrRightSwipeAmount = 0;
    this.currentImageSet = this.imageSets[0];
    this.currentImageSetLength = this.currentImageSet.length;
  }

  // 1. Create image objects
  getImageSets = () => {
    const imageCollection = document.getElementsByClassName(
      CSS_CLASSES.PREVIEW_IMAGE
    );

    // Create array of objects
    const images = Array.from(imageCollection).map((image, index) => ({
      id: index,
      description: image.getAttribute("alt"),
      url: image.getAttribute("src"),
      photographer: image.getAttribute("data-photographer"),
      imageSetId: image.getAttribute("data-lightbox-id") || ""
    }));
    const imageSets: ImageSetsProps = [];
    let currentImageSetId = "";
    let currentImageSetIndex = -1;

    images.forEach((image: ImageProps) => {
      if (image.imageSetId !== currentImageSetId) {
        currentImageSetIndex++;
        currentImageSetId = image.imageSetId;
        imageSets[currentImageSetIndex] = [];
        imageSets[currentImageSetIndex].push(image);
      } else {
        imageSets[currentImageSetIndex].push(image);
      }
    });

    return imageSets;
  };

  addClickListenersToPreviewImages(): void {
    const triggerCollection = document.getElementsByClassName(
      CSS_CLASSES.PREVIEW_IMAGE
    );

    for (let i = 0; i < triggerCollection.length; i++) {
      const currentTrigger = triggerCollection[i];
      currentTrigger.addEventListener("click", (event) => {
        this.setCurrentImageProperties(event);
        this.openLightboxOverlay(event);
        this.showBackdrop();
      });
    }
  }

  addClickListenerToCloseButton(): void {
    const closeButton = getHtmlElementByClassName(CSS_CLASSES.BUTTON_CLOSE);

    closeButton.addEventListener("click", () => {
      this.hideBackdrop();
      this.hideOverlay();
      this.removeBodyOverflow();
    });
  }

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
        })
      : nextButton.remove();
  }

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
        })
      : previousButton.remove();
  }

  addEventListenersForTouch(): void {
    document.addEventListener("touchstart", this.handleTouchStart);
    document.addEventListener("touchmove", this.handleTouchMove);
  }

  removeEventListenersForTouch(): void {
    document.removeEventListener("touchstart", this.handleTouchStart);
    document.removeEventListener("touchmove", this.handleTouchMove);
  }

  handleTouchStart(event: TouchEvent): void {
    const firstTouch = event.touches[0];
    this.leftOrRightSwipeAmount = firstTouch.clientX;
    this.swipedLeftOrRight = firstTouch.clientX > 0;
  }

  handleTouchMove(event: TouchEvent) {
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

  addEventListenersForKeyboard() {
    document.addEventListener("keydown", this.addKeyboardListeners);
  }

  removeEventListenersForKeyboard() {
    document.removeEventListener("keydown", this.addKeyboardListeners);
  }

  getPreviousImageIndex(index: number): number {
    if (index === 0) {
      return this.currentImageSet
        ? Object.values(this.currentImageSet).length - 1
        : -1;
    } else {
      return index - 1;
    }
  }

  getImageIndex(event: Event): number {
    const element = event.target as HTMLElement;
    const imageSrc = element.getAttribute("src");
    return this.currentImageSet
      ? Object.values(this.currentImageSet).findIndex(
          (image) => image.url === imageSrc
        )
      : -1;
  }

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

  addSliderHtmlToDom(event: Event) {
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
  }

  getDescriptionText(currentImageIndex: number): string {
    return this.currentImageSet
      ? <string>this.currentImageSet[currentImageIndex].description
      : "";
  }

  getSourceText(currentImageIndex: number): string {
    return this.currentImageSet
      ? <string>this.currentImageSet[currentImageIndex].photographer
      : "";
  }

  getPreviousImageUrl(imageIndex: number): string {
    return this.currentImageSet
      ? <string>this.currentImageSet[imageIndex].url
      : "";
  }

  getNextImageUrl(imageIndex: number): string {
    if (imageIndex === this.currentImageSetLength) {
      return this.currentImageSet ? <string>this.currentImageSet[0].url : "";
    }
    return this.currentImageSet
      ? <string>this.currentImageSet[imageIndex].url
      : "";
  }

  getImageSetId(event: Event) {
    const element = event.target as HTMLElement;
    const lightboxId = element.getAttribute("data-lightbox-id") || "";
    return this.imageSets.findIndex((imageSet) => {
      // Check one image of each image set.
      // Look for the dataLightboxId string
      // If found in an image set, this is the current image set.
      const firstImageSet = imageSet && imageSet[0];
      return firstImageSet?.imageSetId === lightboxId;
    });
  }

  hideBackdrop(): void {
    const backdrop = getHtmlElementByClassName(CSS_CLASSES.BACKDROP);
    backdrop.classList.replace(CSS_CLASSES.SHOW, CSS_CLASSES.HIDE);
  }

  showBackdrop(): void {
    const backdrop = getHtmlElementByClassName(CSS_CLASSES.BACKDROP);
    backdrop.classList.replace(CSS_CLASSES.HIDE, CSS_CLASSES.SHOW);
  }

  hideOverlay(): void {
    const overlay = getHtmlElementByClassName(CSS_CLASSES.LIGHTBOX_OVERLAY);
    overlay.classList.replace(CSS_CLASSES.SHOW, CSS_CLASSES.HIDE);
    this.removeEventListenersForKeyboard();
    this.removeEventListenersForTouch();
  }

  addKeyboardListeners(event: KeyboardEvent) {
    let buttonClose: HTMLElement;
    let buttonPrevious: HTMLElement;
    let buttonNext: HTMLElement;

    switch (event.key) {
      case "Escape": // esc-key
        buttonClose = getHtmlElementByClassName(CSS_CLASSES.BUTTON_CLOSE);
        return buttonClose.click();

      case "ArrowLeft": // left-key
        buttonPrevious = getHtmlElementByClassName(CSS_CLASSES.BUTTON_PREVIOUS);
        return buttonPrevious.click();

      case "ArrowRight": // right-key
        buttonNext = getHtmlElementByClassName(CSS_CLASSES.BUTTON_NEXT);
        return buttonNext.click();
      default:
        return;
    }
  }

  openLightboxOverlay(event: Event) {
    event.preventDefault();
    this.currentImageIndex = this.getImageIndex(event);

    this.addSliderHtmlToDom(event);
    this.setBodyOverflow();
    this.addEventListenersForKeyboard();
    this.addEventListenersForTouch();
  }

  removeBodyOverflow() {
    const body = this.body as HTMLElement;
    body.classList.remove(CSS_CLASSES.NO_SCROLL);
  }

  setCurrentImageProperties(event: Event) {
    const imageSetId = this.getImageSetId(event);
    this.currentImageSet = this.imageSets[imageSetId];
    this.currentImageSetLength = this.imageSets[imageSetId].length;
  }

  setBodyOverflow() {
    const body = this.body as HTMLElement;
    body.classList.add(CSS_CLASSES.NO_SCROLL);
  }

  prepareLightboxOverlay(lightboxOverlay: HTMLElement) {
    this.setLightboxOverlayMarkup(lightboxOverlay);
    this.setLightboxOverlayVisible(lightboxOverlay);
  }

  setLightboxOverlayVisible(lightboxOverlay: HTMLElement) {
    lightboxOverlay.classList.add("visible");
    lightboxOverlay.classList.remove("hidden");
  }

  setLightboxOverlayMarkup(lightboxOverlay: HTMLElement) {
    lightboxOverlay.innerHTML = "";
    lightboxOverlay.innerHTML = overlayMarkup;
  }

  setImageDescription(currentImageIndex: number) {
    const descriptionText = this.getDescriptionText(currentImageIndex);

    if (typeof descriptionText !== "undefined") {
      const description = getHtmlElementByClassName(
        CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE_DESCRIPTION
      );

      description.textContent = descriptionText;
    }
  }

  setImageSource(currentImageIndex: number) {
    const sourceText = this.getSourceText(currentImageIndex);
    const imageSource = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE_SOURCE
    );
    if (typeof sourceText !== "undefined") {
      imageSource.textContent = sourceText;
    }
  }

  setImageCounter(imageNumber: number): void {
    const imageCounter = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE_COUNTER
    );

    imageCounter.innerHTML = `<span class="first-digit">${imageNumber}</span> / ${
      this.currentImageSet ? Object.values(this.currentImageSet).length : ""
    }`;
  }

  showLightboxOverlayImage(url: string, text?: string): void {
    this.showLoadingAnimation();

    const lightboxOverlayImage = getHtmlElementByClassName(
      CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE
    );

    lightboxOverlayImage.remove();

    this.addNewImageToHtml(url, text);
  }

  updateFooterData(currentImageIndex: number) {
    this.imageSlider.showImageDescription &&
      this.setImageDescription(currentImageIndex);
    this.imageSlider.showImageSource && this.setImageSource(currentImageIndex);
    this.imageSlider.showImageCounter && this.currentImageSetLength > 1
      ? this.setImageCounter(currentImageIndex + 1)
      : null;
  }

  updateImageIndex(newIndex: number) {
    this.currentImageIndex = newIndex;
  }

  addNewImageToHtml(url: string, text?: string) {
    const imageContainer = getHtmlElementByClassName(
      CSS_CLASSES.IMAGE_CONTAINER
    );

    const newImage = new Image();

    newImage.src = url;
    newImage.className = CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE;
    newImage.setAttribute("alt", <string>text);
    newImage.onload = () => {
      this.hideLoadingAnimation();
      imageContainer.appendChild(newImage);
    };

    this.adjustImageHeight();
  }

  adjustImageHeight = () => {
    waitForElementToBeVisible(CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE).then(() => {
      const lightboxOverlay = getHtmlElementByClassName(
        CSS_CLASSES.LIGHTBOX_OVERLAY
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

      const lightboxOverlayImage = getHtmlElementByClassName(
        CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE
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
    });
  };

  showLoadingAnimation() {
    const loadingAnimation = getHtmlElementByClassName(
      CSS_CLASSES.LOADING_ANIMATION
    );
    loadingAnimation.classList.add(CSS_CLASSES.SHOW);
    loadingAnimation.classList.remove(CSS_CLASSES.HIDE);
  }

  hideLoadingAnimation() {
    const loadingAnimation = getHtmlElementByClassName(
      CSS_CLASSES.LOADING_ANIMATION
    );
    loadingAnimation.classList.add(CSS_CLASSES.HIDE);
  }
}

export default Lightbox;
