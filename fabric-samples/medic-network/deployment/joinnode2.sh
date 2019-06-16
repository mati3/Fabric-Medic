#!/bin/bash

docker cp channelall.block peer0.decsai.etsiit.ugr:/channelall.block
docker exec -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@decsai.etsiit.ugr/msp" peer0.decsai.etsiit.ugr peer channel join -b channelall.block

