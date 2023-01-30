const path = require("path");

const paths = {
  src: {
    assets: path.resolve(__dirname, "./src/assets"),
    js: path.resolve(__dirname, "./src/js"),
    root: path.resolve(__dirname, "./src"),
    templates: path.resolve(__dirname, "./src/templates")
  },
  dest: {
    root: path.resolve(__dirname, "./public")
  }
};

export { paths };
