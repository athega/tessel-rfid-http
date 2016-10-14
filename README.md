### Installation

`npm install tessel-rfid-http`

### Optional preparation

If you do not have the Tessel CLI:

`npm install t2-cli -g`

If you need it to be connected to wifi, run the following command.

`t2 wifi -n SSID -p PASSWORD`

If you are working with multiple tessels it might be a good idea to give it a descriptive name.

`t2 rename photobooth`

### Run the RFID scanner

`npm start`

### Push the program to the connected Tessel

`npm push`
