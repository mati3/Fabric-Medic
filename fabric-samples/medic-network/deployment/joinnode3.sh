#!/bin/bash

docker cp channelall.block peer0.lsi.etsiit.ugr:/channelall.block
docker exec -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@lsi.etsiit.ugr/msp" peer0.lsi.etsiit.ugr peer channel join -b channelall.block


