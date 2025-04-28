<script lang="ts">
    import Component from "../Component/Component.svelte";
    import { gates } from "../Gates/gates";
    import Tabs from "../Tabs/Tabs.svelte";
    import { circuitsState } from "../stores/circuits.svelte";

    function validateNumber(val: any) {
        if (isNaN(Number(val))) {
            val = 1;
        }

        val = Math.max(val, 1);

        return val;
    };

    addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key == "Escape") {
            component.selectedGate = gates["None"];
        } else if (Object.hasOwn(gates, event.key.toLocaleUpperCase())) {
            component.selectedGate = gates[event.key.toLocaleUpperCase()];
        }
    });

    $: circuit = circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)];
    $: component = circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].components![circuitsState.getActiveComponentIndex(activeTab)];
    $: componentProps = circuitsState.getComponentProperties(activeTab);
    $: activeTab = 0;
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
                            <button class="dec" onclick={() => {componentProps.numberOfQubits--}} disabled={componentProps.numberOfQubits === 1}>
                                <MsArrowLeft></MsArrowLeft>
                            </button>
                            <input
                                type="text"
                                class="numberOfQubits"
                                id="numberOfQubits"
                                value={componentProps.numberOfQubits}
                                onchange={(event: Event) => {componentProps.numberOfQubits = event.target?.value; componentProps.numberOfQubits = validateNumber(componentProps.numberOfQubits)}}
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
                            </select>
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
                        <Component
                            bind:numberOfQubits={componentProps.numberOfQubits}
                            bind:currentTranslation={componentProps.currentTranslation}
                            bind:scale={componentProps.scale}
                            bind:component={component}
                        >
                        </Component>
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
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    #translationx,
    #translationy {
        width: 2em;
        margin-right: 1px;
        text-align: center;
    }
    #gateSelect {
        width: 100%;
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
