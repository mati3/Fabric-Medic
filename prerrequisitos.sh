#!/bin/bash

# ubu-16 Prerrequisitos

sudo apt install curl

# install docker and docker-compose
sudo apt install docker.io
sudo usermod -aG docker $USER
exec sudo su -l $USER
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# install binary Go
wget https://dl.google.com/go/go1.12.1.linux-amd64.tar.gz
tar -xvzf go1.12.1.linux-amd64.tar.gz
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin

# nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
reboot
nvm install 8.9
nvm use 8.9.4
npm install npm@5.6.0 -g  		

# pyton
sudo apt-get install python

# clonar ejemplos de fabric
git clone https://github.com/hyperledger/fabric-samples.git

# binarios
curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.1 1.4.1 0.4.15
