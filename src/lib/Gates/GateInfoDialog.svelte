
<script lang="ts">
    import type { gateMetadata } from "../interfaces";
    import Matrix from "../Matrix/Matrix.svelte";

    var {
        dialog = $bindable(),
        gateData,
        deleteGateButtonPressed,
    }: {dialog: HTMLDialogElement, gateData: gateMetadata, deleteGateButtonPressed: any} = $props();

</script>

<dialog bind:this={dialog}>
    <div class="buttons">
        <button class="deletebutton" onclick={() => {dialog.close(); deleteGateButtonPressed()}}>Delete</button>
        <div class="spacer"> {gateData.name} Gate </div>
        <button class="closebutton" onclick={() => dialog.close()}>x</button>
    </div>
    <div class="metaData">
        <span class="keyshortcut"><span class="text"> Key Shortcut: </span> {gateData.shortKey}</span>
        <span class="matrix"><span class="text"> Matrix: </span> <Matrix scalar={gateData.matrix.scalarString} matrix={gateData.matrix.matrix}></Matrix></span>
    </div>
</dialog>

<style>
    dialog {
        height: 32%;
        width: 32%;
        display: flex;
        flex-direction: column;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .spacer {
        width: 100%;
        font-size: x-large;
        border-radius: 8px;
    }

    .keyshortcut,
    .matrix {
        display: flex;
        flex-direction: row;
        margin: .2em;
    }

    .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: .8em 
    }
</style>