# Pure JS Lightbox

> Simple and lightweight JavaScript lightbox.

## Features

- Simple
- Mobile friendly
- Touch and swipe support
- Keyboard navigation
- Lightweight: ~9KB (generated js file)

## Getting started

1. Download the zip file of the latest release from GitHub. You will find a js and a css file inside.
2. Include the css file at the top of your page in the head section:
   `<link href="path/to/pure-js-lightbox.css" rel="stylesheet" />`
3. Place the script tag at the bottom of your page right before the closing body tag:
   `<script src="path/to/pure-js-lightbox.js"></script>`
4. Add `<img>` tags with attributes to your html:

   ```
   <img
   class="preview-image"
   data-lightbox-id="nature"
   src="images/1.jpg"
   alt="Goettingen/Diemarden: Hay Bales After Mowing"
   data-photographer="© light.tales.photography by Micha Z."
   />
   ```
5. Add markup for overlay:

   ```
    <div class="lightbox-overlay hidden"></div>
   ```
6. Add markup for backdrop:

    ```
    <div class="lightbox-backdrop hidden"></div>
    ```

| Attribute         | Required/Optional | Description                                       |
|:------------------|-------------------|:--------------------------------------------------|
| class             | required          | Defaults to `preview-image`.                      |
| data-lightbox-id  | required          | Distinguish images between multiple image sets.   |
| src               | required          | Relative image path. For example: `images/3.jpg`. |  
| alt               | optional          | Text appears under the image.                     | 
| data-photographer | optional          | Source of the image. Appears under the image.     |  

## Local development

### Installation

For installation cd into the project root and run `npm install`.

### Development

To serve on localhost run `npm run start` on the command line.

### Build

For a production build run `npm run build` on the command line.
This will generate a `dist` directory with `index.html`, `pure-js-lightbox.js` and `pure-js-lightbox.css`.

## Demo

[Demo](https://pure-js-lightbox.com/)

## Built with

### [TypeScript](https://www.typescriptlang.org/)

TypeScript is JavaScript with syntax for types.

### [Sass](https://sass-lang.com/)

CSS with superpowers.

### [webpack](https://webpack.js.org/)

Module Bundler for JavaScript.

### [Lorem Picsum](https://picsum.photos)

Demo images for the repository.

### [light.tales.photography](https://www.instagram.com/light.tales.photography/)

Beautiful demo images (on the demo web page).

## Author

[Magnus Martin](https://mgnmrt.com/)
