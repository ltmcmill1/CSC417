#!/bin/bash
sudo apt-get update
if which prolog
    then echo "# swi-prolog installed"
    else sudo apt-get install swi-prolog
    fi
chmod +x ./onea
./onea