# Lightbox
> Simple, lightweight and pure javascript lightbox.

## Installation
For installation cd into the project root and run `npm install`.

## Development
To serve on localhost run `gulp` on the command line.

## Build
For a production build run `gulp build` on the command line. 
This will generate a `dist` directory with minified and unminified css and js files.
The images are being optimized and resized

```
dist
│___css
│   │   lightbox.css
│   │   lightbox.min.css
│   │   lightbox.min.css.map
│___images
│   │   01.jpg
│   │   02.jpg
│   │   03.jpg
│   │   04.jpg
│   │   05.jpg
│   │   06.jpg
│_______preview
│   │   │     01.jpg
│   │   │     02.jpg
│   │   │     03.jpg
│   │   │     04.jpg
│   │   │     05.jpg
│   │   │     06.jpg
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
You will find image data in `resources/scripts/images.js`.
Copy your images to `resources/images` and adapt the `resources/scripts/images.js` file.

## Demo
[Demo](http://lightbox.mgnmrt.com)

## Built with

### normalize.css
[normalize.css](https://github.com/necolas/normalize.css).
> A modern alternative to CSS resets

### mustache.js
> mustache.js - Logic-less {{mustache}} templates with JavaScript
[mustache](https://github.com/janl/mustache.js/) enables me, to organize my templates in separate files and load them when needed.

### Gulp Starter Kit
> A simple Gulp 4 Starter Kit for modern web development.
On basis of Gulp Starter Kit by [jr-cologne](https://github.com/jr-cologne/gulp-starter-kit) I setup my development process.

### light.tales.photography
Demo images provided by [light.tales.photography](https://www.instagram.com/light.tales.photography/).
