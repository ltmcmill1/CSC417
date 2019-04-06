#!/bin/bash

if [ ! -e install.true ]; then
    sudo bash install.sh
else
    echo "Install already complete, starting ide..."
    echo "Use: make <target>"
    echo "to run the application"
    ./duo/etc/ide
fi