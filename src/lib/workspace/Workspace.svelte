<script lang="ts">
    import Component from "../Component/Component.svelte";
    import Tabs from "../Tabs/Tabs.svelte";
    import { circuitsState } from "../stores/circuits.svelte";

    function validateNumber(val: any) {
        if (isNaN(Number(val))) {
            val = 1;
        }

        val = Math.max(val, 1);

        return val;
    }

    $: circuitName = circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].label;

    var activeTab: number = 0;
    var numberOfQubits = 4;
    var currentTranslation = [0, 0]
    var scale = 1;
</script>

<div class="workspace">
    <Tabs
        items={circuitsState.circuits}
        addButtonPressed={() => circuitsState.addCircuit()}
        removeButtonPressed={(val: number) => {circuitsState.removeCircuit(val); if (val === activeTab) activeTab = circuitsState.circuits[0].value}}
        bind:activeTab={activeTab}
    >
        {#snippet children()}
            <div class="children">
                <div class="options">
                    <div class="childOptions">
                        <label for="componentName">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="componentName"
                            value={circuitName}
                            on:change={(event: Event) => {circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].label = event.target?.value}}
                        />
                    </div>
                    <div class="childOptions">
                        <label for="numberOfQubits">
                            #Qubits:
                        </label>
                        <div class="options">
                            <button class="dec" on:click={() => {numberOfQubits--}} disabled={numberOfQubits === 1}>
                                <MsArrowLeft></MsArrowLeft>
                            </button>
                            <input
                                type="text"
                                class="numberOfQubits"
                                id="numberOfQubits"
                                value={numberOfQubits} on:change={(event: Event) => {numberOfQubits = event.target?.value; numberOfQubits = validateNumber(numberOfQubits)}}
                            />
                            <button class="inc" on:click={() => {numberOfQubits++}}>
                                <MsArrowRight></MsArrowRight>
                            </button>
                        </div>
                    </div>
                    <div class="childOptions">
                        <label for="translationx">Current Translation:</label>
                        <div class="options">
                            <input
                                type="text"
                                id="translationx"
                                value={currentTranslation[0]}
                                on:change={(event: Event) => {currentTranslation[0] = event.target?.value; currentTranslation[0] = isNaN(Number(currentTranslation[0])) ? 0 : currentTranslation[0]}}
                            />
                            <input
                                type="text"
                                id="translationy"
                                value={currentTranslation[1]}
                                on:change={(event: Event) => {currentTranslation[1] = event.target?.value; currentTranslation[1] = isNaN(Number(currentTranslation[1])) ? 0 : currentTranslation[1]}}
                            />
                            <button class="resetPosition" on:click={() => {currentTranslation = [0, 0]}}>
                                Reset
                            </button>
                        </div>
                    </div>
                    <div class="childOptions">
                        <label for="scale">
                            Scale:
                        </label>
                        <div class="options">
                            <button class="dec" on:click={() => {scale--}} disabled={scale === 0}>
                                <MsArrowLeft></MsArrowLeft>
                            </button>
                            <input
                                type="text"
                                class="scale"
                                id="scale"
                                value={scale} on:change={(event: Event) => {scale = event.target?.value; scale = isNaN(Number(scale)) ? 1 : scale}}
                            />
                            <button class="inc" on:click={() => {scale++}}>
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
                        <Component {numberOfQubits} {scale} bind:currentTranslation={currentTranslation}/>
                    {/snippet}
                </Tabs>
            </div>
        {/snippet}
    </Tabs>
</div>

<style>
    .workspace {
        height: 100%
    }
    .children {
        height: 90%;
    }
    #translationx,
    #translationy {
        width: 4em;
        margin-right: 1px;
    }
    .resetPosition {
        display: flex;
        width: 4em;
        height: 1.3em;
        padding: 0;
        justify-content: center;
    }
    .dec,
    .inc {
        width: 2em;
        height: 1.3em;
        text-align: center;
        padding: 0; 
    }
    .options {
        display: flex;
        height: 3em;
        margin: 2px;
    }
    .childOptions {
        display: flex;
        flex-direction: column;
        margin: 2px;
    }
    .scale,
    .numberOfQubits {
        width: 1em;
    }
</style>
