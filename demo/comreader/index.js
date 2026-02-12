process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const COM_PORT = 'COM3';
const API_URL = 'https://localhost:3000/v1/sensors/temperature';
const AUTH_TOKEN = 'Bearer admin';
const SENSOR_ID = 10;
const INTERVAL = 5000;

let lastSentTime = 0;

const port = new SerialPort({
  path: COM_PORT,
  baudRate: 9600, 
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
parser.on('data', async (data) => {
  const now = Date.now();
  if (now - lastSentTime >= INTERVAL) {
    const temp = parseFloat(data)
    if (isNaN(temp)) return;
    console.log(`Sending: ${temp}`);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AUTH_TOKEN
        },
        body: JSON.stringify({
          sensorid: SENSOR_ID,
          temperature: temp
        })
      });

      if (response.ok) {
        lastSentTime = Date.now();
      } else {
        console.error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
});

port.on('error', (err) => {
  console.error('Serial Port Error: ', err.message);
});