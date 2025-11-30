<script lang="ts">
    import type { gateMetadata } from "../interfaces";

    var {
        gateData,
        position,
        scale,
        offset,
        fontsize,
    }: {gateData: gateMetadata, position: number[], scale: number, offset: number, fontsize: number} = $props();
    var scaleCorrectedPosition = $derived([position[0] * scale + offset, position[1] * scale + offset, position[2] * scale + offset, position[3] * scale + offset]);
    var strokeWidth = $derived(4 * scale);
</script>

<line
    x1={scaleCorrectedPosition[0] - 5 * scale}
    y1={scaleCorrectedPosition[1] - 5 * scale}
    x2={scaleCorrectedPosition[0] + 5 * scale}
    y2={scaleCorrectedPosition[1] + 5 * scale}
    stroke="red"
    stroke-width={strokeWidth}
></line>
<line
    x1={scaleCorrectedPosition[0] - 5 * scale}
    y1={scaleCorrectedPosition[1] + 5 * scale}
    x2={scaleCorrectedPosition[0] + 5 * scale}
    y2={scaleCorrectedPosition[1] - 5 * scale}
    stroke="red"
    stroke-width={strokeWidth}
>
</line>
{#if !isNaN(scaleCorrectedPosition[2]) && !isNaN(scaleCorrectedPosition[3])}
    <line
        x1={scaleCorrectedPosition[0]}
        y1={scaleCorrectedPosition[1]}
        x2={scaleCorrectedPosition[2]}
        y2={scaleCorrectedPosition[3]}
        stroke="red"
        stroke-width={strokeWidth}
    ></line>
    <rect x={scaleCorrectedPosition[2] - offset} y={scaleCorrectedPosition[3] - offset} width={fontsize * 2} height={fontsize * 2 * (gateData.size - 1)} stroke="red" stroke-width={strokeWidth / 2} />
    <text style="fill: red" x={scaleCorrectedPosition[2] + fontsize / 2 - offset} y={scaleCorrectedPosition[3] + fontsize + (strokeWidth / 2) * (gateData.size - 1) - offset} font-size={fontsize} font-weight=512>
        {gateData.symbol}
    </text>
{/if}