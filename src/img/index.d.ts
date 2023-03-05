declare module "*.jpg" {
  const value: any;
  export = value;
}

declare module "*.jpg?as=preview" {
  const value: any;
  export = value;
}

declare module "*.svg" {
  const content: any;
  export default content;
}
