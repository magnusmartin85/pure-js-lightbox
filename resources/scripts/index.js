import Lightbox from './Lightbox';
import images from '../data/images';

const lightbox = new Lightbox(images);

lightbox.displayPreviewImages();

lightbox.addClickListenersToPreviewImages();
