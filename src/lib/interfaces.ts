import type { Complex, Matrix } from "mathjs";
import type { Component, Snippet } from "svelte";

export interface componentProperties {
    numberOfQubits: number,
    currentTranslation: number[],
    scale: number,
    component?: circuit,
}

export interface tab {
    label: string,
    value: number,
    class?: string,
    componentCounter?: number,
    componentActiveTab?: number,
    components?: circuit[],
}

export interface circuit {
    label: string,
    value: number,
    selectedGate: gateMetadata | null,
    componentProperties: componentProperties | null,
    gates: {[key: number]: gate},
}

export interface gateProperties {
    position: number[],
    scale: number,
    fontsize: number,
    size: number,
    symbol: string,
}

export interface tabProperties {
    children?: Snippet,
    addButtonPressed?: any,
    removeButtonPressed?: any,
    items: tab[],
    activeTab?: number,
    useAddButton?: boolean,
    useRemoveButton?: boolean,
    customClass?: string,
}

export interface gate {
    gateData: gateMetadata,
    position: number[],
}

export interface gateMetadata {
    gate: Component<gateProperties> | any | null,
    name: string,
    symbol: string,
    shortKey: string,
    size: number,
    isControlGate: boolean,
    controlQubit?: number,
    qubit?: number[],
    matrix: {
        scalarString: string,
        scalar: Function,
        matrix: Array<Array<any>>
    },
    calculationResults?: calculationResults[],
}

export interface calculationResults {
    up: Complex,
    down: Complex,
}