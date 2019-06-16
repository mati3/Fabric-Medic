#!/bin/bash

docker exec -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@atc.etsiit.ugr/msp" peer0.atc.etsiit.ugr peer channel create -o orderer.etsiit.ugr:7050 -c channelall -f /var/hyperledger/configs/channelall.tx

docker exec -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@atc.etsiit.ugr/msp" peer0.atc.etsiit.ugr peer channel join -b channelall.block

docker cp peer0.atc.etsiit.ugr:channelall.block .

scp channelall.block nodo@192.168.56.222:/home/nodo/Fabric-Medic/fabric-samples/medic-network/deployment/channelall.block

scp channelall.block nodo@192.168.56.223:/home/nodo/Fabric-Medic/fabric-samples/medic-network/deployment/channelall.block

scp channelall.block nodo@192.168.56.224:/home/nodo/Fabric-Medic/fabric-samples/medic-network/deployment/channelall.block


