<script lang="ts">
    import Tabs from "../Tabs/Tabs.svelte";
    import type { tab } from "../interfaces";
    import About from "./text/About.svelte";
    import Instructions from "./text/Instructions.svelte";

    export let dialog: HTMLDialogElement;

    let items: tab[] = [{label: "About", value: 0, childComponent: About}, {label: "Instructions", value: 1, childComponent: Instructions}];
</script>

<dialog bind:this={dialog}>
    <button class="closedialog" on:click={() => dialog.close()}>
        <MsCloseSmallRounded></MsCloseSmallRounded>
    </button>
    <Tabs add={false} {items}>
    </Tabs>
</dialog>

<style>
    dialog {
        width: 50%;
        height: 80%;
    }

    .closedialog {
        position: absolute;
        top: 1em;
        right: 1em;
    }
</style>
