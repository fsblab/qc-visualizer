<script lang="ts">
    import type { gateProperties } from "../interfaces";

    var props: gateProperties = $props();
    var scaleCorrectedPosition = $derived([props.position[0] * props.scale, props.position[1] * props.scale]);
    var strokeWidth = $derived(2 * props.scale);
</script>

<rect x={scaleCorrectedPosition[0]} y={scaleCorrectedPosition[1]} width={props.fontsize * 2} height={props.fontsize * 2 * props.size} stroke="red" stroke-width={strokeWidth} />
<text style="fill: red" x={scaleCorrectedPosition[0] + props.fontsize / 2 + strokeWidth} y={scaleCorrectedPosition[1] + props.fontsize + strokeWidth * props.size} font-size={props.fontsize} font-weight=512>
        {props.symbol}
</text>