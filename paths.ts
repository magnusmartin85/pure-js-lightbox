import path from "node:path";

export const paths = {
  src: {
    root: path.resolve(__dirname, "./"),
    svg: path.resolve(__dirname, "./assets/svg"),
    scripts: path.resolve(__dirname, "./scripts")
  },
  dest: {
    root: path.resolve(__dirname, "./public"),
    svg: path.resolve(__dirname, "./public/assets/svg")
  }
};
