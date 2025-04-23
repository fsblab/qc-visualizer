<script lang="ts">
    import Tabs from "../Tabs/Tabs.svelte";
    import type { tab } from "../interfaces";
    import { circuitsState } from "../stores/circuits.svelte";

    let activeTab: number = 0;
</script>

<div class="workspace">
    <Tabs
        items={circuitsState.circuits}
        addButtonPressed={() => circuitsState.addCircuit()}
        bind:activeTab={activeTab}
    >
    {#snippet children()}
        <Tabs
            items={(circuitsState.circuits[activeTab].components as tab[])}
            addButtonPressed={() => circuitsState.addComponent(activeTab)}
        >
        </Tabs>
    {/snippet}
    </Tabs>
</div>

<style>
    .workspace {
        height: 100%
    }
</style>
