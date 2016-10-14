import tessel from 'tessel';
import rfidlib from 'rfid-pn532';

const rfid = rfidlib.use(tessel.port.A);

rfid.on('ready', (version) => {
    console.log('Ready to read RFID card', version);

    rfid.on('data', (card) => {
        console.log('UID:', card.uid.toString('hex'));
    });
});

rfid.on('error', (err) => {
    console.error(err);
});
