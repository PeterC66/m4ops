import { useVuexForView } from '../global/constants';

export default function initialiseWarnings() {
  if (!useVuexForView) {
    // eslint-disable-next-line max-len
    console.log('Warning: useVuexForView is false so GoHome button will not work'); // eslint-disable-line no-console
  }
}
