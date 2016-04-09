#!/usr/bin/env bash

if [ $# -eq 0 ];then
    echo "Error , piblaster required params"
    exit 1
fi

if [ $# -gt 1 ];then
    # multiple passed , do for each pf then 
    echo "$1" > /pi-blaster/pi-blaster
else
  echo "$1" > /pi-blaster/pi-blaster  
fi
