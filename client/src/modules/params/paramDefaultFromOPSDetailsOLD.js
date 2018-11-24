import { coordDecimalPlaces } from '../../global/constants';
import { maxShowlevel } from '../demo/ShowLevels';

export const paramDefaultMap = new Map();
paramDefaultMap.set('File', () => 'M4OPS');
paramDefaultMap.set('Green', () => '');
paramDefaultMap.set('Showlevel', () => maxShowlevel.toString());
paramDefaultMap.set('NoCHNG', () => '');
paramDefaultMap.set('OPS', () => 'HcN');
paramDefaultMap.set('NoShift', () => '');
paramDefaultMap.set('LoadwA', () => '');
paramDefaultMap.set('LoadwI', () => '');
paramDefaultMap.set('Tab', () => 'Action');
paramDefaultMap.set('Layer0', () => 'Bing Aerial');
paramDefaultMap.set('Layer1', () => 'OpenStreetMap');
paramDefaultMap.set('Lon', OPSDetails => (OPSDetails.Lon ? OPSDetails.Lon.toFixed(coordDecimalPlaces) : 'Unknown LON'));
paramDefaultMap.set('Lat', OPSDetails => (OPSDetails.Lat ? OPSDetails.Lat.toFixed(coordDecimalPlaces) : 'Unknown LAT'));
// This provides a default - remember Rotation is in radians (1 radian = 57.3 degrees)
paramDefaultMap.set('Zoom', OPSDetails => (OPSDetails.Zoom ? OPSDetails.Zoom : 16));
paramDefaultMap.set('Rotation', OPSDetails => (OPSDetails.Rotation ? OPSDetails.Rotation : 0));
paramDefaultMap.set('Debug', () => '');
paramDefaultMap.set('Layer2', () => '');
paramDefaultMap.set('Layer3', () => '');
paramDefaultMap.set('Layer4', () => '');
paramDefaultMap.set('Displaystyle', () => '');
paramDefaultMap.set('Extent', () => '');
paramDefaultMap.set('Click', () => '');
paramDefaultMap.set('Colours', () => '');
paramDefaultMap.set('Splash', () => '');

export const paramDefaultFromOPSDetails = (OPSDetails, param) => {
  if (paramDefaultMap.has(param)) {
    return paramDefaultMap.get(param)(OPSDetails);
  }
  console.log(`paramDefault called with unknown param = '${param}'`); // eslint-disable-line no-console
  return '';
};
