import tessel from 'tessel';
import relaylib from 'relay-mono';
import log, { error } from './logger';

const relay = relaylib.use(tessel.port.B);

let READY = false;

export const triggerFlash = () => {
    if (!READY) {
        log('Not triggering flash on relay module. Device not ready.');
        return;
    }

    log('Trigger flash on relay module.');

    relay.turnOn(1, () => {
        log('Relay on');

        setTimeout(() => {
            relay.turnOff(1, () => {
                log('Relay off');
            });
        }, 1000);
    });
};

relay.on('ready', () => {
    log('Relay is ready');
    READY = true;
});

relay.on('error', (err) => {
    error('Relay error', err);
});

relay.on('latch', (channel, value) => {
    log('Switched relay channel', channel, 'to', value);
});
