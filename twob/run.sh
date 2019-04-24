#!/bin/bash

if [ ! -e installed.true ]; then
    echo "Not yet installed, installing now..."
    sudo bash install.sh
else
    echo "Install already complete, starting ide..."
    echo "Use: make <target>"
    echo "to run the application"
    cd duo
    cd etc
    sudo ./ide
fi