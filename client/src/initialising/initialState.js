import {
  ldidOSM,
  ldidBingAerial,
  ldidBingAerialWithLabels,
} from '../modules/mapping/constants';
import { displayTypeEnum } from '../global/constants';

const initialStateChosenLayers = {};

initialStateChosenLayers.default = [
  {
    ldid: ldidBingAerial,
    opacity: 1,
    displaytype: displayTypeEnum.mostlyRasters,
  },
  {
    ldid: ldidOSM,
    opacity: 0.5,
    displaytype: displayTypeEnum.mostlyRasters,
  },
];

export const initialStateRhChosenLayer = ldidBingAerialWithLabels;

export const initialStateChosenLayersByOpsCode = (opsCode) => {
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
