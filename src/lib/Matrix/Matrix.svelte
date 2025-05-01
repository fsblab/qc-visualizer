<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        if (scalar.includes("sqrt")) {
            containsSqrt = true;
            [, before, after] = scalar.match(/(\d*.)sqrt\((\d*)/)!;
        } else if (scalar.includes("^")) {
            containsPow = true;
            [, before, after] = scalar.match(/(.*)\^\{(.*)\}/)!;
        }
    })

    var containsSqrt = $state(false);
    var containsPow = $state(false);
    var before = $state("");
    var after = $state("");
    
    var {
        matrix,
        scalar
    }: {matrix: Array<Array<any>>, scalar: string} = $props();
</script>

<div class="matrix">
    <div class="scalar">
        {#if containsSqrt}
            <div class="containsSqrt"> { before } &radic; <span class="sqrt"><span class="sizingcorrection"> &nbsp;{ after }&nbsp; </span></span></div>
        {:else if containsPow}
            <div class="containsPow"> { before } <sup> { after } </sup> </div>
        {:else}
            { scalar }
        {/if}
    </div>
    <table class="matrixTable">
        <tbody>
            {#each matrix as row}
                <tr>
                    {#each row as val}
                        <td class="value">
                            { val }
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .matrix {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .scalar {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .matrixTable {
        border-radius: 16%;
    }
    .value {
        padding-left: .4em;
        padding-right: .4em;
    }
    .sqrt {
        text-decoration: overline;
        margin-left: -.1em;
        font-size: small;
    }
    .sizingcorrection {
        font-size: medium;
    }
    .containsSqrt,
    .containsPow {
        display: flex;
        flex-direction: row;
        margin-right: .4em;
    }
</style>