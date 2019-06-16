#!/bin/bash

# ubuntu-16 Prerrequisitos para Red Hyperledger Fabric.

sudo apt install curl -y

# install binary Go
echo "      #############################################################
			 Installing binary Go
      #############################################################"
wget https://dl.google.com/go/go1.12.1.linux-amd64.tar.gz
tar -xvzf go1.12.1.linux-amd64.tar.gz
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin

# nvm
echo "      #############################################################
			 Installing nvm
      #############################################################"
#sudo apt install build-essential libssl-dev -y
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
export NVM_DIR="${HOME}/.nvm"
[ -s "${NVM_DIR}/nvm.sh" ] && . "${NVM_DIR}/nvm.sh"
[ -s "${NVM_DIR}/bash_completion" ] && . "${NVM_DIR}/bash_completion"
nvm install 8.9
nvm use 8.9.4
npm install npm@5.6.0 -g  		


# install docker and docker-compose
echo "      #############################################################
			 Installing docker
      #############################################################"
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates gnupg-agent software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu xenial stable" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io -y
sudo usermod -aG docker $USER
#exec sudo su -l $USER

echo "      #############################################################
			 Installing docker-compose
      #############################################################"
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# pyton
echo "      #############################################################
			 Installing pyton
      #############################################################"
sudo apt-get install python

# look versions intalled
echo ''
echo 'Instalacion completada, versiones:'
echo ''
echo -n 'Node:           '
node --version
echo -n 'npm:            '
npm --version
echo -n 'Docker:         '
docker --version
echo -n 'Docker Compose: '
docker-compose --version
echo -n 'Python:         '
python -V
