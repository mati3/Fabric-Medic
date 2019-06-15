#!/bin/bash

docker exec -it cli peer chaincode install -n medcc -p github.com/chaincode/medic -v 1.0

docker exec -it cli peer chaincode instantiate -o orderer.etsiit.ugr:7050 -C channelall -n medcc github.com/chaincode/medic -v 1.0 -c '{"Args": []}' -P "OR('atcMSP.member', 'decsaiMSP.member','lsiMSP.member','tstcMSP.member')"

docker exec -e "CORE_PEER_GOSSIP_USELEADERELECTION=true" -it cli peer chaincode invoke -o orderer.etsiit.ugr:7050 -C channelall -n medcc -c '{"function":"initLedger","Args":[]}'

docker exec -e "CORE_PEER_GOSSIP_USELEADERELECTION=true" -it cli peer chaincode invoke -o orderer.etsiit.ugr:7050 -C channelall -n medcc -c '{"function":"queryAllMedics","Args":[]}'
