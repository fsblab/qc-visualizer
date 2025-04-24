<script lang="ts">
    import Tabs from "../Tabs/Tabs.svelte";
    import type { tab } from "../interfaces";
    import About from "./text/About.svelte";
    import Instructions from "./text/Instructions.svelte";

    export let dialog: HTMLDialogElement;

    let activeTab = 0;
    let items: tab[] = [{label: "About", value: 0}, {label: "Instructions", value: 1}];
</script>

<dialog bind:this={dialog}>
    <button class="closebutton" on:click={() => dialog.close()}>
        <MsCloseSmallRounded></MsCloseSmallRounded>
    </button>
    <Tabs useAddButton={false} useRemoveButton={false} {items} bind:activeTab={activeTab}>
        {#snippet children()}
        <svelte:component this={[About, Instructions][activeTab]}></svelte:component>
        {/snippet}
    </Tabs>
</dialog>

<style>
    dialog {
        width: 50%;
        height: 80%;
    }

    .closebutton {
        position: absolute;
        top: 1em;
        right: 1em;
    }
</style>
