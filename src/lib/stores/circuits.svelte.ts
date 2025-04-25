import type { componentProperties, tab } from "../interfaces";

const baseComponentProperties: componentProperties = {
    numberOfQubits: 4,
    currentTranslation: [0, 0],
    scale: 1,
};

const baseCircuitProperties: tab = {
    label: "Circuit 0",
    value: 0,
    componentCounter: 0,
    componentActiveTab: 0,
    components: [
        {
            label: "Component 0",
            value: 0,
            componentProperties: baseComponentProperties,
        },
    ],
};

function setCircuitProperties(val: number): tab {
    return {
        label: "Circuit " + String(val),
        value: val,
        componentCounter: 0,
        componentActiveTab: 0,
        components: [
            {
                label: "Component 0",
                value: 0,
                componentProperties: baseComponentProperties,
            },
        ],
    };
}

function setComponentProperties(val: number): tab {
    return {
        label: "Component " + String(val),
        value: val,
        componentProperties: baseComponentProperties,
    };
}

export const circuitsState = $state({
    circuits: [
        baseCircuitProperties,
    ] as tab[],

    circuitCounter: 0,

    getCircuitIndex(tabValue: number): number {
        return this.circuits.findIndex((item) => {return item.value === tabValue});
    },

    getActiveComponentIndex(tabValue: number): number {
        const index: number = this.getCircuitIndex(tabValue);
        const compTab: number = this.circuits[index].componentActiveTab!;
        
        return this.circuits[index].components!.findIndex((item) => {return item.value === compTab});
    },

    getComponentProperties(tabValue: number): componentProperties {
        const index: number = this.getCircuitIndex(tabValue);
        const compIndex: number = this.getActiveComponentIndex(tabValue);
        const comp: tab[] = (this.circuits[index].components!);
        
        return (comp[compIndex].componentProperties!);
    },

    getNumberOfCircuits(): number {
        return this.circuits.length;
    },

    getNumberOfComponents(val: number) {
        return (this.circuits[this.getCircuitIndex(val)].components! as tab[]).length;
    },

    addCircuit(): tab {
        const length = this.circuits.push(setCircuitProperties(++this.circuitCounter));
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
        const length = this.circuits[index].components!.push(setComponentProperties(++this.circuits[index].componentCounter!));
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