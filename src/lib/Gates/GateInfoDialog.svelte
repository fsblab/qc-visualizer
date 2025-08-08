
<script lang="ts">
    import type { gateMetadata } from "../interfaces";
    import Matrix from "../Matrix/Matrix.svelte";
    import State from "../State/State.svelte";

    var {
        dialog = $bindable(),
        numberOfQubits,
        gateData,
        deleteGateButtonPressed,
        closeDialog,
    }: {dialog: HTMLDialogElement, numberOfQubits: number, gateData: gateMetadata, deleteGateButtonPressed: any, closeDialog: any} = $props();

    const psi = "\u03C8";
    const delta = '\u03B4';
    var param: number | undefined = $derived(gateData.matrix.parameter);
</script>

<dialog bind:this={dialog} onclose={() => {dialog.close; closeDialog()}}>
    <div class="buttons">
        <button class="deletebutton" onclick={deleteGateButtonPressed}>Delete</button>
        <div class="spacer"> {gateData.name} Gate </div>
        <button class="closebutton" onclick={() => {dialog.close; closeDialog()}}> x </button>
    </div>
    <div class="metaData">
        <span class="keyshortcut"><span class="text"> Shortcut Key: </span> {gateData.shortKey}</span>
        <span class="matrix"><span class="text"> Matrix: </span> <Matrix scalar={gateData.matrix.scalarString} matrix={gateData.matrix.matrix}></Matrix>
            {#if param !== undefined}
                <div class="matrix">
                    <span class="parameter">
                        , {delta}=
                        <input
                            class="inputparameter"
                            type="text"
                            value={param}
                            onchange={(event: Event) => {gateData.matrix.parameter = event.target?.value; gateData.matrix.parameter = isNaN(Number(gateData.matrix.parameter)) ? 0 : gateData.matrix.parameter}}
                        />
                    </span>
                </div>
            {/if}
        </span>
    </div>
    <div class="divider"></div>
    <div class="qubitData">
        {#if gateData.calculationResults}
            <span class="vector">
                <span class="psi">
                    {psi} = 
                </span>
                <div class="matrixTable">
                    <div class="state">
                        {#each gateData.calculationResults as z, index}
                            <State index={index} z={z.value} numberOfQubits={numberOfQubits}></State>
                        {/each}
                    </div>
                </div>
            </span>
        {:else}
            <span class="nodata"> No Data. </span>
        {/if}
    </div>
</dialog>

<style>
    dialog {
        height: 40%;
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

    .parameter {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 1.4em;
        margin-top: 1em;
    }

    .inputparameter {
        width: 2em;
    }

    .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: .8em;
    }

    .vector {
        display: flex;
        flex-direction: row;
        justify-content: left;
        margin-top: .64em;
    }

    .psi {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: .24em;
        margin-right: .24em;
    }

    .state {
        margin-right: 1em;
        margin-left: 1em;
        margin-top: .24em;
        margin-bottom: .24em;
    }
</style>