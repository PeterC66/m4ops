import { SimpleButton } from '@terrestris/react-geo';

import withDataAsProps from './withDataAsProps';
import { getMainmap } from '../subsystems/mapping';
import { getPlace } from '../subsystems/geography';

/* const DataAwareButton = props => (
  <SimpleButton {...props} />
);
 */
export default withDataAsProps(SimpleButton, [getPlace, getMainmap]);
