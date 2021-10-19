# Lightbox
This is a simple Vanilla JS lightbox.

## Dependencies
The only dependency is [normalize.css](https://necolas.github.io/normalize.css).

## Installation
For installation cd into the project root and run `npm install`.

## Development
To serve on localhost run `gulp` on the command line.

## Build
For a production build run `gulp build` on the command line. This will generate a `dist` with minified and not minified css and js files.

```
dist
│___css
│   │   lightbox.css
│   │   lightbox.min.css
│   │   lightbox.min.css.map
│___images
│___js
│   │   lightbox.js
│   │   lightbox.min.js
│   │   lightbox.min.js.map
│___node_modules
│   │   normalize.css
│___templates
│   │   preview.html
│   │   slider.html
│   index.html

```

## Configuration
You will find image data in `resources/data/images.js`.
Copy your images to `resources/images` and adapt the `resources/data/images.js` file.

## Demo
[Demo](http://lightbox.mgnmrt.com)
