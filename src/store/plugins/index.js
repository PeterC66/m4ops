import logger from './logger';

const plugins = [];

if (process.env.NODE_ENV !== 'production') plugins.push(logger);

export default plugins;
