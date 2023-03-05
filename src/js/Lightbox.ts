import loadingAnimation from "../assets/loading-animation.svg";
import { ConfigProps, ImagesProps } from "./types";
import Mustache from "mustache";
import {
  CSS_CLASSES,
  PREVIEW_TEMPLATE_URL,
  SLIDER_TEMPLATE_URL
} from "./constants";

class Lightbox {
  private images: ImagesProps;
  private readonly imageCount: number;
  private imageSlider: {
    showImageCounter: boolean;
    showImageDescription: boolean;
    showImageSource: boolean;
    showImageTitle: boolean;
  };
  private swipedLeftOrRight: boolean;
  private leftOrRightSwipeAmount: number;

  constructor(config: ConfigProps) {
    this.images = config.images;
    this.imageCount = config.images.length;
    this.imageSlider = config.imageSlider;
    this.swipedLeftOrRight = false;
    this.leftOrRightSwipeAmount = 0;
  }

  body = document.querySelector("body");
  currentImageIndex: number = 0;

  addClickListenersToPreviewImages(): void {
    const triggerCollection = document.getElementsByClassName(
      CSS_CLASSES.PREVIEW_IMAGE
    );

    for (let i = 0; i < triggerCollection.length; i++) {
      const currentTrigger = triggerCollection[i];
      currentTrigger.addEventListener("click", (event) => {
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
      const nextImageIndex = this.getNextImageIndex(this.currentImageIndex);
      const nextImageUrl = this.getNextImageUrl(nextImageIndex);
      const nextAltText = this.images[nextImageIndex].description;

      this.updateImageIndex(nextImageIndex);
      this.showLightboxImage(nextImageUrl, nextAltText);
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
      const previousAltText = this.images[previousImageIndex].description;
      this.updateImageIndex(previousImageIndex);
      this.showLightboxImage(previousImageUrl, previousAltText);
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
      return this.imageCount - 1;
    } else {
      return index - 1;
    }
  }

  getCurrentImageIndex(event: Event): number {
    const element = event.target as HTMLElement;
    return Number(element.getAttribute("data-id"));
  }

  getNextImageIndex(index: number): number {
    if (index === this.imageCount - 1) {
      return 0;
    } else {
      return index + 1;
    }
  }

  addSliderHtmlToDom(event: Event) {
    const currentImageIndex = this.getCurrentImageIndex(event);
    const currentImageUrl = this.images[currentImageIndex].imageUrl;
    const currentAltText = this.images[currentImageIndex].description;

    fetch(SLIDER_TEMPLATE_URL)
      .then((response) => response.text())
      .then((template) => {
        const renderedHtml = Mustache.render(template, { loadingAnimation });
        const imageSlider = document.querySelector(
          "." + CSS_CLASSES.IMAGE_SLIDER
        ) as HTMLElement;

        // Remove old dom elements
        imageSlider.innerHTML = "";
        imageSlider.innerHTML = renderedHtml;
        imageSlider?.classList.add("visible");
        imageSlider?.classList.remove("hidden");
        this.showLightboxImage(currentImageUrl, currentAltText);
        this.updateFooterData(currentImageIndex);
        this.addClickListenerToCloseButton();
        this.addClickListenerToNextButton();
        this.addClickListenerToPreviousButton();
      });
  }

  addPreviewImageHtmlToDom() {
    fetch(PREVIEW_TEMPLATE_URL)
      .then((response) => response.text())
      .then((template) => {
        let html = "";
        for (let i = 0; i < this.imageCount; i++) {
          const config = this.getPreviewImageConfig(i);

          const renderedHtml = Mustache.render(template, config);

          html += renderedHtml;
          i = i + 2;
        }

        const imagePreviewGrid = document.querySelector(
          "." + CSS_CLASSES.IMAGE_PREVIEW_GRID
        ) as HTMLElement;
        imagePreviewGrid.insertAdjacentHTML("beforeend", html);
      })
      .then(() => this.addClickListenersToPreviewImages());
  }

  getDescriptionText(currentImageIndex: number): string {
    return this.images[currentImageIndex].description;
  }

  getSourceText(currentImageIndex: number): string {
    return this.images[currentImageIndex].source;
  }

  getPreviewImageConfig(index: number) {
    return {
      imageSlider: {
        showImageCounter: this.imageSlider.showImageCounter,
        showImageSource: this.imageSlider.showImageSource,
        showImageTitle: this.imageSlider.showImageDescription
      },
      image1: {
        description: this.images[index].description,
        imageUrl: this.images[index].imageUrl,
        previewImageUrl: this.images[index].previewImageUrl,
        source: this.images[index].source,
        id: this.images[index].id
      },
      image2: {
        description: this.images[index + 1].description,
        imageUrl: this.images[index + 1].imageUrl,
        previewImageUrl: this.images[index + 1].previewImageUrl,
        source: this.images[index + 1].source,
        id: this.images[index + 1].id
      },
      image3: {
        description: this.images[index + 2].description,
        imageUrl: this.images[index + 2].imageUrl,
        previewImageUrl: this.images[index + 2].previewImageUrl,
        source: this.images[index + 2].source,
        id: this.images[index + 2].id
      }
    };
  }

  getPreviousImageUrl(imageIndex: number): string {
    return this.images[imageIndex].imageUrl;
  }

  getNextImageUrl(imageIndex: number): string {
    if (imageIndex === this.imageCount) {
      return this.images[0].imageUrl;
    }
    return this.images[imageIndex].imageUrl;
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
    switch (event.key) {
      case "Escape": // esc-key
        const btnClose = document.querySelector(
          "." + CSS_CLASSES.BTN_CLOSE
        ) as HTMLElement;
        return btnClose.click();

      case "ArrowLeft": // left-key
        const btnPrevious = document.querySelector(
          "." + CSS_CLASSES.BTN_PREVIOUS
        ) as HTMLElement;
        return btnPrevious.click();

      case "ArrowRight": // right-key
        const btnNext = document.querySelector(
          "." + CSS_CLASSES.BTN_NEXT
        ) as HTMLElement;
        return btnNext.click();
      default:
        return;
    }
  }

  openLightboxOverlay(event: Event) {
    event.preventDefault();
    this.currentImageIndex = this.getCurrentImageIndex(event);

    this.addSliderHtmlToDom(event);
    this.setBodyOverflow();
    this.addEventListenersForKeyboard();
    this.addEventListenersForTouch();
  }

  removeBodyOverflow() {
    const body = this.body as HTMLElement;
    body.classList.remove(CSS_CLASSES.NO_SCROLL);
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
    const imageCounter = document.querySelector(
      "." + CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE_COUNTER
    ) as HTMLElement;
    imageCounter.innerHTML = `<span class="first-digit">${imageNumber}</span> / ${this.imageCount}`;
  }

  showLightboxImage(imageUrl: string, text: string): void {
    this.showLoadingAnimation();

    const overlayImage = document.querySelector(
      "." + CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE
    ) as HTMLElement;

    overlayImage.remove();

    this.addNewImageToHtml(imageUrl, text);
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

  addNewImageToHtml(imageUrl: string, text: string) {
    const imageContainer = document.querySelector(
      "." + CSS_CLASSES.IMAGE_CONTAINER
    ) as HTMLElement;

    const newImage = new Image();

    newImage.src = imageUrl;
    newImage.className = CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE;
    newImage.setAttribute("alt", text);
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
