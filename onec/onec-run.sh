#!/bin/bash
sudo apt-get update
if which clisp
    then echo "# clisp installed"
    else sudo apt-get install clisp
    fi
echo ""
echo "Program output: "
echo "-------------------------------------"
clisp prolog1c.lisp
