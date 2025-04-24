import type { tab } from "../interfaces";

export const circuitsState = $state({
    circuits: [
        {label: "Circuit 0", value: 0, componentCounter: 0, componentActiveTab: 0, components: [{label: "Component 0", value: 0}]},
    ] as tab[],
    circuitCounter: 0,

    getCircuitIndex(tabValue: number): number {
        return this.circuits.findIndex((item) => {return item.value === tabValue});
    },

    getNumberOfCircuits(): number {
        return this.circuits.length;
    },

    getNumberOfComponents(val: number) {
        return this.circuits[this.getCircuitIndex(val)].components?.length;
    },

    addCircuit(): tab {
        const length = this.circuits.push({label: "Circuit " + String(++this.circuitCounter), value: this.circuitCounter, componentCounter: 0, componentActiveTab: 0, components: [{label: "Component 0", value: 0}]});
        return this.circuits[length - 1];
    },

    removeCircuit(val: number): tab | null {
        if (this.getNumberOfCircuits() === 1) {
            return null
        }

        const index = this.getCircuitIndex(val);

        if (index > -1) {
            return this.circuits.splice(index, 1)[0];
        } else {
            return null;
        }
    },

    addComponent(val: number): tab {
        const index = this.getCircuitIndex(val);
        const length = (this.circuits[index].components! as tab[]).push({label: "Component " + String(++this.circuits[index].componentCounter!), value: this.circuits[index].componentCounter!});
        return this.circuits[index].components![length - 1];
    },

    removeComponent(val: number, compVal: number): tab | null {
        if (this.getNumberOfComponents(val) === 1) {
            return null
        }

        const index = this.getCircuitIndex(val);
        const compIndex = this.circuits[index].components!.findIndex((item) => {return item.value === compVal});
        
        if (index > -1 && compIndex > -1) {
            return this.circuits[index].components!.splice(compIndex, 1)[0];
        } else {
            return null
        }
    },
})