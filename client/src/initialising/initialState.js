import { ldidOSM, ldidBingAerial } from '../modules/mapping/constants';

export const initialStateChosenLayers = [
  { ldid: ldidBingAerial, opacity: 1, displayType: 'A' },
  { ldid: ldidOSM, opacity: 0.5, displayType: 'A' },
];

export const dummy = 0;
