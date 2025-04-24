<script lang="ts">
    import Tabs from "../Tabs/Tabs.svelte";
    import { circuitsState } from "../stores/circuits.svelte";

    let activeTab: number = 0;
</script>

<div class="workspace">
    <Tabs
        items={circuitsState.circuits}
        addButtonPressed={() => circuitsState.addCircuit()}
        removeButtonPressed={(val: number) => {circuitsState.removeCircuit(val); if (val === activeTab) activeTab = circuitsState.circuits[0].value}}
        bind:activeTab={activeTab}
    >
    {#snippet children()}
        <Tabs
            items={(circuitsState.circuits[circuitsState.getCircuitIndex(activeTab)].components!)}
            addButtonPressed={() => circuitsState.addComponent(activeTab)}
            removeButtonPressed={(val: number) => circuitsState.removeComponent(activeTab, val)}
        >
        {#snippet children()}
            <!-- TBD -->
        {/snippet}
        </Tabs>
    {/snippet}
    </Tabs>
</div>

<style>
    .workspace {
        height: 100%
    }
</style>
