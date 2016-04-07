const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://192.168.1.157')
const cylon = require("cylon")
const piblaster = require('pi-blaster.js')

let state = 'locked'

client.on('connect', () => {
  client.subscribe('/home/lock/door/lock')
  client.subscribe('/home/lock/door/unlock')
  client.publish('/home/lock/connected', 'true')
  sendStateUpdate();
})

client.on('message', (topic, message) => {
  switch (topic) {
    case '/home/lock/door/lock':
      return handleLockState(true);
    case '/home/lock/door/unlock':
      return handleLockState(false);
  }
})

function handleLockState (locked) {
  if (locked){
    state = 'locked';
    robot.servo.angle(70);
  } else {
    state = 'unlocked';
    robot.servo.angle(20);
  }	
  sendStateUpdate();
  console.log('locked =  %s', locked);
}

function sendStateUpdate () {  
  console.log('sending state %s', state)
  client.publish('/home/lock/door/state', state)
}

var robot = cylon.robot({
  name: "lockbot",
  connections: {
    raspi: { adaptor: 'raspi' }
  },
  devices: {
    // digital sensors
    servo: {
    	driver: "servo",
    	pin: 7,
    	limits: { bottom: 20, top: 160 }
    }
  }
}).start();
