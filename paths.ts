import path from "node:path";

export const paths = {
  src: {
    assets: path.resolve(__dirname, "./assets"),
    images: path.resolve(__dirname, "./images"),
    root: path.resolve(__dirname, "./"),
    scripts: path.resolve(__dirname, "./scripts")
  },
  dest: {
    root: path.resolve(__dirname, "./public"),
    images: path.resolve(__dirname, "./public/images")
  }
};
