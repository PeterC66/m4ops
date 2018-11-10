import { ldidOSM, ldidBingAerial } from '../modules/mapping/constants';

export const initialStateChosenLayers = [
  { ldid: ldidBingAerial, opacity: 1, displaytype: 'A' },
  { ldid: ldidOSM, opacity: 0.5, displaytype: 'A' },
];

export const initialCurrentOptionArray = [
  'Europe',
  'England',
  'Cambridgeshire',
  'HcN',
];
