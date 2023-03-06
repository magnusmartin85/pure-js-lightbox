export const overlayMarkup = `
<div class="lightbox-overlay-header-row">
  <div class="lightbox-overlay-header-col-1"></div>

  <div class="lightbox-overlay-header-col-2">
    <p class="lightbox-overlay-image-counter"></p>
  </div>
  <div class="lightbox-overlay-header-col-3">
    <div aria-label="Close" class="btn-close">
      <div class="line1">
        <div class="line2"></div>
      </div>
    </div>
  </div>
</div>

<div class="lightbox-overlay-body-row">
  <div class="lightbox-overlay-body-col-1">
    <div class="btn-previous-row">
      <div class="btn-previous">
        <div class="line1">
            <div class="line2"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="lightbox-overlay-body-col-2">
    <div class="loading-animation">
      <img alt="loading..." src="../loading-animation.svg" />
    </div>

    <img alt="" class="lightbox-overlay-image" src="" />
  </div>

  <div class="lightbox-overlay-body-col-3">
    <div class="btn-next-row">
      <div class="btn-next">  
          <div class="line1">
            <div class="line2"></div>
          </div>
      </div>
    </div>
  </div>
</div>

<div class="lightbox-overlay-footer-row">
  <div class="lightbox-overlay-footer-col-1"></div>
  <div class="lightbox-overlay-footer-col-2">
    <p class="lightbox-overlay-image-description"></p>
    <p class="lightbox-overlay-image-source"></p>
  </div>
  <div class="lightbox-overlay-footer-col-3"></div>
</div>
`.trim();
