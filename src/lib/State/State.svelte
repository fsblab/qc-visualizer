<script lang="ts">
    import { type Complex } from "mathjs";
    import { math } from "../util/math";
    import { onMount } from "svelte";

    onMount(() => {
        simplify();
    });

    function simplify() {
        const floatingPointPrecision = 1000;

        z.re = math.floor(z.re * floatingPointPrecision) / floatingPointPrecision;
        z.im = math.floor(z.im * floatingPointPrecision) / floatingPointPrecision;

        if (1 - z.re < 0.0001) {
            z.re = 1
        }
        if (1 - z.im < 0.0001) {
            z.im = 1
        }

        const reg = RegExp(/0\.707/g);

        zString = z.toString().replaceAll(reg, "1 / \u221A2");
    }

    var {
        index,
        z,
        numberOfQubits
    }: {index: number, z: Complex, numberOfQubits: number} = $props();

    var zString: string = $state()!;
</script>

<div class="qubitstate">
    <div class="amplitudes">
            <div class="grid"> <span class="up"> {zString} </span> |{index.toString(2).padStart(numberOfQubits, '0')}&rang; </div>
    </div>
</div>

<style>
    .qubitstate {
        display: flex;
        flex-direction: row;
    }

    .amplitudes {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .grid {
        display: grid;
        grid-template-columns: 4em 4em;
    }
</style>