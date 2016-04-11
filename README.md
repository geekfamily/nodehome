# nodehome

##Setup
The following sets up a test 'Node' on a raspberry pi running docker than subscribes to the following 2 messages
```bash
/home/lock/door/lock
/home/lock/door/unlock
```

Use the following commands:

Build:
docker build 

Run:
docker run --privileged --rm $CONTAINERNAME /bin/bash -c "/pi-blaster/pi-blaster && node ./out/subscriber.js"
