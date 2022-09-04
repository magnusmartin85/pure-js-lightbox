import { ImagesProps } from "./types";
import image0 from "../img/1.jpg";
import image1 from "../img/2.jpg";
import image2 from "../img/3.jpg";
import image3 from "../img/4.jpg";
import image4 from "../img/5.jpg";
import image5 from "../img/6.jpg";
import previewImage0 from "../img/1.jpg?as=preview";
import previewImage1 from "../img/2.jpg?as=preview";
import previewImage2 from "../img/3.jpg?as=preview";
import previewImage3 from "../img/4.jpg?as=preview";
import previewImage4 from "../img/5.jpg?as=preview";
import previewImage5 from "../img/6.jpg?as=preview";

const images: ImagesProps = [
  {
    id: 0,
    description: "Goettingen/Diemarden: Hay Bales After Mowing",
    imageUrl: image0,
    previewImageUrl: previewImage0,
    source: "© light.tales.photography by Micha Z.",
  },
  {
    id: 1,
    description: "Kiel/Schwentine: Evening on Schwentinen Bridge",
    imageUrl: image1,
    previewImageUrl: previewImage1,
    source: "© light.tales.photography by Micha Z.",
  },
  {
    description: "Sunset at Baltic Sea",
    imageUrl: image2,
    previewImageUrl: previewImage2,
    id: 2,
    source: "© light.tales.photography by Micha Z.",
  },
  {
    description: "Kiel: Christmas Market At Night",
    imageUrl: image3,
    previewImageUrl: previewImage3,
    id: 3,
    source: "© light.tales.photography by Micha Z.",
  },
  {
    description: "Goettingen/Schillerwiesen: Ice Age on Schillerwiesen",
    imageUrl: image4,
    previewImageUrl: previewImage4,
    id: 4,
    source: "© light.tales.photography by Micha Z.",
  },
  {
    description: "Goettingen/Kiessee: Gravel Lake In Winter Dress",
    imageUrl: image5,
    previewImageUrl: previewImage5,
    id: 5,
    source: "© light.tales.photography by Micha Z.",
  },
];

export { images };
