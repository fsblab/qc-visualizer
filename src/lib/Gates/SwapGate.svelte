<script lang="ts">
    import type { gateMetadata } from "../interfaces";

    var {gateData, position, scale, offset}: {gateData: gateMetadata, position: number[], scale: number, offset: number} = $props();
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
    <line
        x1={scaleCorrectedPosition[2] - 5 * scale}
        y1={scaleCorrectedPosition[3] - 5 * scale}
        x2={scaleCorrectedPosition[2] + 5 * scale}
        y2={scaleCorrectedPosition[3] + 5 * scale}
        stroke="red"
        stroke-width={strokeWidth}
    ></line>
    <line
        x1={scaleCorrectedPosition[2] - 5 * scale}
        y1={scaleCorrectedPosition[3] + 5 * scale}
        x2={scaleCorrectedPosition[2] + 5 * scale}
        y2={scaleCorrectedPosition[3] - 5 * scale}
        stroke="red"
        stroke-width={strokeWidth}
    >
    </line>
{/if}