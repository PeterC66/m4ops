import { useVuexForView } from '../global/constants';

export default function initialiseWarnings() {
  if (!useVuexForView) {
    console.log('Warning: useVuexForView is ', useVuexForView);
  }
}
