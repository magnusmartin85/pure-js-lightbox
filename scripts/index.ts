import "../styles/index.scss";
import Lightbox from "./Lightbox";
import { config } from "./config";

// Create a new Lightbox instance
const lightbox = new Lightbox(config);

lightbox.addClickListenersToPreviewImages();
