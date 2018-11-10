import { ldidOSM, ldidBingAerial } from '../modules/mapping/constants';

const initialStateChosenLayers = {};

initialStateChosenLayers.default = [
  { ldid: ldidBingAerial, opacity: 1, displaytype: 'A' },
  { ldid: ldidOSM, opacity: 0.5, displaytype: 'A' },
];
// Add other initial states here

export const initialStateChosenLayersByOpsCode =
  (opsCode) => {
    const result = initialStateChosenLayers[opsCode]
    || initialStateChosenLayers.default;
    return result;
  };

export const initialCurrentOptionArray = [
  'Europe',
  'England',
  'Cambridgeshire',
  'HcN',
];
