'use strict';
var fabricClient = require('./medic-network/FabricClient.js');

class RedFabric {

  constructor(userName) {
    this.currentUser;
    this.issuer;
    this.userName = userName;
    this.connection = fabricClient;
  }

  init() {
    var isAdmin = false;
    if (this.userName == "admin") {
      isAdmin = true;
    }
    return this.connection.initCredentialStores().then(() => {
      return this.connection.getUserContext(this.userName, true)
    }).then((user) => {
      this.issuer = user;
      if (isAdmin) {
        return user;
      }
      return this.ping();
    }).then((user) => {
      this.currentUser = user;
      return user;
    })
  }

  queryAllMedics() {
    var tx_id = this.connection.newTransactionID();
    var requestData = {
      chaincodeId: 'medcc',
      fcn: 'queryAllMedics',
      args: [],
      txId: tx_id
    };
    return this.connection.query(requestData);
  }

  queryMedic(id) {
    var tx_id = this.connection.newTransactionID();
    var requestData = {
      chaincodeId: 'medcc',
      fcn: 'queryMedic',
      args: [id],
      txId: tx_id
    };
    return this.connection.query(requestData);
  }

  deleteMedic(id) {
    var tx_id = this.connection.newTransactionID();
    var requestData = {
      chaincodeId: 'medcc',
      fcn: 'deleteMedic',
      args: [id],
      txId: tx_id
    };
    return this.connection.submitTransaction(requestData,tx_id);
  }

  add_medic(medic) {
    var tx_id = this.connection.newTransactionID();
    var requestData = {
      chaincodeId: 'medcc',
      fcn: 'createMedic',
      args: [medic.id,medic.nombre,medic.principioActivo,medic.formato,medic.propietario],
      txId: tx_id
    };
    return this.connection.submitTransaction(requestData,tx_id);
  }
}

module.exports = RedFabric;
