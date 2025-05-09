<script lang="ts">
    import { onMount } from "svelte";
    import { gates } from "../Gates/gates";
    import { circuitsState } from "../stores/circuits.svelte";

    addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key == "Escape") {
            component.selectedGate = gates["None"];
        } else if (Object.hasOwn(gates, event.key.toLocaleUpperCase())) {
            component.selectedGate = gates[event.key.toLocaleUpperCase()];
        }
    });

    var activeTab = $state<number>(0);
    var component = $derived<any>(circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].components![circuitsState.getActiveComponentIndex(activeTab)]);
    var componentProps = $derived<any>(circuitsState.getComponentProperties(activeTab));
    var Tabs = $state<any>(null);
    var Options = $state<any>(null);
    var Component = $state<any>(null);

    onMount(async () => {
        Options = (await import('./Options.svelte')).default;
        Tabs = (await import('../Tabs/Tabs.svelte')).default;
        Component = (await import('../Component/Component.svelte')).default;
    });
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
