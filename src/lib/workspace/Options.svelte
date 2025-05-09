<script lang="ts">
    import { circuitsState } from "../stores/circuits.svelte";
    import { gates } from "../Gates/gates";
    import { math } from "../util/math";
    import { type Complex, type Matrix } from "mathjs";


    function validateNumber(val: any) {
        if (isNaN(Number(val))) {
            val = 1;
        }

        val = Math.max(val, 1);

        return val;
    };

    function canLowerQubits(direction: number = -1) {
        var canLower = true;

        if (direction > 0) {
            return canLower;
        }

        Object.entries(component.gates).forEach(([key, gate]) => {
            if (Math.max(...gate.gateData.qubit!) + 1 == componentProps.numberOfQubits) {
                canLower = false;
                return;
            }
        });

        return canLower;
    }

    function mouseWheelUsed(direction: number, property: number) {
        if (direction > 0) {
            return property + 1;
        } else {
            return property - 1;
        }
    };

    function calculateComponent() {
        const register: Matrix<Complex>[] = [];
        var counter = 0;

        while (counter < componentProps.numberOfQubits) {
            register.push(math.matrix([math.complex(1, 0), math.complex(0, 0)]) as Matrix<Complex>);
            counter++;
        }

        const sortedKeys = Object.keys(component.gates).sort();

        const sortedGates = sortedKeys.reduce((acc, key: any) => {
        	acc[key] = component.gates[key];
        	return acc;
        }, {});

        var key: any;

        for (key in sortedGates) {
            const qubits: number[] = component.gates[key].gateData.qubit!;
            const scalar = component.gates[key].gateData.matrix.scalar();
            const matrix = component.gates[key].gateData.matrix.matrix;
            var qubitVector: Complex[] = [];
            
            if (component.gates[key].gateData.controlQubit) {
                qubitVector.push(register[component.gates[key].gateData.controlQubit!].get([0]));
                qubitVector.push(register[component.gates[key].gateData.controlQubit!].get([1]));
            }
            
            for (var qubit of qubits) {
                qubitVector.push(register[qubit].get([0]));
                qubitVector.push(register[qubit].get([1]));
            }
            
            const calculationResults: Matrix<Complex> = math.multiply(qubitVector, scalar, matrix);
            component.gates[key].gateData.calculationResults = [];
            var counter = 0;
                
            while (counter < calculationResults.length) {
                component.gates[key].gateData.calculationResults?.push({up: calculationResults[counter], down: calculationResults[counter + 1]});
                counter += 2;
            }

            counter = 0;

            if (component.gates[key].gateData.controlQubit) {
                register[component.gates[key].gateData.controlQubit!] = math.matrix([calculationResults[0], calculationResults[1]]);
                counter = 2;
            }

            for (var qubit of qubits) {
                register[Number(qubit)] = math.matrix([calculationResults[counter], calculationResults[counter + 1]]);
                counter += 2;
            }

            console.log(register);
        }
    };

    var {activeTab = $bindable()} = $props();

    var circuit = circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)];
    var component = circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].components![circuitsState.getActiveComponentIndex(activeTab)];
    var componentProps = circuitsState.getComponentProperties(activeTab);
</script>

<div class="options">
    <div class="childOptions">
        <label for="circuitName">
            Circuit Name:
        </label>
        <div class="childOptionsOptions">
            <input
                type="text"
                id="circuitName"
                value={circuit.label}
                onchange={(event: Event) => {circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].label = event.target?.value}}
            />
        </div>
    </div>
    <div class="childOptions">
        <label for="componentName">
            Component Name:
        </label>
        <div class="childOptionsOptions">
            <input
                type="text"
                id="componentName"
                value={component.label}
                onchange={(event: Event) => {circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].components![circuitsState.getActiveComponentIndex(activeTab)].label = event.target?.value}}
            />
        </div>
    </div>
    <div class="childOptions">
        <label for="numberOfQubits">
            #Qubits:
        </label>
        <div class="childOptionsOptions">
            <button class="dec" onclick={() => {componentProps.numberOfQubits--}} disabled={!canLowerQubits() || componentProps.numberOfQubits === 1}>
                <MsArrowLeft></MsArrowLeft>
            </button>
            <input
                type="text"
                class="numberOfQubits"
                id="numberOfQubits"
                value={componentProps.numberOfQubits}
                onchange={(event: Event) => {componentProps.numberOfQubits = event.target?.value; componentProps.numberOfQubits = validateNumber(componentProps.numberOfQubits)}}
                onwheel={(event: Event) => {canLowerQubits(event.wheelDelta) ? componentProps.numberOfQubits = mouseWheelUsed(event.wheelDelta, componentProps.numberOfQubits) : 0}}
            />
            <button class="inc" onclick={() => {componentProps.numberOfQubits++}}>
                <MsArrowRight></MsArrowRight>
            </button>
        </div>
    </div>
    <div class="childOptions">
        <label for="translationx">Current Translation:</label>
        <div class="childOptionsOptions">
            <input
                type="text"
                id="translationx"
                value={componentProps.currentTranslation[0]}
                onchange={(event: Event) => {componentProps.currentTranslation[0] = event.target?.value; componentProps.currentTranslation[0] = isNaN(Number(componentProps.currentTranslation[0])) ? 0 : componentProps.currentTranslation[0]}}
            />
            <input
                type="text"
                id="translationy"
                value={componentProps.currentTranslation[1]}
                onchange={(event: Event) => {componentProps.currentTranslation[1] = event.target?.value; componentProps.currentTranslation[1] = isNaN(Number(componentProps.currentTranslation[1])) ? 0 : componentProps.currentTranslation[1]}}
            />
            <button class="resetPosition" onclick={() => {componentProps.currentTranslation = [0, 0]}}>
                Reset
            </button>
        </div>
    </div>
    <div class="childOptions">
        <label for="scale">
            Scale:
        </label>
        <div class="childOptionsOptions">
            <button class="dec" onclick={() => {componentProps.scale--}} disabled={componentProps.scale === 0}>
                <MsArrowLeft></MsArrowLeft>
            </button>
            <input
                type="text"
                class="scale"
                id="scale"
                value={componentProps.scale}
                onchange={(event: Event) => {componentProps.scale = event.target?.value; componentProps.scale = isNaN(Number(componentProps.scale)) ? 1 : componentProps.scale}}
                onwheel={(event: Event) => {componentProps.scale = mouseWheelUsed(event.wheelDelta, componentProps.scale)}}
            />
            <button class="inc" onclick={() => {componentProps.scale++}}>
                <MsArrowRight></MsArrowRight>
            </button>
        </div>
    </div>
    <div class="childOptions">
        <label for="gateSelect">
            Gate:
        </label>
        <div class="childOptionsOptions">
            <select bind:value={component.selectedGate} id="gateSelect">
                {#each Object.entries(gates) as [text, gate]}
                    <option class="firstLetterMarked" value={gate}>{text}</option>
                {/each}
                {#if circuit.components}
                    {#each circuit.components as comp}
                        {#if comp != component}
                            <option class="firstLetterMarked" value={comp.value}>{comp.label}</option>
                        {/if}
                    {/each}
                {/if}
            </select>
        </div>
    </div>
    <div class="childOptions">
        <label for="calc">
            Calculate Probabilities:
        </label>
        <div class="childOptionsOptions">
            <button id="calc" onclick={() => calculateComponent()}>Calculate</button>
        </div>
    </div>
</div>


<style>
    #translationx,
    #translationy {
        width: 2em;
        margin-right: 1px;
        text-align: center;
    }
    #gateSelect {
        width: 100%;
    }
    #calc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 1.4em;
    }
    .resetPosition {
        display: flex;
        width: 4em;
        padding: 0;
        justify-content: center;
    }
    .dec,
    .inc {
        text-align: center;
        padding: 0; 
    }
    .options {
        display: flex;
        margin: 2px;
    }
    .childOptions {
        display: flex;
        flex-direction: column;
        margin: 2px;
    }
    .childOptionsOptions {
        display: flex;
    }
    .scale,
    .numberOfQubits {
        text-align: center;
        width: 1em;
    }
    .firstLetterMarked {
        text-decoration: line-through;
    }
</style>