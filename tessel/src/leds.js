import tessel from 'tessel';

const LEDS = tessel.led;

const ERR = LEDS[0];  // red
const WLAN = LEDS[1]; // amber
const LED0 = LEDS[2]; // green
const LED1 = LEDS[3]; // blue

export const resetLeds = () => {
    ERR.off();
    WLAN.off();
    LED0.off();
    LED1.off();
};

// General
export const ledsToReady = () => {
    resetLeds();
    LED0.on();
};

export const ledsToError = () => {
    resetLeds();
    ERR.on();
};

// RFID
export const ledsToRfidReady = () => {
    resetLeds();
    LED0.on();
    WLAN.on();
};

// Register
export const ledsToRegistered = () => {
    resetLeds();
    LED0.on();
    LED1.on();
    WLAN.on();
};

export const ledsToRegisterError = () => {
    resetLeds();
    ERR.on();
    LED1.on();
};
