type ImageProps = {
  id: number;
  description: string;
  source: string;
  imageUrl: string;
  previewImageUrl: string;
};
 
export type ConfigProps = {
  images: ImagesProps;
  imageSlider: {
    showImageCounter: boolean;
    showImageDescription: boolean;
    showImageSource: boolean;
    showImageTitle: boolean;
  };
};

export type ImagesProps = ImageProps[];
