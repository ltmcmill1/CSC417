#!/bin/bash

sudo apt-get install -y curl python-software-properties
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo npm install -g typescript
npm install

sudo apt-get install -y lua5.3 luajit
sudo apt-get install -y python3 python3-pip python3-setuptools

alias lua='/usr/bin/lua5.3'
alias python='/usr/bin/python3'
alias pip='/usr/bin/pip3'

pwd=$(pwd)
cd ..
mkdir installs && cd installs 
git clone git://github.com/pycco-docs/pycco.git
cd pycco
sudo apt-get install -y python3-setuptools
sudo python3 setup.py install
cd $pwd

git clone https://github.com/d-u-o/101 ./duo
cp -R dist ./duo/src/typescript_monte_carlo
cp -R node_modules ./duo/src/typescript_monte_carlo/node_modules
cp Makefile ./duo/src/Makefile
touch installed.true
cd duo
cd etc

echo "###########################################"
echo
echo The updated monte_carlo and Makefile has
echo been installed. Run:
echo 
echo "make <target>"
echo
echo to run the the updated pipeline with the
echo specified target.
echo
echo "###########################################"

./ide