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
    selectedGate: Component<gateProperties> | null,
    componentProperties: componentProperties | null,
    gates: {[key: string]: gate},
}

export interface gateProperties {
    position: number[],
    scale: number,
    fontsize: number,
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
    gate: Component<gateProperties>,
    position: number[],
}