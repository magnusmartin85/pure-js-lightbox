import { config } from "./config";
import Lightbox from "./Lightbox";
import "../scss/lightbox.scss";
// Create a new Lightbox instance
const lightbox = new Lightbox(config);

// Add image grid to DOM
lightbox.addPreviewImageHtmlToDom();
