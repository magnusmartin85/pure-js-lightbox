export type ConfigProps = {
  imageSlider: {
    showImageCounter: boolean;
    showImageDescription: boolean;
    showImageSource: boolean;
  };
};

export type ImageProps = {
  description?: string | null;
  id?: number;
  imageSetId: string;
  photographer?: string | null;
  url: string | null;
};

export type ImageSetsProps = ImageSetProps[];

export type ImageSetProps = ImageProps[];
