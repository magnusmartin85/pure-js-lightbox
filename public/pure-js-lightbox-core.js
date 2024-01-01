(()=>{"use strict";var e={914:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const i=s(717),a=s(589),r=s(48);t.default=class{constructor(e){this.body=(0,r.getHtmlElementByTagName)("body"),this.currentImageIndex=0,this.getImageSets=()=>{const e=(0,r.getHtmlElementsByClassName)(i.CSS_CLASSES.PREVIEW_IMAGE),t=Array.from(e).map((e=>({description:e.getAttribute(i.HTML_ATTRIBUTES.ALT),url:e.getAttribute(i.HTML_ATTRIBUTES.SRC),photographer:e.getAttribute(i.HTML_ATTRIBUTES.DATA_PHOTOGRAPHER),imageSetId:e.getAttribute(i.HTML_ATTRIBUTES.DATA_LIGHTBOX_ID)||""}))),s=[];let a="",n=-1,l=-1;return t.forEach((e=>{e.imageSetId!==a?(l=-1,n++,l++,a=e.imageSetId,e.id=l,s[n]=[],s[n].push(e)):(l++,e.id=l,s[n].push(e))})),s},this.adjustImageHeight=()=>{(0,r.waitForElementToBeVisible)(i.CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE).then((()=>{const e=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY),t=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY_THUMBNAIL_ROW),s=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE),a=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY_HEADER_ROW),n=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY_FOOTER_ROW),l=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY_BODY_ROW),o=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LOADING_ANIMATION),S=e.offsetHeight,m=a.offsetHeight,g=n.offsetHeight;if(t){const e=t.offsetHeight;(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY_GROUP_1).style.height=S-e+"px",s.style.maxHeight=S-(e+m+g)+"px",o.style.height=S-(e+m+g)+"px"}else l.style.height=S-(g+m)+"px",s.style.maxHeight=S-(g+m)+"px",o.style.height=S-(g+m)+"px"}))},this.imageSets=this.getImageSets(),this.imageSlider=e.imageSlider,this.swipedLeftOrRight=!1,this.leftOrRightSwipeAmount=0,this.currentImageSet=this.imageSets[0],this.currentImageSetLength=this.currentImageSet.length}addClickListenersToPreviewImages(){const e=(0,r.getHtmlElementsByClassName)(i.CSS_CLASSES.PREVIEW_IMAGE);for(let t=0;t<e.length;t++){e[t].addEventListener("click",(e=>{this.setCurrentImageProperties(e),this.openLightboxOverlay(e),this.showBackdrop()}))}}addClickListenersToThumbnailImages(){const e=(0,r.getHtmlElementsByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY_THUMBNAIL);for(let t=0;t<e.length;t++){const s=e[t];s.addEventListener("click",(()=>{const e=Number(s.children[0].getAttribute(i.HTML_ATTRIBUTES.DATA_ID)),t=s.children[0].getAttribute(i.HTML_ATTRIBUTES.ALT)||"",a=s.children[0].getAttribute(i.HTML_ATTRIBUTES.SRC)||"";this.updateImageIndex(e),this.showLightboxOverlayImage(a,t||""),this.updateFooterData(e),this.setActiveThumbnailImage(e)}))}}addClickListenerToCloseButton(){(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.BUTTON_CLOSE).addEventListener("click",(()=>{this.hideBackdrop(),this.hideOverlay(),this.removeBodyOverflow()}))}addClickListenerToNextButton(){const e=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.BUTTON_NEXT);this.currentImageSetLength>1?e.addEventListener("click",(()=>{const e=this.getNextImageIndex(this.currentImageIndex),t=this.getNextImageUrl(e),s=this.currentImageSet[e],i=s?s.description:"";this.updateImageIndex(e),this.showLightboxOverlayImage(t,i||""),this.updateFooterData(e),this.setActiveThumbnailImage(e)})):e.remove()}addClickListenerToPreviousButton(){const e=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.BUTTON_PREVIOUS);this.currentImageSetLength>1?e.addEventListener("click",(()=>{const e=this.getPreviousImageIndex(this.currentImageIndex),t=this.getPreviousImageUrl(e),s=this.currentImageSet?this.currentImageSet[e].description:"";this.updateImageIndex(e),this.showLightboxOverlayImage(t,s||""),this.updateFooterData(e),this.setActiveThumbnailImage(e)})):e.remove()}addEventListenersForTouch(){document.addEventListener("touchstart",this.handleTouchStart),document.addEventListener("touchmove",this.handleTouchMove)}removeEventListenersForTouch(){document.removeEventListener("touchstart",this.handleTouchStart),document.removeEventListener("touchmove",this.handleTouchMove)}handleTouchStart(e){const t=e.touches[0];this.leftOrRightSwipeAmount=t.clientX,this.swipedLeftOrRight=t.clientX>0}handleTouchMove(e){if(!this.swipedLeftOrRight)return;const t=e.touches[0].clientX;if(this.leftOrRightSwipeAmount-t>0){(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.BUTTON_NEXT).click()}else{(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.BUTTON_PREVIOUS).click()}this.swipedLeftOrRight=!1}addEventListenersForKeyboard(){document.addEventListener("keydown",this.addKeyboardListeners)}removeEventListenersForKeyboard(){document.removeEventListener("keydown",this.addKeyboardListeners)}getPreviousImageIndex(e){return 0===e?this.currentImageSet?Object.values(this.currentImageSet).length-1:-1:e-1}getImageIndex(e){const t=e.target.getAttribute(i.HTML_ATTRIBUTES.SRC);return this.currentImageSet?Object.values(this.currentImageSet).findIndex((e=>e.url===t)):-1}getNextImageIndex(e){return e===(this.currentImageSet?Object.values(this.currentImageSet).length:-1)-1?0:e+1}addLightboxHtmlToDom(e){const t=this.getImageSetId(e),s=this.getImageIndex(e),a=this.imageSets[t]?this.imageSets[t]:null,n=a?a[s].url:"",l=a?a[s].description:"",o=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY);this.prepareLightboxOverlay(o),this.showLightboxOverlayImage(n,l),this.updateFooterData(s),this.addClickListenerToCloseButton(),this.addClickListenerToNextButton(),this.addClickListenerToPreviousButton(),this.setActiveThumbnailImage(s)}getDescriptionText(e){return this.currentImageSet?this.currentImageSet[e].description:""}getSourceText(e){return this.currentImageSet?this.currentImageSet[e].photographer:""}getPreviousImageUrl(e){return this.currentImageSet?this.currentImageSet[e].url:""}getNextImageUrl(e){return e===this.currentImageSetLength?this.currentImageSet?this.currentImageSet[0].url:"":this.currentImageSet?this.currentImageSet[e].url:""}getImageSetId(e){const t=e.target.getAttribute(i.HTML_ATTRIBUTES.DATA_LIGHTBOX_ID)||"";return this.imageSets.findIndex((e=>{const s=e&&e[0];return(null==s?void 0:s.imageSetId)===t}))}hideBackdrop(){(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.BACKDROP).classList.replace(i.CSS_CLASSES.VISIBLE,i.CSS_CLASSES.HIDDEN)}showBackdrop(){(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.BACKDROP).classList.replace(i.CSS_CLASSES.HIDDEN,i.CSS_CLASSES.VISIBLE)}hideOverlay(){(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY).classList.replace(i.CSS_CLASSES.VISIBLE,i.CSS_CLASSES.HIDDEN),this.removeEventListenersForKeyboard(),this.removeEventListenersForTouch()}addKeyboardListeners(e){let t,s,a;switch(e.key){case"Escape":return t=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.BUTTON_CLOSE),t.click();case"ArrowLeft":return s=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.BUTTON_PREVIOUS),s.click();case"ArrowRight":return a=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.BUTTON_NEXT),a.click();default:return}}openLightboxOverlay(e){e.preventDefault(),this.currentImageIndex=this.getImageIndex(e),this.addLightboxHtmlToDom(e),this.setBodyOverflow(),this.addEventListenersForKeyboard(),this.addEventListenersForTouch(),this.addClickListenersToThumbnailImages()}removeBodyOverflow(){this.body.classList.remove(i.CSS_CLASSES.NO_SCROLL)}setActiveThumbnailImage(e){var t;const s=(0,r.getHtmlElementsByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY_THUMBNAIL);for(let e=0;e<s.length;e++)s[e].classList.remove(i.CSS_CLASSES.ACTIVE);const a=null===(t=document.querySelector(`[data-id='${e}']`))||void 0===t?void 0:t.parentElement;null==a||a.classList.add(i.CSS_CLASSES.ACTIVE)}setCurrentImageProperties(e){const t=this.getImageSetId(e);this.currentImageSet=this.imageSets[t],this.currentImageSetLength=this.imageSets[t].length}setBodyOverflow(){this.body.classList.add(i.CSS_CLASSES.NO_SCROLL)}prepareLightboxOverlay(e){this.setLightboxOverlayMarkup(e),this.setLightboxOverlayVisible(e)}setLightboxOverlayVisible(e){e.classList.add(i.CSS_CLASSES.VISIBLE),e.classList.remove(i.CSS_CLASSES.HIDDEN)}setLightboxOverlayMarkup(e){let t=[];this.currentImageSet.length>1&&(t=(0,a.getOverlayThumbnailImagesMarkup)(this.currentImageSet));const s=(0,a.getOverlayMarkup)(t);e.innerHTML="",e.innerHTML=s}setImageDescription(e){const t=this.getDescriptionText(e);if(void 0!==t){(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE_DESCRIPTION).textContent=t}}setImageSource(e){const t=this.getSourceText(e),s=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE_SOURCE);void 0!==t&&(s.textContent=t)}setImageCounter(e){(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE_COUNTER).innerHTML=`<span class="${i.CSS_CLASSES.IMAGE_COUNTER_FIRST_DIGIT}">${e}</span> / ${this.currentImageSet?Object.values(this.currentImageSet).length:""}`}showLightboxOverlayImage(e,t){this.showLoadingAnimation();(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE).remove(),this.addNewImageToHtml(e.replace("small/",""),t)}updateFooterData(e){this.imageSlider.showImageDescription&&this.setImageDescription(e),this.imageSlider.showImageSource&&this.setImageSource(e),this.imageSlider.showImageCounter&&this.currentImageSetLength>1&&this.setImageCounter(e+1)}updateImageIndex(e){this.currentImageIndex=e}addNewImageToHtml(e,t){const s=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.IMAGE_CONTAINER),a=new Image;a.src=e,a.className=i.CSS_CLASSES.LIGHTBOX_OVERLAY_IMAGE,a.setAttribute(i.HTML_ATTRIBUTES.ALT,t),a.onload=()=>{this.hideLoadingAnimation(),s.appendChild(a)},this.adjustImageHeight()}showLoadingAnimation(){const e=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LOADING_ANIMATION);e.classList.add(i.CSS_CLASSES.VISIBLE),e.classList.remove(i.CSS_CLASSES.HIDDEN)}hideLoadingAnimation(){const e=(0,r.getHtmlElementByClassName)(i.CSS_CLASSES.LOADING_ANIMATION);e.classList.add(i.CSS_CLASSES.HIDDEN),e.classList.remove(i.CSS_CLASSES.VISIBLE)}}},589:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getOverlayThumbnailImagesMarkup=t.getOverlayMarkup=void 0;t.getOverlayMarkup=e=>`\n<div class="lightbox-overlay-container">\n  <div class="lightbox-overlay-header-row">\n    <div class="lightbox-overlay-header-col-1"></div>\n  \n    <div class="lightbox-overlay-header-col-2">\n      <p class="lightbox-overlay-image-counter"></p>\n    </div> \n    <div class="lightbox-overlay-header-col-3">\n      <div aria-label="Close" class="button-close">\n        <div class="line1">\n          <div class="line2"></div> \n        </div>\n      </div>\n    </div>\n  </div>\n  \n  <div class="lightbox-overlay-body-row">\n    <div class="lightbox-overlay-body-col-1">\n      <div class="button-previous-row">\n        <div class="button-previous">\n          <div class="line1">\n              <div class="line2"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="lightbox-overlay-body-col-2">\n      <div class="loading-animation">\n        <img alt="loading..." src="./assets/svg/loading-animation.svg" />\n      </div>\n  \n      <img alt="" class="lightbox-overlay-image" src="" />\n    </div>\n  \n    <div class="lightbox-overlay-body-col-3">\n      <div class="button-next-row">\n        <div class="button-next">  \n            <div class="line1">\n              <div class="line2"></div>\n            </div>\n        </div> \n      </div>\n    </div>\n  </div>\n  \n  <div class="lightbox-overlay-footer-row"> \n    <div class="lightbox-overlay-footer-col-1">\n      <p class="lightbox-overlay-image-description"></p>\n      <p class="lightbox-overlay-image-source"></p>\n    </div> \n    \n    <div class="lightbox-overlay-footer-col-2">\n      <div class="lightbox-overlay-thumbnails">\n        ${e}\n      </div>\n    </div>\n  </div>\n</div> \n`.trim();t.getOverlayThumbnailImagesMarkup=e=>e.map((e=>`\n      <div class="lightbox-overlay-thumbnail">\n        <img data-id="${e.id}" alt="${e.description}" src="${e.url}"/>\n      </div>\n`.trim()))},578:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.config=void 0,t.config={imageSlider:{showImageCounter:!0,showImageDescription:!0,showImageSource:!0}}},717:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.HTML_ATTRIBUTES=t.CSS_CLASSES=void 0,t.CSS_CLASSES={BACKDROP:"lightbox-backdrop",BUTTON_CLOSE:"button-close",BUTTON_NEXT:"button-next",BUTTON_PREVIOUS:"button-previous",HIDDEN:"hidden",IMAGE_CONTAINER:"lightbox-overlay-body-col-2",IMAGE_COUNTER_FIRST_DIGIT:"first-digit",LIGHTBOX_OVERLAY:"lightbox-overlay",LIGHTBOX_OVERLAY_BODY_ROW:"lightbox-overlay-body-row",LIGHTBOX_OVERLAY_FOOTER_ROW:"lightbox-overlay-footer-row",LIGHTBOX_OVERLAY_GROUP_1:"lightbox-overlay-group-1",LIGHTBOX_OVERLAY_GROUP_2:"lightbox-overlay-group-2",LIGHTBOX_OVERLAY_HEADER_ROW:"lightbox-overlay-header-row",LIGHTBOX_OVERLAY_IMAGE:"lightbox-overlay-image",LIGHTBOX_OVERLAY_IMAGE_COUNTER:"lightbox-overlay-image-counter",LIGHTBOX_OVERLAY_IMAGE_DESCRIPTION:"lightbox-overlay-image-description",LIGHTBOX_OVERLAY_IMAGE_SOURCE:"lightbox-overlay-image-source",LIGHTBOX_OVERLAY_THUMBNAIL:"lightbox-overlay-thumbnail",LIGHTBOX_OVERLAY_THUMBNAIL_ROW:"lightbox-overlay-thumbnail-row",LOADING_ANIMATION:"loading-animation",NO_SCROLL:"no-scroll",PREVIEW_IMAGE:"preview-image",VISIBLE:"visible",ACTIVE:"active"},t.HTML_ATTRIBUTES={ALT:"alt",SRC:"src",DATA_PHOTOGRAPHER:"data-photographer",DATA_LIGHTBOX_ID:"data-lightbox-id",DATA_ID:"data-id"}},48:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getHtmlElementsByClassName=t.getHtmlElementByTagName=t.getHtmlElementsByTagName=t.waitForElementToBeVisible=t.getHtmlElementByClassName=void 0;t.getHtmlElementByClassName=e=>document.querySelector(`.${e}`);t.waitForElementToBeVisible=e=>new Promise((t=>{if(document.querySelector(`.${e}`))return t(document.querySelector(`.${e}`))}));t.getHtmlElementsByTagName=(e,t)=>t?t.querySelectorAll(`${e}`):document.querySelectorAll(`${e}`);t.getHtmlElementByTagName=(e,t)=>t?t.querySelector(`${e}`):document.querySelector(`${e}`);t.getHtmlElementsByClassName=(e,t)=>t?t.getElementsByClassName(`${e}`):document.getElementsByClassName(`${e}`)},379:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),s(202);const a=i(s(914)),r=s(578);new a.default(r.config).addClickListenersToPreviewImages()},202:(e,t,s)=>{e.exports=s.p+"pure-js-lightbox-core.css"}},t={};function s(i){var a=t[i];if(void 0!==a)return a.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,s),r.exports}s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;s.g.importScripts&&(e=s.g.location+"");var t=s.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");if(i.length)for(var a=i.length-1;a>-1&&!e;)e=i[a--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=e})();s(379)})();