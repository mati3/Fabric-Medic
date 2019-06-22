# Fabric-Medic

Instalación de una red Blockchain Hyperledger Fabric de prueba con cuatro nodos, en el nodo 1 se instalará Node SDK de Fabric y un Framework Angular para interactuar con la red.

Empezamos con una maquina virtual ubuntu-16.04.6-desktop-amd64.iso que será nuestra maquina Orderer.

## Pasos a seguir para la instalación:

    sudo apt install git -y
    git clone https://github.com/mati3/Fabric-Medic.git
    cd Fabric-Medic
    ./prerrequisitos.sh

**En este punto hay que reiniciar el sistema**

    cd Fabric-Medic
    curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.1 1.4.1 0.4.15
    cd fabric-samples/medic-network
    ./generate-medic.sh
    
**Clonamos la maquina virtual y ponemos correspondientes IPs.**

        etsiit.ugr   192.168.56.220  orderer
        atc     192.168.56.221   node1
        decsai   192.168.56.222  node2
        lsi  192.168.56.223  node3
        tstc     192.168.56.224  node4

**En node Orderer:**

    cd deployment
    docker-compose -f docker-compose-orderer.yml up -d
    docker ps

**En node1:**

    cd deployment
    docker-compose -f docker-compose-node1.yml up -d
    docker ps

**En node2:**

    cd deployment
    docker-compose -f docker-compose-node2.yml up -d
    docker ps

**En node3:**

    cd deployment
    docker-compose -f docker-compose-node3.yml up -d
    docker ps

**En node4:**

    cd deployment
    docker-compose -f docker-compose-node4.yml up -d
    docker ps

**Creamos un canal y nos unimos a el, para ello:**

**En node1:**

    ./startnode1.sh

**En node2:**

    ./joinnode2.sh

**En node3:**

    ./joinnode3.sh

**En node4:**

    ./joinnode4.sh

**Ya tenemos la red Fabric, ahora seguimos en el nodo 1 con la Api Rest**

    ./medcc.sh

    cd Fabric-Medic/fabric-samples
    npm install
    node enrollAdmin.js
    node registerUser.js
    npm start   

**Podemos ver una lista de medicamentos en localhost:8081/api/medics**

**Seguimos con el Framework Angular en node1**
    nvm install 10.12.0
    nvm use 10.12.0
    npm install @angular/cli@7.1.0
    npm install -g @angular/cli@7.1.0
    npm install
    npm start

**Podemos visitar la aplicación en localhost:4200**