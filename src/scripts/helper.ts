export const getHtmlElementByClassName = (cssClass: string) => {
  return document.querySelector(`.${cssClass}`) as HTMLElement;
};

// Source: https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
export const waitForElementToBeVisible = (cssClass: string) => {
  return new Promise((resolve) => {
    if (document.querySelector(`.${cssClass}`)) {
      return resolve(document.querySelector(`.${cssClass}`));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(`.${cssClass}`)) {
        resolve(document.querySelector(`.${cssClass}`));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
};
