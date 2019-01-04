/* eslint-disable */
export function HeadAndDescText(head, desc, ev, fnHead, fnBody) {
  // return a string with a heading/description pair eg that can be appended
  // the ev argument is a string (eg "", or "ev") that is inserted into the id of the element - for the CSS
  // Note that js call by reference is complicated so we do not use it
  // See http://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language
  // the fnHead & fnBody (links) must have been processed by encodeURI before calling HeadAndDesc
  let s = '';

  if (head) {
    if (fnHead) s += `<a target="_blank" title="Click to follow the link in a new tab" href="${fnHead}">`;
    s += `<p class="results${ev}Head">${CSV2HTML(head)}</p>`;
    if (fnHead) s += '</a>';
  }

  if (desc) {
    if (fnBody) s += `<a target="_blank" title="Click to follow the link in a new tab" href="${fnBody}">`;
    s += `<p class="results${ev}Body">${CSV2HTML(desc)}</p>`;
    if (fnBody) s += '</a>';
  }

  return s;
}

export const dummy = 0;
