import logger from './logger';
import actionsAfterMutations from './actionsAfterMutations';

const plugins = [actionsAfterMutations];

if (process.env.NODE_ENV !== 'production') plugins.push(logger);

export default plugins;
