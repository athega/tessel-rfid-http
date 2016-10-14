import tessel from 'tessel';
import rfidlib from 'rfid-pn532';

import { subject } from './config';
import log, { error } from './logger';
import { resetLeds, ledsToReady, ledsToRfidReady, ledsToError } from './leds';
import register from './register';

const RFID = rfidlib.use(tessel.port.A);

resetLeds();

RFID.on('ready', () => {
    log('Ready to read RFID cards');
    ledsToReady();

    RFID.on('data', (card) => {
        const rfid = card.uid.toString('hex');
        log(`Read card with UID: ${rfid}`);
        ledsToRfidReady();
        register(subject, rfid);
    });
});

RFID.on('error', (err) => {
    error('Scanner error', err);
    ledsToError();
});
