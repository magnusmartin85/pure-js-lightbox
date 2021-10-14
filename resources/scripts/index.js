import config from './config';
import Lightbox from './Lightbox';

// create a new lightbox instance
const lightbox = new Lightbox(config);

// initialize lightbox
lightbox.initializeLightbox(lightbox);
