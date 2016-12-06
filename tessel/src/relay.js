import tessel from 'tessel';
import relaylib from 'relay-mono';
import log from './logger';

const relay = relaylib.use(tessel.port['B']);

export const triggerFlash = () => {
    log('Trigger flash on relay module.');

    relay.turnOn(1, (err) => {
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
});

relay.on('error', (err) => {
    log('Relay error', err)
});

relay.on('latch', (channel, value) => {
    log('Switched relay channel', channel, 'to', value);
});
