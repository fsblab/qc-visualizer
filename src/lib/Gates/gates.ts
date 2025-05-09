import { math } from "../util/math"
import type { Complex } from "mathjs";
import type { gateMetadata } from "../interfaces";


export const gates: {[key: string]: gateMetadata | null} = {
    "None": null,
    "I": {
        gate: async () => (await import("./BaseGate.svelte")).default,
        name: "Identity",
        symbol: "I",
        shortKey: "I",
        size: 1,
        isControlGate: false,
        matrix: {
            scalarString: "",
            scalar: (delta: Complex) => 1,
            matrix: [[1, 0], [0, 1]],
        },
    },
    "H": {
        gate: async () => (await import("./BaseGate.svelte")).default,
        name: "Hadamard",
        symbol: "H",
        shortKey: "H",
        size: 1,
        isControlGate: false,
        matrix: {
            scalarString: "1/sqrt(2)",
            scalar: (delta: Complex) => 1 / (math.sqrt(2) as number),
            matrix: [[1, 1], [1, -1]],
        },
    },
    "P": {
        gate: async () => (await import("./GlobalPhaseGate.svelte")).default,
        name: "Global Phase",
        symbol: "Ph",
        shortKey: "P",
        size: 1,
        isControlGate: false,
        matrix: {
            parameter: 0,
            scalarString: "e^{i\u03B4}",
            scalar: (delta: Complex) => math.exp(math.multiply(math.complex("i"), delta) as Complex),
            matrix: [[1, 0], [0, 1]],
        },
    },
    "X": {
        gate: async () => (await import("./BaseGate.svelte")).default,
        name: "Pauli X (NOT)",
        symbol: "X",
        shortKey: "X",
        size: 1,
        isControlGate: false,
        matrix: {
            scalarString: "",
            scalar: (delta: Complex) => 1,
            matrix: [[0, 1], [1, 0]],
        },
    },
    "Y": {
        gate: async () => (await import("./BaseGate.svelte")).default,
        name: "Pauli Y",
        symbol: "Y",
        shortKey: "Y",
        size: 1,
        isControlGate: false,
        matrix: {
            scalarString: "",
            scalar: (delta: Complex) => 1,
            matrix: [[0, math.complex("-i")], [math.complex("i"), 0]],
        },
    },
    "Z": {
        gate: async () => (await import("./BaseGate.svelte")).default,
        name: "Pauli Z",
        symbol: "Z",
        shortKey: "Z",
        size: 1,
        isControlGate: false,
        matrix: {
            scalarString: "",
            scalar: (delta: Complex) => 1,
            matrix: [[1, 0], [0, -1]],
        },
    },
    "S": {
        gate: async () => (await import("./BaseGate.svelte")).default,
        name: "&radic; Z",
        symbol: "S",
        shortKey: "S",
        size: 1,
        isControlGate: false,
        matrix: {
            scalarString: "",
            scalar: (delta: Complex) => 1,
            matrix: [[1, 0], [0, math.complex("i")]],
        },
    },
};
