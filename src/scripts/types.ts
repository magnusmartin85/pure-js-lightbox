export type ConfigProps = {
  imageSlider: {
    showImageCounter: boolean;
    showImageDescription: boolean;
    showImageSource: boolean;
  };
  images?: ImagesProps;
};

export type ImageProps = {
  description?: string | null;
  id: number;
  imageSetId: string;
  photographer?: string | null;
  url: string | null;
};

export type ImagesProps = ImageProps[];

export type ImageSetProps = {
  [imageSetId: number]: ImageProps;
} | null;

export type ImageSetsProps = ImageSetProps[];
