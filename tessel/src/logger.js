import { debug as logDebug, error as logError } from './config';

export default (...args) =>
    logDebug && console.log(...args);

export const error = (...args) =>
    logError && console.error(...args);
