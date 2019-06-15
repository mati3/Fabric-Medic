/*
 * The sample smart contract for documentation topic:
 * Autor: Matilde Cabrera González
 */

package main

/* Imports
 * 4 utility libraries for formatting, handling bytes, reading and writing JSON, and string manipulation
 * 2 specific Hyperledger Fabric specific libraries for Smart Contracts
 */
import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

// Define the medic structure, with 4 properties.  Structure tags are used by encoding/json library
type Medic struct {
	Nombre   string `json:"Nombre"`
	PrincipioActivo  string `json:"PrincipioActivo"`
	Formato string `json:"Formato"`
	Propietario  string `json:"Propietario"`
}

/*
 * The Init method is called when the Smart Contract "fabmedic" is instantiated by the blockchain network
 * Best practice is to have any Ledger initialization in separate function -- see initLedger()
 */
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method is called as a result of an application request to run the Smart Contract "fabmedic"
 * The calling application program has also specified the particular smart contract function to be called, with arguments
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "queryMedic" {
		return s.queryMedic(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "createMedic" {
		return s.createMedic(APIstub, args)
	} else if function == "queryAllMedics" {
		return s.queryAllMedics(APIstub)
	} else if function == "changeMedicPropietario" {
		return s.changeMedicPropietario(APIstub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract) queryMedic(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	medicAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(medicAsBytes)
}

func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	medics := []Medic{
		Medic{Nombre: "Simvastatina", PrincipioActivo: "Para controlar el colesterol", Formato: "pastillas", Propietario: "Tomoko"},
		Medic{Nombre: "Aspirina", PrincipioActivo: "Para la fiebre", Formato: "sobres", Propietario: "Brad"},
		Medic{Nombre: "Omeprazol", PrincipioActivo: "Para la acidez de estómago", Formato: "jarabe", Propietario: "Jin Soo"},
		Medic{Nombre: "Ramipril", PrincipioActivo: "Para la hipertensión", Formato: "gotas", Propietario: "Max"},
		Medic{Nombre: "Co.codamol", PrincipioActivo: "Para aliviar el dolor", Formato: "pomada", Propietario: "Adriana"},
		Medic{Nombre: "Warfarina Sódica", PrincipioActivo: "Anticuagulante", Formato: "inyectables", Propietario: "Michel"},
		Medic{Nombre: "Amosxicilina", PrincipioActivo: "Antibiótico", Formato: "supositorios", Propietario: "Aarav"},
		Medic{Nombre: "Amitriptilina", PrincipioActivo: "Contra la depresión", Formato: "parches", Propietario: "Pari"},
		Medic{Nombre: "Colecalciferol", PrincipioActivo: "Una vitamina D", Formato: "efervescentes", Propietario: "Valeria"},
	}

	i := 0
	for i < len(medics) {
		fmt.Println("i is ", i)
		medicAsBytes, _ := json.Marshal(medics[i])
		APIstub.PutState("MEDIC"+strconv.Itoa(i), medicAsBytes)
		fmt.Println("Added", medics[i])
		i = i + 1
	}

	return shim.Success(nil)
}

func (s *SmartContract) createMedic(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	var medic = Medic{Nombre: args[1], PrincipioActivo: args[2], Formato: args[3], Propietario: args[4]}

	medicAsBytes, _ := json.Marshal(medic)
	APIstub.PutState(args[0], medicAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) queryAllMedics(APIstub shim.ChaincodeStubInterface) sc.Response {

	startKey := "MEDIC0"
	endKey := "MEDIC999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllMedics:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

func (s *SmartContract) changeMedicPropietario(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	medicAsBytes, _ := APIstub.GetState(args[0])
	medic := Medic{}

	json.Unmarshal(medicAsBytes, &medic)
	medic.Propietario = args[1]

	medicAsBytes, _ = json.Marshal(medic)
	APIstub.PutState(args[0], medicAsBytes)

	return shim.Success(nil)
}

// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
