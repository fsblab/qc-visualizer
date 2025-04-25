<script lang="ts">
    function moveSvg(event: MouseEvent) {
        mousePosOnUp = [event.clientX, event.clientY];
        appliedTranslation = [mousePosOnUp[0] - mousePosOnDown[0], mousePosOnUp[1] - mousePosOnDown[1]];
        currentTranslation = [currentTranslation[0] + appliedTranslation[0], currentTranslation[1] + appliedTranslation[1]];
    };

    function getYPos(index: number) {
        return (fontsize + yOffset) * index + fontsize + yOffset;
    };

    function getColor(): string {
        if (document.body.classList.contains("dark")) {
            return "#f9f9f9";
        } else {
            return "#1e1e1e";
        };
    }

    export var numberOfQubits: number;
    export var currentTranslation: number[];
    export var scale: number;


    const psi: string = "\u03C8";
    var fontsize: number = 20 * scale;
    const yOffset: number = fontsize;

    var mousePosOnDown: number[];
    var mousePosOnUp: number[];
    var appliedTranslation: number[] = [0, 0];

    $: fontsize = 20 * scale;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svg class="svg" on:mousedown={(event: MouseEvent) => {mousePosOnDown = [event.clientX, event.clientY]}} on:mouseup={(event) => {moveSvg(event)}}>
    <g style="fill: {getColor()}" transform="translate({currentTranslation[0]}, {currentTranslation[1]})">
        {#each Array.from({length: numberOfQubits}, (_: any, i: number) => i) as index}
            <text style="fill: {getColor()}" x={fontsize} y={getYPos(index)} font-size={fontsize} font-weight=512>
                {psi}
                <tspan font-size={fontsize * .5} dx={-fontsize * .2} dy={fontsize * .5}>{index}</tspan>
            </text>
            <line x1={fontsize * 3} y1={getYPos(index)} x2="100%" y2={getYPos(index)} stroke={getColor()} stroke-width={4 * scale} />
        {/each}
    </g>
</svg>

<style>
    .svg {
        height: 100%;
        width: 100%;
    }
</style>
