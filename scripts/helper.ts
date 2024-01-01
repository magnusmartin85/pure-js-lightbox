/**
 *
 * @param cssClass
 */
export const getHtmlElementByClassName = (
  cssClass: string | { [p: number]: string }
): HTMLElement => {
  return document.querySelector(`.${cssClass}`) as HTMLElement;
};

/**
 * Source: https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
 * @param cssClass
 */
export const waitForElementToBeVisible = (cssClass: string): Promise<any> => {
  return new Promise((resolve) => {
    if (document.querySelector(`.${cssClass}`)) {
      return resolve(document.querySelector(`.${cssClass}`));
    }
  });
};

/**
 *
 * @param tagName
 * @param root
 */
export const getHtmlElementsByTagName = (
  tagName: string | { [p: number]: string },
  root?: Element
): NodeListOf<HTMLElement> => {
  if (root) {
    return root.querySelectorAll(`${tagName}`);
  }
  return document.querySelectorAll(`${tagName}`);
};
/**
 *
 * @param tagName
 * @param root
 */
export const getHtmlElementByTagName = (
  tagName: string | { [p: number]: string },
  root?: Element
): HTMLElement => {
  if (root) {
    return root.querySelector(`${tagName}`) as HTMLElement;
  }
  return document.querySelector(`${tagName}`) as HTMLElement;
};

/**
 *
 * @param tagName
 * @param root
 */
export const getHtmlElementsByClassName = (
  tagName: string | { [p: number]: string },
  root?: Element
): HTMLCollectionOf<Element> => {
  if (root) {
    return root.getElementsByClassName(`${tagName}`);
  }
  return document.getElementsByClassName(`${tagName}`);
};
