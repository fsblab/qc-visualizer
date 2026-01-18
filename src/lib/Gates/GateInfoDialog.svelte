
<script lang="ts">
    import type { gateMetadata } from "../interfaces";
    import Matrix from "../Matrix/Matrix.svelte";
    import State from "../State/State.svelte";
    import BlochSphere from "./BlochSphere.svelte";
    import { math } from "../util/math";
    import type { Complex } from "mathjs";

    var {
        dialog = $bindable(),
        gateData,
        deleteGateButtonPressed,
        closeDialog,
    }: {dialog: HTMLDialogElement, gateData: gateMetadata, deleteGateButtonPressed: any, closeDialog: any} = $props();

    const psi = "\u03C8";
    const delta = '\u03B4';
    const minIndex: number = Math.min(...gateData.qubit!);
    var param: number | undefined = $derived(gateData.matrix.parameter);
    const u = $derived(math.divide(math.multiply(gateData.calculationResults!.up, gateData.calculationResults!.down), math.square(gateData.calculationResults!.up))) as Complex;
    const Px = $derived(math.divide(math.multiply(2, u.re), math.add(1, math.square(u.re), math.square(u.im))));
    const Py = $derived(math.divide(math.multiply(2, u.im), math.add(1, math.square(u.re), math.square(u.im))));
    const Pz = $derived(math.divide(math.subtract(math.subtract(1, math.square(u.re)), math.square(u.im)), math.add(1, math.square(u.re), math.square(u.im))));
</script>

<dialog bind:this={dialog} onclose={() => {dialog.close; closeDialog()}}>
    <div class="buttons">
        <button class="deletebutton" onclick={deleteGateButtonPressed}>Delete</button>
        <div class="spacer"> {gateData.name} Gate </div>
        <button class="closebutton" onclick={() => {dialog.close; closeDialog()}}> x </button>
    </div>
    <div class="metaData">
        <span class="keyshortcut"><span class="text"> Key Shortcut: </span> {gateData.shortKey}</span>
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
            {#each gateData.qubit! as index}
                <span class="keyshortcut">
                    <span class="text">
                        <div> {psi}
                            <sub>{index}</sub> = 
                        </div>
                    </span>
                    <State z={[gateData.calculationResults.up, gateData.calculationResults.down]}></State>
                    <BlochSphere x={Px} y={Py} z={Pz}></BlochSphere>
                </span>
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
        margin-right: .8em 
    }
</style>