import request from 'request';

import { endpoint, endpointMethod, endpointQueryTemplate, apiKey } from './config';
import log, { error } from './logger';
import { resetLeds, ledsToRegistered, ledsToRegisterError } from './leds';
import { playSuccess, playFailure } from './audio';

let LAST_SEEN_RFID = '';

const buildQueryUrl = (parameters = {}) => {
    let query = endpointQueryTemplate;

    for (const name in parameters) {
        log(`Replacing \${${name}} with '${parameters[name]}'`);
        query = query.replace(new RegExp(`\\$\\{${name}\\}`, 'g'), encodeURIComponent(parameters[name]));
    }

    return query;
};

export default (subject, rfid) => {
    if (rfid === LAST_SEEN_RFID) {
        log(`Skipping RFID ${rfid} - already scanned`);
        resetLeds();
        return;
    }

    const url = endpoint + buildQueryUrl({ subject, rfid });

    log(`Going to ${endpointMethod} to ${url}`);
    request({
        method: endpointMethod,
        url,
        headers: apiKey
            ? { 'X-Api-Key': apiKey }
            : {},
    }, (err, response, body) => {
        if (err) {
            error(`An error occurred when registering event at ${url}`, err);
            ledsToRegisterError();
            playFailure();
            return;
        }

        if (response.statusCode < 200 && response.statusCode > 299) {
            error(`An error occurred when registering event at ${url}. Got status ${response.statusCode} ${response.statusMessage}.`);
            ledsToRegisterError();
            playFailure();
            return;
        }

        log('Got body', body);
        ledsToRegistered();
        LAST_SEEN_RFID = rfid;

        playSuccess();
        setTimeout(resetLeds, 1000);
    });
};
