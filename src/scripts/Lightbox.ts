/**
 * Lightbox v1.0
 * by Magnus Martin
 *
 * More info:
 * https://mgnmrt.com
 *
 */

import {
  ConfigProps,
  ImageProps,
  ImageSetProps,
  ImageSetsProps,
  ImagesProps
} from "./types";
import { CSS_CLASSES, SLIDER_TEMPLATE_URL } from "./constants";

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
  private readonly currentImageSetLength;

  constructor(config: ConfigProps) {
    this.imageSets = this.getImageSets();
    this.imageSlider = config.imageSlider;
    this.swipedLeftOrRight = false;
    this.leftOrRightSwipeAmount = 0;
    this.currentImageSet = null;
    this.currentImageSetLength = this.currentImageSet
      ? Object.values(this.currentImageSet).length
      : -1;
  }

  // 1. Create image objects
  getImageSets = () => {
    const imageCollection = document.getElementsByClassName(
      CSS_CLASSES.PREVIEW_IMAGE
    );

    // Create array of objects
    const images: ImagesProps = Array.from(imageCollection).map(
      (image, index) => ({
        id: index,
        description: image.getAttribute("alt"),
        url: image.getAttribute("src"),
        photographer: image.getAttribute("data-photographer"),
        imageSetId: image.getAttribute("data-lightbox") || ""
      })
    );
    const imageSets: ImagesProps[] = [];
    let currentImageSetId = "";
    let currentImageSetIndex = -1;
    console.warn("images", images);

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
        this.setCurrentImageSet(event);
        this.openLightboxOverlay(event);
        this.showBackdrop();
      });
    }
  }

  addClickListenerToCloseButton(): void {
    const closeButton = document.querySelector(
      "." + CSS_CLASSES.BTN_CLOSE
    ) as HTMLElement;

    closeButton.addEventListener("click", () => {
      this.hideBackdrop();
      this.hideSlider();
      this.removeBodyOverflow();
    });
  }

  addClickListenerToNextButton(): void {
    const nextButton = document.querySelector(
      "." + CSS_CLASSES.BTN_NEXT
    ) as HTMLElement;

    nextButton.addEventListener("click", () => {
      const nextImageIndex: number = this.getNextImageIndex(
        this.currentImageIndex
      );
      const nextImageUrl: string = this.getNextImageUrl(nextImageIndex);
      const nextAltText: string | null | undefined = this.currentImageSet
        ? this.currentImageSet[nextImageIndex].description
        : "";

      this.updateImageIndex(nextImageIndex);
      this.showLightboxImage(nextImageUrl, nextAltText || "");
      this.updateFooterData(nextImageIndex);
    });
  }

  addClickListenerToPreviousButton(): void {
    const previousButton = document.querySelector(
      "." + CSS_CLASSES.BTN_PREVIOUS
    ) as HTMLElement;

    previousButton.addEventListener("click", () => {
      const previousImageIndex = this.getPreviousImageIndex(
        this.currentImageIndex
      );
      const previousImageUrl = this.getPreviousImageUrl(previousImageIndex);
      const previousAltText = this.currentImageSet
        ? this.currentImageSet[previousImageIndex].description
        : "";
      this.updateImageIndex(previousImageIndex);
      this.showLightboxImage(previousImageUrl, previousAltText || "");
      this.updateFooterData(previousImageIndex);
    });
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
      const btnNext = document.querySelector(
        "." + CSS_CLASSES.BTN_NEXT
      ) as HTMLElement;
      btnNext.click();
    } else {
      const btnPrevious = document.querySelector(
        "." + CSS_CLASSES.BTN_PREVIOUS
      ) as HTMLElement;
      btnPrevious.click();
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

    fetch(SLIDER_TEMPLATE_URL)
      .then((response) => response.text())
      .then((template) => {
        const imageSlider = document.querySelector(
          "." + CSS_CLASSES.IMAGE_SLIDER
        ) as HTMLElement;

        // Handle DOM Elements
        imageSlider.innerHTML = "";
        imageSlider.innerHTML = template;
        imageSlider?.classList.add("visible");
        imageSlider?.classList.remove("hidden");
        this.showLightboxImage(imageUrl, imageDescription);
        this.updateFooterData(imageIndex);
        this.addClickListenerToCloseButton();
        this.addClickListenerToNextButton();
        this.addClickListenerToPreviousButton();
      });
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
    const lightboxId = element.getAttribute("data-lightbox") || "";
    return this.imageSets.findIndex((imageSet) => {
      // Check one image of each image set.
      // Look for the dataLightboxId string
      // If found in an image set, this is the current image set.
      const firstImageSet = imageSet && imageSet[0];
      return firstImageSet?.imageSetId === lightboxId;
    });
  }

  hideBackdrop(): void {
    const backdrop = document.querySelector(
      "." + CSS_CLASSES.BACKDROP
    ) as HTMLElement;
    backdrop.classList.replace(CSS_CLASSES.SHOW, CSS_CLASSES.HIDE);
  }

  showBackdrop(): void {
    const backdrop = document.querySelector(
      "." + CSS_CLASSES.BACKDROP
    ) as HTMLElement;
    backdrop.classList.replace(CSS_CLASSES.HIDE, CSS_CLASSES.SHOW);
  }

  hideSlider(): void {
    const slider = document.querySelector(".image-slider") as HTMLElement;
    slider.classList.replace(CSS_CLASSES.SHOW, CSS_CLASSES.HIDE);
    this.removeEventListenersForKeyboard();
    this.removeEventListenersForTouch();
  }

  addKeyboardListeners(event: KeyboardEvent) {
    let btnClose: HTMLElement;
    let btnPrevious: HTMLElement;
    let btnNext: HTMLElement;

    switch (event.key) {
      case "Escape": // esc-key
        btnClose = document.querySelector(
          "." + CSS_CLASSES.BTN_CLOSE
        ) as HTMLElement;
        return btnClose.click();

      case "ArrowLeft": // left-key
        btnPrevious = document.querySelector(
          "." + CSS_CLASSES.BTN_PREVIOUS
        ) as HTMLElement;
        return btnPrevious.click();

      case "ArrowRight": // right-key
        btnNext = document.querySelector(
          "." + CSS_CLASSES.BTN_NEXT
        ) as HTMLElement;
        return btnNext.click();
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

  setCurrentImageSet(event: Event) {
    const imageSetId = this.getImageSetId(event);
    this.currentImageSet = this.imageSets[imageSetId];
  }

  setBodyOverflow() {
    const body = this.body as HTMLElement;
    body.classList.add(CSS_CLASSES.NO_SCROLL);
  }

  setImageDescription(currentImageIndex: number) {
    const descriptionText = this.getDescriptionText(currentImageIndex);

    if (typeof descriptionText !== "undefined") {
      const description = document.querySelector(
        "." + CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE_DESCRIPTION
      ) as HTMLElement;
      description.textContent = descriptionText;
    }
  }

  setImageSource(currentImageIndex: number) {
    const sourceText = this.getSourceText(currentImageIndex);
    const imageSource = document.querySelector(
      "." + CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE_SOURCE
    ) as HTMLElement;
    if (typeof sourceText !== "undefined") {
      imageSource.textContent = sourceText;
    }
  }

  setImageCounter(imageNumber: number): void {
    console.warn("imageNumber", imageNumber);
    const imageCounter = document.querySelector(
      "." + CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE_COUNTER
    ) as HTMLElement;
    imageCounter.innerHTML = `<span class="first-digit">${imageNumber}</span> / ${
      this.currentImageSet ? Object.values(this.currentImageSet).length : ""
    }`;
  }

  showLightboxImage(url: string, text?: string): void {
    this.showLoadingAnimation();

    const overlayImage = document.querySelector(
      "." + CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE
    ) as HTMLElement;

    overlayImage.remove();

    this.addNewImageToHtml(url, text);
  }

  updateFooterData(currentImageIndex: number) {
    this.imageSlider.showImageDescription &&
      this.setImageDescription(currentImageIndex);
    this.imageSlider.showImageSource && this.setImageSource(currentImageIndex);
    this.imageSlider.showImageCounter &&
      this.setImageCounter(currentImageIndex + 1);
  }

  updateImageIndex(newIndex: number) {
    this.currentImageIndex = newIndex;
  }

  addNewImageToHtml(url: string, text?: string) {
    const imageContainer = document.querySelector(
      "." + CSS_CLASSES.IMAGE_CONTAINER
    ) as HTMLElement;

    const newImage = new Image();

    newImage.src = url;
    newImage.className = CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE;
    newImage.setAttribute("alt", <string>text);
    newImage.onload = () => {
      this.hideLoadingAnimation();
      imageContainer.appendChild(newImage);
    };
  }

  showLoadingAnimation() {
    const loadingDiv = document.querySelector(
      "." + CSS_CLASSES.LOADING_ANIMATION
    ) as HTMLElement;
    loadingDiv.classList.add(CSS_CLASSES.SHOW);
    loadingDiv.classList.remove(CSS_CLASSES.HIDE);
  }

  hideLoadingAnimation() {
    const loadingDiv = document.querySelector(
      "." + CSS_CLASSES.LOADING_ANIMATION
    ) as HTMLElement;
    loadingDiv.classList.add(CSS_CLASSES.HIDE);
  }
}

export default Lightbox;
