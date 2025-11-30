import { math, range } from "./math";
import { Matrix, type Complex } from "mathjs";
import type { circuit, componentProperties } from "../interfaces";
import { gates } from "../Gates/gates";


const zeroStateProjector = [[1, 0], [0, 0]];   // |0><0|
const oneStateProjector = [[0, 0], [0, 1]];    // |1><1|
const id2 = math.identity(2) as Matrix;
const CNOTGate = gates["A"]!.matrix.cmatrix as any as Matrix;

export function calculateComponent(component: circuit, componentProps: componentProperties) {
    const sizeOfStateVector: number = math.pow(2, componentProps.numberOfQubits) as number;
    const stateVector: Matrix<Complex> = math.zeros(sizeOfStateVector) as Matrix<Complex>;

    // init statevector i.e. [1+0i |00>, 0+0i |01>, 0+0i |10>, 0+0i |11>]
    for (const index of range(1, sizeOfStateVector - 1)) {
        stateVector.set([index], math.complex(0, 0));
    }

    stateVector.set([0], math.complex(1, 0));
    
    const sortedKeys = Object.keys(component.gates).sort();
    
    const sortedGates: Array<any> = sortedKeys.reduce((acc: any, key: any) => {
        acc[key] = component.gates[key];
    	return acc;
    }, {});
    
    for (const key in sortedGates) {
        var stateVectorCopy: Matrix<Complex> = stateVector.clone();
        const gateData = component.gates[key].gateData;
        const qubits: number[] = gateData.qubit!;
        const cqubit: number | undefined = gateData.controlQubit;
        const scalar = gateData.matrix.scalar(gateData.matrix.parameter);
        const matrix = gateData.matrix.matrix as any as Matrix;
        const cmatrix = gateData.matrix.cmatrix as any as Matrix;
        const totalTargetQubits = qubits.length;
        var gateMatrix = new Matrix;

        if (gateData.name == "Swap") {
            gateMatrix = swapGate(cqubit!, qubits[0], componentProps.numberOfQubits);
        } else if (cqubit != undefined) {
            gateMatrix = controlGate(cqubit, totalTargetQubits, qubits, componentProps.numberOfQubits, cmatrix);
        } else {
            gateMatrix = simpleGate(totalTargetQubits, qubits, componentProps.numberOfQubits, matrix);
        }

        const calculationResults: Matrix<Complex> = math.multiply(gateMatrix, scalar, stateVectorCopy);
        component.gates[key].gateData.calculationResults = calculationResults as any;

        for (const index of range(0, sizeOfStateVector - 1)) {
            stateVector.set([index], calculationResults.get([index]));
        }
    }
}


// https://quantumcomputing.stackexchange.com/questions/4252/how-to-derive-the-cnot-matrix-for-a-3-qubit-system-where-the-control-target-qu
function controlGate(cqubit: number, totalTargetQubits: number, qubits: number[], nOfQubits: number, matrix: Matrix): Matrix {
    var zeroStateMatrix = qubits.includes(0) ? id2 : cqubit == 0 ? zeroStateProjector : id2 as Matrix;
    var oneStateMatrix = qubits.includes(0) ? matrix : cqubit == 0 ? oneStateProjector : math.identity(2) as Matrix;

    const startingIndex = qubits.includes(0) ? totalTargetQubits : 1;

    for (var index = startingIndex; index < nOfQubits; index += 1) {
        if (index === cqubit) {
            zeroStateMatrix = math.kron(zeroStateMatrix, zeroStateProjector);
        } else {
            zeroStateMatrix = math.kron(zeroStateMatrix, id2);
        }
    }

    for (var index = startingIndex; index < nOfQubits;) {
        if (index === cqubit) {
            oneStateMatrix = math.kron(oneStateMatrix, oneStateProjector);
            index += 1;
        } else if (index === qubits[0]) {
            oneStateMatrix = math.kron(oneStateMatrix, matrix);
            index += totalTargetQubits;
        } else {
            oneStateMatrix = math.kron(oneStateMatrix, id2);
            index += 1;
        }
    }

    return math.add(zeroStateMatrix, oneStateMatrix) as Matrix;
}


// https://quantumcomputing.stackexchange.com/questions/24035/how-to-generate-matrix-for-swapa-b-gate-for-n-qubits
function swapGate(cqubit: number, qubit: number, nOfQubits: number): Matrix {
    const cqubitToQubitCNOT = controlGate(cqubit, 1, [qubit], nOfQubits, CNOTGate);
    const qubitToCqubitCNOT = controlGate(qubit, 1, [cqubit], nOfQubits, CNOTGate);

    return math.multiply(cqubitToQubitCNOT, qubitToCqubitCNOT, cqubitToQubitCNOT) as Matrix;
}


// https://quantumcomputing.stackexchange.com/questions/14066/how-do-i-apply-the-hadamard-gate-to-one-qubit-in-a-two-qubit-pure-state
function simpleGate(totalTargetQubits: number, qubits: number[], nOfQubits: number, matrix: Matrix): Matrix {
    var gateMatrix = qubits.includes(0) ? matrix : math.identity(2) as Matrix;

    for (var index = qubits.includes(0) ? totalTargetQubits : 1; index < nOfQubits;) {
        if (index === qubits[0]) {
            gateMatrix = math.kron(gateMatrix, matrix);
            index += totalTargetQubits;
        } else {
            gateMatrix = math.kron(gateMatrix, id2);
            index += 1;
        }
    }

    return gateMatrix;
}