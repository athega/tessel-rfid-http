import request from 'request';

import { endpoint, endpointMethod, apiKey } from './config';
import log, { error } from './logger';
import { ledsToRegistered, ledsToRegisterError } from './leds';

export default (subject, rfid) => {
    const url = `${endpoint}?subj=${encodeURIComponent(subject)}&rfid=${encodeURIComponent(rfid)}`;

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
            return;
        }

        log('Got response with headers', response.headers);
        if (response.statusCode < 200 && response.statusCode > 299) {
            error(`An error occurred when registering event at ${url}. Got status ${response.statusCode} ${response.statusMessage}.`);
            ledsToRegisterError();
            return;
        }

        log('Got body', body);
        ledsToRegistered();
    });
};
