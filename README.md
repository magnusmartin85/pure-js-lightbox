# Pure JS Lightbox

> Simple and lightweight JavaScript lightbox.

## Features

- Simple
- Mobile first
- Multi level
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
   alt="Goettingen/Diemarden: Hay Bales After Mowing"
   class="preview-image"
   data-lightbox="nature"
   data-photographer="© light.tales.photography by Micha Z."
   src="images/1.jpg"
   />
   ```

| Attribute         | Required/Optional | Description                                       |
|:------------------|-------------------|:--------------------------------------------------|
| alt               | optional          | Text appears under the image.                     |
| class             | required          | Class `preview-image` is required.                |
| data-lightbox     | required          | Distinguish images between multiple image sets.   |
| data-photographer | optional          | Text appears under the image.                     |     
| src               | required          | Relative image path. For example: `images/3.jpg`. |     

## Local development

### Installation

For installation cd into the project root and run `npm install`.

### Development

To serve on localhost run `npm run start` on the command line.

### Build

For a production build run `npm run build` on the command line.
This will generate a `dist` directory with `index.html`, `off-canvas-menu.js` and `off-canvas-menu.css`.

## Demo

[Demo](http://lightbox.mgnmrt.com)

## Built with

### [webpack](https://webpack.js.org/)

Module Bundler for JavaScript.

### [light.tales.photography](https://www.instagram.com/light.tales.photography/).

Beautiful Demo images.
