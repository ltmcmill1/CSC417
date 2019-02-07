#!/bin/bash
sudo apt-get update
if which gnu-smalltalk
    then echo "# gnu-smalltalk installed"
    else sudo apt-get install gnu-smalltalk
    fi
echo
echo !!!!!!!!!!!!! 1b1. Number collector !!!!!!!!!!!!!
gst my.st num.st 1b1Test.st
echo
echo !!!!!!!!!!!!! 1b2. Iterators !!!!!!!!!!!!!
gst my.st eject.st 1b2Test.st
echo
echo !!!!!!!!!!!!! 1b3. Iterators !!!!!!!!!!!!!
gst my.st 1b3Test.st
echo
echo !!!!!!!!!!!!! 1b4. Polymorphism !!!!!!!!!!!!!
gst my.st 1b4Test.st