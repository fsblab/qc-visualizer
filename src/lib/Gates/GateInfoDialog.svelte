
<script lang="ts">
    import type { gateMetadata } from "../interfaces";
    import Matrix from "../Matrix/Matrix.svelte";
    import State from "../State/State.svelte";

    var {
        dialog = $bindable(),
        gateData,
        deleteGateButtonPressed,
        closeDialog,
    }: {dialog: HTMLDialogElement, gateData: gateMetadata, deleteGateButtonPressed: any, closeDialog: any} = $props();

    const psi = "\u03C8";
    var minIndex: number = Math.min(...gateData.qubit!);
</script>

<dialog bind:this={dialog} onclose={closeDialog()}>
    <div class="buttons">
        <button class="deletebutton" onclick={deleteGateButtonPressed}>Delete</button>
        <div class="spacer"> {gateData.name} Gate </div>
        <button class="closebutton" onclick={() => {dialog.close; closeDialog()}}> x </button>
    </div>
    <div class="metaData">
        <span class="keyshortcut"><span class="text"> Key Shortcut: </span> {gateData.shortKey}</span>
        <span class="matrix"><span class="text"> Matrix: </span> <Matrix scalar={gateData.matrix.scalarString} matrix={gateData.matrix.matrix}></Matrix></span>
    </div>
    <div class="divider"></div>
    <div class="qubitData">
        {#if gateData.calculationResults}
            {#each gateData.qubit! as index}
                <span class="keyshortcut"><span class="text"><div> {psi}<sub>{index}</sub> = </div></span> <State z={[gateData.calculationResults[index - minIndex].up, gateData.calculationResults[index - minIndex].down]}></State> </span>
            {/each}
        {:else}
            <span class="nodata"> No Data. </span>
        {/if}
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

    .nodata {
        width: 100%;
        font-size: large;
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