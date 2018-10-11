import { beginsWith } from '../../global/utils';

const OPSFoldername = 'HcN'; // TODO temporary

// For encodeURI etc use see http://xkr.us/articles/javascript/encode-compare/
// Returns an encoded URL; path is expected to end with /
export const encodedFullOpsURL = (path, filename) => {
  let result = path;
  if (!beginsWith(result, 'http')) { // it is in short form (*.geojson) and needs topping
    result = `OPS/${OPSFoldername}/${result}`;
  }
  result = encodeURI(result) + encodeURIComponent(filename); // So any # in filename are encoded
  return result;
};

export const fullOpsURL = (url) => {
  let result = url;
  if (!beginsWith(result, 'http')) { // it is in short form (*.geojson) and needs topping
    result = `OPS/${OPSFoldername}/${result}`;
  }
  return result;
};
