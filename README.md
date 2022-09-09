# Pure JS Lightbox

> Simple and lightweight JavaScript lightbox.

## Simple

1. Add script tag right before closing body tag:  
   `<script async src="pure-js-lightbox.js"></script>`

2. Add CSS class `preview-image` to your images.

## Lightweight

JavaScript: ~36kb.

## Installation

For installation cd into the project root and run `npm install`.

## Development

To serve on localhost run `npm run start` on the command line.

## Build

For a production build run `npm run build` on the command line. This will generate a `public` directory with minified js
file. Images are being optimized and resized.

```
public
│___[Hashed Images]
│___pure-js-lightbox.js
│___templates
│   │   preview.html
│   │   slider.html
│   index.html
│   loading-animation.svg
```

## Configuration

You will find demo image data in `src/js/images.ts`. Copy your own images to `src/img` and adapt the `src/js/images.ts`
file.

## Demo

[Demo](http://lightbox.mgnmrt.com)

## Built with

### [mustache.js](https://github.com/janl/mustache.js/)

Logic-less {{mustache}} templates with JavaScript.

### [webpack](https://webpack.js.org/)

Module Bundler for JavaScript.

### [light.tales.photography](https://www.instagram.com/light.tales.photography/).

Beautiful Demo images.
