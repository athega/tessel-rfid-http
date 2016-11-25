import fs from 'fs';
import path from 'path';
import { successSound, failureSound } from './config';
import log from './logger';

let SUCCESS = null;
const getSuccessSound = () => {
    if (!SUCCESS) {
        SUCCESS = fs.readFileSync(successSound);
    }
    return SUCCESS;
};

let FAILURE = null;
const getFailureSound = () => {
    if (!FAILURE) {
        FAILURE = fs.readFileSync(failureSound);
    }
    return FAILURE;
};

let play = (sound) => log('No audio detected - skipping play of', sound);

try {
    play = require('./audio-t1').default; // eslint-disable-line global-require
    log('Initialized Tessel 1 audio');
} catch (err) {
    log('No Tessel 1 audio support', err);
    try {
        play = require('./audio-t2').default; // eslint-disable-line global-require
        SUCCESS = path.join(__dirname, successSound);
        FAILURE = path.join(__dirname, failureSound);
        log('Initialized Tessel 2 audio');
    } catch (err) {
        log('No Tessel 2 audio support', err);
    }
}

export const playSuccess = () => {
    log(`Playing ${successSound}`);
    play(getSuccessSound());
};
export const playFailure = () => {
    log(`Playing ${failureSound}`);
    play(getFailureSound());
};
