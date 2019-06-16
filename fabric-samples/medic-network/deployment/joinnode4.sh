#!/bin/bash

docker cp channelall.block peer0.tstc.etsiit.ugr:/channelall.block
docker exec -e "CORE_PEER_MSPCONFIGPATH=/var/hyperledger/users/Admin@tstc.etsiit.ugr/msp" peer0.tstc.etsiit.ugr peer channel join -b channelall.block


