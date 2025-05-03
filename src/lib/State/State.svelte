<script lang="ts">
    import type { Complex } from "mathjs";
    import { math } from "../util/math";
    import { onMount } from "svelte";

    onMount(() => {
        up = z[0];
        down = z[1];

        simplify();
    });

    function simplify() {
        const hadamartScalar: number = 0.7071067811865475;
        const floatingPointPrecision = 1000;

        up.re = math.floor(up.re * floatingPointPrecision) / floatingPointPrecision;
        up.im = math.floor(up.im * floatingPointPrecision) / floatingPointPrecision;
        down.re = math.floor(down.re * floatingPointPrecision) / floatingPointPrecision;
        down.im = math.floor(down.im * floatingPointPrecision) / floatingPointPrecision;

        if (1 - up.re < 0.0001) {
            up.re = 1
        }
        if (1 - down.re < 0.0001) {
            down.re = 1
        }
        if (1 - up.im < 0.0001) {
            up.re = 1
        }
        if (1 - down.im < 0.0001) {
            down.im = 1
        }

        const re = RegExp(/0\.707/g);

        upString = up.format().replaceAll(re, "1 / \u221A2");
        downString = down.format().replaceAll(re, "1 / \u221A2");
    }

    var {
        z,
    }: {z: Complex[]} = $props();

    var up: Complex = $state()!;
    var down: Complex = $state()!;

    var upString: string = $state()!;
    var downString: string = $state()!;

    const circleCenter = 50;
</script>

<div class="qubitstate">
    <div class="amplitudes">
        {#if z[1].re >= 0}
            <div> <span class="up"> {upString} </span> |0&rang; + <span class="down"> {downString} </span> |1&rang; </div>
        {:else}
            <div> <span class="up"> {upString} </span> |0&rang; <span class="down"> {downString} </span> |1&rang; </div>
        {/if}
    </div>
</div>

<style>
    .qubitstate {
        display: flex;
        flex-direction: row;
    }

    .unitcircle,
    .amplitudes {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>