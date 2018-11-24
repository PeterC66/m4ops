import store from '../../../store';
import {
  isDefined,
  isString,
  replaceAll,
  thisYear,
} from '../../../global/utils';

function A2B(
  textIn,
  conversionArray,
  fromName,
  toName,
  booForwards,
  booName,
  isURI,
) {
  // Convert from one format to another using an array, optionally with a conditional
  // booForwards specifies the direction of search through the array
  if (textIn) {
    let textOut = textIn;
    if (isString(textIn) && isDefined(conversionArray)) { // Do nothing if called with non-string (eg AllProperties FieldSpec), or there is no conversion array
      if (fromName && toName && isDefined(booForwards)) {
        for (let i = 0; i < conversionArray.length; i += 1) {
          const iToUse = booForwards ? i : (conversionArray.length - 1 - i);
          const fromString = conversionArray[iToUse][fromName];
          if (isDefined(fromString)) {
            const toString = conversionArray[iToUse][toName];
            if (isDefined(toString)) { // Some falsey strings are still valid
              if (!(booName && isURI && !conversionArray[iToUse][booName])) {
                textOut = replaceAll(textOut, fromString, toString);
              }
            } else {
              /* eslint-disable max-len, no-console */
              console.log('A2B toString not defined:', conversionArray, iToUse, toName, booForwards);
            }
          } else {
            console.log('A2B fromString not defined:', conversionArray, iToUse, fromName, booForwards);
          }
        }
      } else {
        console.log('A2B called with error in parameters:', textIn, conversionArray, fromName, toName, booForwards, booName);
        /* eslint-enable max-len, no-console */
      }
    }
    return textOut;
  }
  return '';
}

export function CSV2Plain(textIn) {
  return A2B(
    textIn,
    store.getters.TextConversionsArray,
    'abbcode',
    'abbplain',
    true,
  );
}

// When converting back we swap the elements and the processing order
export function Plain2CSV(textIn) {
  return A2B(
    textIn,
    store.getters.TextConversionsArray,
    'abbplain',
    'abbcode',
    false,
  );
}

export function CSV2HTML(textIn) {
  return A2B(
    textIn,
    store.getters.TextConversionsArray,
    'abbcode',
    'abbhtml',
    true,
  );
}

// When converting back we swap the elements and the processing order
export function HTML2CSV(htmlIn) {
  return A2B(
    htmlIn,
    store.getters.TextConversionsArray,
    'abbhtml',
    'abbcode',
    false,
  );
}

export function disabbreviate(htmlIn) { // Note this is not the converse of abbreviate
  if (htmlIn) {
    // replace any occurrences of an abbreviation by the corresponding html
    // In this order to allow replacements in replacements
    // 1) abbreviations just for this OPS defined in OPS.json
    let htmlOut = A2B(
      htmlIn,
      store.getters.OPSDetails.AbbreviationsArray,
      'abbcode',
      'abbhtml',
      true,
    );
    // 2) Two-way (csv<->html) conversions defined in M4OPS.json - this way is CSV->HTML
    htmlOut = CSV2HTML(htmlOut);
    // 3) standard abbreviations defined in M4OPS.json
    htmlOut = A2B(
      htmlOut,
      store.getters.AbbreviationsArray,
      'abbcode',
      'abbhtml',
      true,
    );
    // 4) standard hard-coded abbreviations - every occurrence
    htmlOut = replaceAll(htmlOut, 'THISYEAR', thisYear().toString());
    return htmlOut;
  }
  return '';
}

export function abbreviate(textIn, isURI) {
  const textOut = A2B(
    textIn,
    store.getters.toAbbreviateArray,
    'abblong',
    'abbshort',
    true,
    'OKforURI',
    isURI,
  );
  //  if (textOut!=textIn) console.log("Abb",textOut,textIn);
  return textOut;
}
