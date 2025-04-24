<script lang="ts">
    import Component from "../Component/Component.svelte";
    import Tabs from "../Tabs/Tabs.svelte";
    import { circuitsState } from "../stores/circuits.svelte";

    function validateNumberOfQubits() {
        if (typeof numberOfQubits != typeof 0) {
            numberOfQubits = 1;
        }

        numberOfQubits = Math.min(Number(numberOfQubits), 1);
    }

    $: circuitName = circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].label;

    let activeTab: number = 0;
    let numberOfQubits = 4;
</script>

<div class="workspace">
    <Tabs
        items={circuitsState.circuits}
        addButtonPressed={() => circuitsState.addCircuit()}
        removeButtonPressed={(val: number) => {circuitsState.removeCircuit(val); if (val === activeTab) activeTab = circuitsState.circuits[0].value}}
        bind:activeTab={activeTab}
    >
        {#snippet children()}
            <div class="options">
                <div class="childOptions">
                    <label for="componentName">
                        Name:
                    </label>
                    <input type="text" id="componentName" value={circuitName} on:change={(event: Event) => {circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].label = event.target?.value}} />
                </div>
                <div class="childOptions">
                    <label for="numberOfQubits">
                        #Qubits:
                    </label>
                    <div class="options">
                        <button on:click={() => {numberOfQubits--}} disabled={numberOfQubits === 1}>
                            <MsArrowLeft></MsArrowLeft>
                        </button>
                        <input type="text" class="numberOfQubits" id="numberOfQubits" value={numberOfQubits} on:change={(event: Event) => {numberOfQubits = event.target?.value; validateNumberOfQubits()}} />
                        <button on:click={() => {numberOfQubits++}}>
                            <MsArrowRight></MsArrowRight>
                        </button>
                    </div>
                </div>
            </div>
            <Tabs
                items={(circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].components!)}
                addButtonPressed={() => circuitsState.addComponent(activeTab)}
                removeButtonPressed={(val: number) => {circuitsState.removeComponent(activeTab, val); if (val === circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].componentActiveTab) circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].componentActiveTab = circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].components![0].value}}
                bind:activeTab={circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].componentActiveTab}
                customClass="noBottomBorder noLeftBorder noRightBorder"
            >
                {#snippet children()}
                    <Component {numberOfQubits}/>
                {/snippet}
            </Tabs>
        {/snippet}
    </Tabs>
</div>

<style>
    button {
        display: flex;
        width: 1em;
        height: 1em;
        justify-content: center;
    }
    .workspace {
        height: 100%
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
    .numberOfQubits {
        width: 1em;
    }
</style>
