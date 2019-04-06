#!/bin/bash

if [ ! -e install.true ]; then
    sudo bash install.sh
else
    echo "Install already complete, starting ide..."
    ./duo/etc/ide
fi