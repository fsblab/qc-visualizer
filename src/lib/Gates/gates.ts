import type { gateMetadata } from "../interfaces";
import Hgate from "./Hgate.svelte";


export const gates: {[key: string]: gateMetadata | null} = {
    "None": null,
    "H": {
        gate: Hgate,
        name: "Hadamard",
        symbol: "H",
        size: 1,
        matrix: {
            scalar: "1/sqrt(2)",
            matrix: [[1, 1], [1, -1]],
        },
    },
    "I": {
        gate: null,
        name: "Identity",
        symbol: "I",
        size: 1,
        matrix: {
            scalar: "",
            matrix: [[1, 0], [0, 1]],
        },
    },
    "Ph": {
        gate: null,
        name: "Global Phase",
        symbol: "Ph",
        size: 1,
        matrix: {
            scalar: "e^{i delta}",
            matrix: [[1, 0], [0, 1]],
        },
    },
    "X": {
        gate: null,
        name: "NOT, Pauli X",
        symbol: "X",
        size: 1,
        matrix: {
            scalar: "",
            matrix: [[0, 1], [1, 0]],
        },
    },
    "Y": {
        gate: null,
        name: "Pauli Y",
        symbol: "Y",
        size: 1,
        matrix: {
            scalar: "",
            matrix: [[0, "-i"], ["i", 0]],
        },
    },
    "Z": {
        gate: null,
        name: "Pauli Z",
        symbol: "Z",
        size: 1,
        matrix: {
            scalar: "",
            matrix: [[1, 0], [0, -1]],
        },
    },
    "S": {
        gate: null,
        name: "&radic; Z",
        symbol: "S",
        size: 1,
        matrix: {
            scalar: "",
            matrix: [[1, 0], [0, "i"]],
        },
    },
};
