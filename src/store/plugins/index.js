import logger from './logger';
import actionsAfterMutations from './actionsAfterMutations';
import { dontUseLogger } from '../../global/constants';

const plugins = [actionsAfterMutations];

if (
  process.env.NODE_ENV !== 'production' &&
  !dontUseLogger
) plugins.push(logger);

export default plugins;
