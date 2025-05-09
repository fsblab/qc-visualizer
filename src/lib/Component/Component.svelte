<script lang="ts">
    import type { componentProperties } from "../interfaces";
    import { designStore } from "../stores/design";
    

    function mouseUp(event: MouseEvent) {
        mousePosOnUp = [event.offsetX, event.offsetY];

        if (component!.selectedGate?.size! > component!.componentProperties?.numberOfQubits!) {
            return
        }

        if (mousePosOnUp[0] != mousePosOnDown[0] || mousePosOnUp[1] != mousePosOnDown[1]) {
            moveSvg();
        } else {
            mousePosOnUp = [event.offsetX - currentTranslation[0], event.offsetY - currentTranslation[1]];
            setGate();
        }
    };

    function moveSvg() {
        appliedTranslation = [mousePosOnUp[0] - mousePosOnDown[0], mousePosOnUp[1] - mousePosOnDown[1]];
        currentTranslation = [currentTranslation[0] + appliedTranslation[0], currentTranslation[1] + appliedTranslation[1]];
    };

    async function setGate() {
        if (component?.selectedGate === null) {
            return;
        };

        var correctedPos: number[] = [getYPos(0) + yOffset * 2, getYPos(0)];
        var column: number;
        var row: number;
        var indexVal: number = 0;

        Array.from({length: numberOfQubits}, (_: any, i: number) => i).forEach((index: number) => {
            const ypos: number = getYPos(index);
            
            if (Math.abs(mousePosOnUp[1] - correctedPos[1]) > Math.abs(ypos - mousePosOnUp[1])) {
                correctedPos[1] = ypos;
                indexVal = index
            };
        });

        row = indexVal;
        indexVal = 0
        correctedPos[1] -= (fontsize + yOffset) / 2;

        Array.from({length: 100}, (_: any, i: number) => i).forEach((index: number) => {
            const ypos: number = getYPos(index) + yOffset * 2;
            
            if (Math.abs(mousePosOnUp[0] - correctedPos[0]) > Math.abs(ypos - mousePosOnUp[0])) {
                correctedPos[0] = ypos;
                indexVal = index;
            };
        });

        correctedPos[0] -= (fontsize + yOffset) / 2;
        column = indexVal;
        var gateData;

        if (component!.selectedGate.isControlGate && component!.selectedGate.controlQubit === undefined) {
            gateData = {...component!.selectedGate, controlQubit: row};
            component!.gates[column] = {gateData, position: correctedPos};
            columnWhichAControlQubitIsCurrentlyBeingPlacedOn = column;
        } else if (component!.selectedGate.isControlGate && component!.selectedGate.controlQubit !== undefined) {
            const rows: number[] = determineRows(row);
            component!.gates[columnWhichAControlQubitIsCurrentlyBeingPlacedOn!].gateData.qubit = rows;
            columnWhichAControlQubitIsCurrentlyBeingPlacedOn = null;
        } else {
            const rows: number[] = determineRows(row);
            gateData = {...component!.selectedGate, gate: await component!.selectedGate.gate(), qubit: rows};
            component!.gates[column] = {gateData, position: correctedPos};
        }
    };

    function determineRows(row: number): number[] {
        if (component!.selectedGate!.isControlGate) {

        }

        var rows: number[] = [];
        var counter: number = component?.selectedGate!.size!

        while (component?.componentProperties?.numberOfQubits! - row < component?.selectedGate!.size! - 1) {
            row--;
        }

        while (counter) {
            rows.push(row);
            row++;
            counter--;
        }

        return rows;
    }

    async function openDialog(column: number) {
        GateInfoDialog = (await import("../Gates/GateInfoDialog.svelte")).default;
        gateColumn = column;
    };

    function closeDialog() {
        gateColumn = null;
        GateInfoDialog = null;
    }

    function deleteGateButtonPressed(column: number) {
        delete component!.gates[column]
        gateColumn = null;
    };

    function getYPos(index: number) {
        return (fontsize + yOffset) * index + fontsize + yOffset;
    };

    function getColor(): string {
        if ($designStore.darkmode) {
            return "#f9f9f9";
        } else {
            return "#1e1e1e";
        };
    };

    $effect(() => {
        if (gateColumn != null) {
            dialog?.showModal();
        }
    });

    var {
        numberOfQubits = $bindable(),
        currentTranslation = $bindable(),
        scale = $bindable(),
        component = $bindable(),
    }: componentProperties = $props();

    const psi: string = "\u03C8";
    var fontsize: number = $derived(20 * scale);
    const yOffset: number = $derived(fontsize);

    var mousePosOnDown: number[];
    var mousePosOnUp: number[];
    var appliedTranslation: number[] = [0, 0];

    var dialog = $state<HTMLDialogElement>()!;
    var gateColumn = $state<number | null>(null);
    var columnWhichAControlQubitIsCurrentlyBeingPlacedOn: number | null = null;

    var GateInfoDialog = $state<any>(null);;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svg class="svg" onmousedown={(event: MouseEvent) => {mousePosOnDown = [event.offsetX, event.offsetY]}} onmouseup={(event) => {mouseUp(event)}}>
    <g style="fill: {getColor()}" transform="translate({currentTranslation[0]}, {currentTranslation[1]})">
        {#each Array.from({length: 100}, (_: any, i: number) => i) as index}
            <line x1={getYPos(index) + yOffset * 2} y1={0} x2={getYPos(index) + yOffset * 2} y2="100%" stroke={"#424242"} stroke-width={2} />
        {/each}
        {#each Array.from({length: numberOfQubits}, (_: any, i: number) => i) as index}
            <text style="fill: {getColor()}" x={fontsize} y={getYPos(index)} font-size={fontsize} font-weight=512>
                {psi}
                <tspan font-size={fontsize * .5} dx={-fontsize * .2} dy={fontsize * .5}>{index}</tspan>
            </text>
            <line x1={fontsize * 3} y1={getYPos(index)} x2="100%" y2={getYPos(index)} stroke={getColor()} stroke-width={4 * scale} />
        {/each}
        {#each Object.entries(component!.gates) as [column, gate]}
            {@const Gate = gate.gateData.gate}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_missing_attribute -->
            <a onclick={() => {openDialog(Number(column))}}>
                <Gate position={gate.position} scale={scale} fontsize={fontsize} size={gate.gateData.size} symbol={gate.gateData.symbol} param={gate.gateData.matrix.parameter}></Gate>
            </a>
        {/each}
    </g>
</svg>

{#if gateColumn != null}
    <GateInfoDialog bind:dialog gateData={component!.gates[gateColumn].gateData} deleteGateButtonPressed={() => deleteGateButtonPressed(gateColumn!)} closeDialog={closeDialog}></GateInfoDialog>
{/if}

<style>
    .svg {
        height: 100%;
        width: 100%;
    }
</style>
