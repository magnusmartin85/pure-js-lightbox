import config from "./config.js";
import Lightbox from "./Lightbox.js";
import "../scss/lightbox.scss";

// create a new lightbox instance
const lightbox = new Lightbox(config);

lightbox.addPreviewImageHtmlToDom();
