/**
 * This function provides Safari compatibility.
 * Chrome can handle the preferred approach of just putting the follow at the top of the JS module: 
 *   import stylesheet from './SearchInput.css' with { type: 'css' };
 * @param {string} styleSheetPath
 */
async function cssStyleSheetFromFile(styleSheetPath) {
  try {
    const sheet = new CSSStyleSheet();
    const resp = await fetch(styleSheetPath);
    if (!resp.ok) {
      throw new Error(`Failed to fetch stylesheet ${styleSheetPath}`);
    }
    const cssText = await resp.text();
    console.log(cssText);
    await sheet.replace(cssText);
    return sheet;
  } catch (err) {
    console.error(`Failed to load or parse stylesheet: ${styleSheetPath}`, err);
  }
}

// Workaround for Safari that also works with Chrome.
export const loadStyleSheets = async function (styleSheetPaths) {
 const promises = styleSheetPaths.map(cssStyleSheetFromFile);
  return Promise.all(promises);
};
