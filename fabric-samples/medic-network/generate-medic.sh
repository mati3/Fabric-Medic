#!/bin/bash

# channel name: channelall

../bin/cryptogen generate --config=./crypto-config.yaml
if [ "$?" -ne 0 ]; then
  echo "Failed to generate crypto crypto-config.yaml"
  exit 1
fi

export FABRIC_CFG_PATH=$PWD

../bin/configtxgen -profile ThreeOrgsOrdererGenesis -outputBlock ./channel-artifacts/genesis.block
if [ "$?" -ne 0 ]; then
  echo "Failed to generate orderer genesis.block"
  exit 1
fi

../bin/configtxgen -profile ChannelAll -outputCreateChannelTx ./channel-artifacts/channelall.tx -channelID channelall
if [ "$?" -ne 0 ]; then
  echo "Failed to generate channel configuration channelID channelall"
  exit 1
fi

CURRENT_DIR=$PWD"/deployment"
cd crypto-config/peerOrganizations/atc.etsiit.ugr/ca/
PRIV_KEY=$(ls *_sk)
cd $CURRENT_DIR
sed -i "s/CA_PRIVATE_KEY/${PRIV_KEY}/g" docker-compose-node1.yml
