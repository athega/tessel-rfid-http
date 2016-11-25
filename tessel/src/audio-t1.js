import tessel from 'tessel';
import audioModule from 'audio-vs1053b';
import log, { error } from './logger';

const audio = audioModule.use(tessel.port.B);

let READY = false;

audio.on('ready', () => {
    log('Audio module connected');

    // Set the volume in decibels. Around 0.8 is good; 80% max volume or -25db
    audio.setVolume(0.8, (err) => {
        if (err) {
            error('Failed to set volume', err);
            return;
        }

        log('Audio initialized');
        READY = true;
    });
});

audio.on('error', (err) => error('Audio module error: ', err));

export default (sound) => {
    if (!READY) {
        log(`Not playing ${sound} - audio module not ready.`);
        return;
    }

    audio.play(sound, (err) => {
        if (err) {
            error('Could not play sound', err);
        }
    });
};
