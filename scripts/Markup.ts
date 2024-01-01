import { ImageSetProps } from "./types";

export const getOverlayMarkup = (thumbnailImagesMarkup: string[]) =>
  `
<div class="lightbox-overlay-container">
  <div class="lightbox-overlay-header-row">
    <div class="lightbox-overlay-header-col-1"></div>
  
    <div class="lightbox-overlay-header-col-2">
      <p class="lightbox-overlay-image-counter"></p>
    </div> 
    <div class="lightbox-overlay-header-col-3">
      <div aria-label="Close" class="button-close">
        <div class="line1">
          <div class="line2"></div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="lightbox-overlay-body-row">
    <div class="lightbox-overlay-body-col-1">
      <div class="button-previous-row">
        <div class="button-previous">
          <div class="line1">
              <div class="line2"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="lightbox-overlay-body-col-2">
      <div class="loading-animation">
        <img alt="loading..." src="./assets/svg/loading-animation.svg" />
      </div>
  
      <img alt="" class="lightbox-overlay-image" src="" />
    </div>
  
    <div class="lightbox-overlay-body-col-3">
      <div class="button-next-row">
        <div class="button-next">  
            <div class="line1">
              <div class="line2"></div>
            </div>
        </div> 
      </div>
    </div>
  </div>
  
  <div class="lightbox-overlay-footer-row"> 
    <div class="lightbox-overlay-footer-col-1">
      <p class="lightbox-overlay-image-description"></p>
      <p class="lightbox-overlay-image-source"></p>
    </div> 
    
    <div class="lightbox-overlay-footer-col-2">
      <div class="lightbox-overlay-thumbnails">
        ${thumbnailImagesMarkup}
      </div>
    </div>
  </div>
</div> 
`.trim();

export const getOverlayThumbnailImagesMarkup = (imageSet: ImageSetProps) => {
  return imageSet.map((image) => {
    return `
      <div class="lightbox-overlay-thumbnail">
        <img data-id="${image.id}" alt="${image.description}" src="${image.url}"/>
      </div>
`.trim();
  });
};
