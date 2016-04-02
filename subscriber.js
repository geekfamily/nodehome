const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://192.168.1.157')

let lockState = ''
let connected = false

client.on('connect', () => {
  client.subscribe('/home/lock/door/connected')
  client.subscribe('/home/lock/door/state')
})

client.on('message', (topic, message) => {
  switch (topic) {
    case '/home/lock/door/connected':
      return handleLockConnected(message);
    case '/home/lock/door/state':
      return handleLockState(message);

  }
})

function handleLockConnected (message) {
  console.log('lock connected status %s', message)
  connected = (message.toString() === 'true')
}

function handleLockState (message) {
  lockState = message
  console.log('lock state update to %s', message)
}