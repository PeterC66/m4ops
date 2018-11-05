import { replaceAll } from '../../../global/utils';

export function getLayerTitles(inString) {
  // Takes a comma separated list of titles and returns an array of them
  // console.log("inString",inString);
  let layerString = inString;
  // Cope with no quotes and/or no brackets
  // First remove any brackets
  if (layerString.substr(0, 1) === '[') layerString = layerString.substr(1);
  if (layerString.substr(-1) === ']') layerString = layerString.slice(0, -1);
  if (layerString.substr(0, 1) !== '"') { // Assume there are no quotes at all so we need to add them before and after everywhere
    // We have to do it this way in two bits because of the danger of endless recursion
    // First escape any double quotes
    layerString = replaceAll(layerString, '"', 'ZXZX');
    layerString = replaceAll(layerString, 'ZXZX', '\\"'); // the backslash itself is here escaped
    // Now put in the double quotes
    layerString = replaceAll(layerString, ',', 'ZXZX');
    layerString = `"${replaceAll(layerString, 'ZXZX', '","')}"`;
  }
  // Add back the brackets
  layerString = `[${layerString}]`;
  // console.log("layerString",layerString);
  return JSON.parse(layerString);
}

export const dummy = 0;
