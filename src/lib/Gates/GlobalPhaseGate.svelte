<script lang="ts">
    import type { gateProperties } from "../interfaces";
    import BaseGate from "./BaseGate.svelte";

    var props: gateProperties = $props();
</script>

<BaseGate position={props.position} scale={props.scale} fontsize={props.fontsize} symbol={props.symbol}>
    ({props.param})
</BaseGate>