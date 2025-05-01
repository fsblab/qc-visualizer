import { math } from "../util/math"
import type { Complex } from "mathjs";
import type { gateMetadata } from "../interfaces";
import Hgate from "./Hgate.svelte";


export const gates: {[key: string]: gateMetadata | null} = {
    "None": null,
    "I": {
        gate: null,
        name: "Identity",
        symbol: "I",
        shortKey: "I",
        size: 1,
        matrix: {
            scalarString: "",
            scalar: (delta: Complex) => 1,
            matrix: [[1, 0], [0, 1]],
        },
    },
    "H": {
        gate: Hgate,
        name: "Hadamard",
        symbol: "H",
        shortKey: "H",
        size: 1,
        matrix: {
            scalarString: "1/sqrt(2)",
            scalar: (delta: Complex) =>  1 / (math.sqrt(2) as number),
            matrix: [[1, 1], [1, -1]],
        },
    },
    "P": {
        gate: null,
        name: "Global Phase",
        symbol: "Ph",
        shortKey: "P",
        size: 1,
        matrix: {
            scalarString: "e^{i\u03B4}",
            scalar: (delta: Complex) => math.exp(math.multiply(math.complex("i"), delta) as Complex),
            matrix: [[1, 0], [0, 1]],
        },
    },
    "X": {
        gate: null,
        name: "NOT, Pauli X",
        symbol: "X",
        shortKey: "X",
        size: 1,
        matrix: {
            scalarString: "",
            scalar: (delta: Complex) => 1,
            matrix: [[0, 1], [1, 0]],
        },
    },
    "Y": {
        gate: null,
        name: "Pauli Y",
        symbol: "Y",
        shortKey: "Y",
        size: 1,
        matrix: {
            scalarString: "",
            scalar: (delta: Complex) => 1,
            matrix: [[0, math.complex("-i")], [math.complex("i"), 0]],
        },
    },
    "Z": {
        gate: null,
        name: "Pauli Z",
        symbol: "Z",
        shortKey: "Z",
        size: 1,
        matrix: {
            scalarString: "",
            scalar: (delta: Complex) => 1,
            matrix: [[1, 0], [0, -1]],
        },
    },
    "S": {
        gate: null,
        name: "&radic; Z",
        symbol: "S",
        shortKey: "S",
        size: 1,
        matrix: {
            scalarString: "",
            scalar: (delta: Complex) => 1,
            matrix: [[1, 0], [0, math.complex("i")]],
        },
    },
};
