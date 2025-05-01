<script lang="ts">
    import type { componentProperties } from "../interfaces";
    import { designStore } from "../stores/design";
    import GateInfoDialog from "../Gates/GateInfoDialog.svelte";


    function mouseUp(event: MouseEvent) {
        mousePosOnUp = [event.offsetX, event.offsetY];

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

    function setGate() {
        if (component?.selectedGate === null) {
            return;
        };

        var correctedPos: number[] = [getYPos(0) + yOffset * 2, getYPos(0)];
        var column: number;
        var indexVal: number = 0;

        Array.from({length: numberOfQubits}, (_: any, i: number) => i).forEach((index: number) => {
            const ypos: number = getYPos(index);
            
            if (Math.abs(mousePosOnUp[1] - correctedPos[1]) > Math.abs(ypos - mousePosOnUp[1])) {
                correctedPos[1] = ypos;
            };
        });

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

        component!.gates[column] = {gateData: component!.selectedGate, position: correctedPos};
    };

    function deleteGateButtonPressed(column: number) {
        delete component!.gates[column]
    }

    function getYPos(index: number) {
        return (fontsize + yOffset) * index + fontsize + yOffset;
    };

    function getColor(): string {
        if ($designStore.darkmode) {
            return "#f9f9f9";
        } else {
            return "#1e1e1e";
        };
    }

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

    var dialog = $state<HTMLDialogElement>();
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
            <a onclick={() => {dialog?.showModal()}}>
                <Gate position={gate.position} scale={scale} fontsize={fontsize}></Gate>
            </a>
            <foreignObject>
                <GateInfoDialog bind:dialog gateData={gate.gateData} deleteGateButtonPressed={() => deleteGateButtonPressed(Number(column))}></GateInfoDialog>
            </foreignObject>
        {/each}
    </g>
</svg>

<style>
    .svg {
        height: 100%;
        width: 100%;
    }
</style>
