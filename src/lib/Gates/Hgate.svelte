<script lang="ts">
    import type { gateProperties } from "../interfaces";
    import GateInfoDialog from "./GateInfoDialog.svelte";

    var props: gateProperties = $props();
    var scaleCorrectedPosition = $derived([props.position[0] * props.scale, props.position[1] * props.scale]);
    var strokeWidth = $derived(2 * props.scale);

    const name = "H";
</script>

<rect x={scaleCorrectedPosition[0]} y={scaleCorrectedPosition[1]} width={props.fontsize * 2} height={props.fontsize * 2} stroke="red" stroke-width={strokeWidth} />
<text style="fill: red" x={scaleCorrectedPosition[0] + props.fontsize / 2 + strokeWidth} y={scaleCorrectedPosition[1] + props.fontsize + strokeWidth} font-size={props.fontsize} font-weight=512>
        {name}
</text>