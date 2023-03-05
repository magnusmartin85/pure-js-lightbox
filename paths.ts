import path from "node:path";

const paths = {
  src: {
    assets: path.resolve(__dirname, "./src/assets"),
    images: path.resolve(__dirname, "./src/images"),
    root: path.resolve(__dirname, "./src"),
    scripts: path.resolve(__dirname, "./src/scripts")
  },
  dest: {
    root: path.resolve(__dirname, "./dist"),
    images: path.resolve(__dirname, "./dist/images")
  }
};

export { paths };
