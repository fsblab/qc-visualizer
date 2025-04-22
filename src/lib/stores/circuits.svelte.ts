import type { tab } from "../interfaces";

export const circuitsState = $state({
    circuits: [
        {label: "Circuit 0", value: 0, components: [{label: "Component 0", value: 0}]},
    ] as tab[],

    addCircuit() {
        this.circuits.push({label: "Circuit " + String(this.circuits.length), value: this.circuits.length, components: [{label: "Component 0", value: 0}]});
        return this.circuits[this.circuits.length - 1];
    },

    addComponent(index: number) {
        (this.circuits[index].components! as tab[]).push({label: "Component " + String(this.circuits[index].components!.length), value: this.circuits[index].components!.length});
        return this.circuits[index].components!;
    }
})