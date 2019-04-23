#!/bin/bash
pwd=$(pwd)

sudo apt-get install julia

#sudo apt-get install wget tar
#wget -O julia.tar.gz https://julialang-s3.julialang.org/bin/linux/x64/1.1/julia-1.1.0-linux-x86_64.tar.gz
#tar -xzf julia.tar.gz
#sudo ln -s $PWD/julia-1.1.0/bin/julia /usr/bin/julia

sudo apt-get install -y lua5.3 luajit
sudo apt-get install -y python3 python3-pip python3-setuptools

alias lua='/usr/bin/lua5.3'
alias python='/usr/bin/python3'
alias pip='/usr/bin/pip3'

cd ..
mkdir installs && cd installs 
git clone git://github.com/pycco-docs/pycco.git
cd pycco
sudo apt-get install -y python3-setuptools
sudo python3 setup.py install
cd $pwd

git clone https://github.com/d-u-o/101 ./duo
rm -rf ./duo/src/dom
mkdir ./duo/src/dom
cp -R ./src/* ./duo/src/dom
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