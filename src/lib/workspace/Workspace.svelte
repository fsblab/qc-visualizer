<script lang="ts">
    import Component from "../Component/Component.svelte";
    import { gates } from "../Gates/gates";
    import Tabs from "../Tabs/Tabs.svelte";
    import { circuitsState } from "../stores/circuits.svelte";
    import Options from "./Options.svelte";

    addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key == "Escape") {
            component.selectedGate = gates["None"];
        } else if (Object.hasOwn(gates, event.key.toLocaleUpperCase())) {
            component.selectedGate = gates[event.key.toLocaleUpperCase()];
        }
    });

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
                <Options bind:activeTab={activeTab}></Options>
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
</style>
