<script lang="ts">
    import { gates } from "../../Gates/gates";
    import Matrix from "../../Matrix/Matrix.svelte";
</script>

<table>
    <thead>
        <tr>
            <td>Name</td>
            <td>Symbol</td>
            <td>Size</td>
            <td>Matrix</td>
            <td>Gate</td>
        </tr>
    </thead>
    <tbody>
        {#each Object.entries(gates) as [_, gate]}
            {#if gate}
                {@const sqrt = gate.name.includes("&radic;") ? true : false}
                <tr>
                    <td> {#if sqrt} <span> &radic; </span> <span class="sqrt"><span class="sizingcorrection"> &nbsp;{gate.name.replace("&radic; ", "")}&nbsp; </span></span> {:else} {gate.name} {/if} </td>
                    <td> {gate.symbol} </td>
                    <td> {gate.size} </td>
                    <td class="matrixrow"><div class="matrixcolumn"><Matrix matrix={gate.matrix.matrix} scalar={gate.matrix.scalarString}></Matrix></div><td>
                    {#if gate.gate}
                        {@const Gate = gate.gate}
                        <div class="gate"><svg><Gate position={[0, 0]} scale={1} fontsize={20}></Gate></svg></div>
                    {/if}
                </tr>
            {/if}
        {/each}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        margin: 1em;
    }

    tr,
    td {
        height: 100%;
    }

    tr {
        border-bottom: 2px solid white;
    }

    .gate {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex: 1;
    }

    .sqrt {
        text-decoration: overline;
        margin-left: -.5em;
        font-size: small;
    }

    .sizingcorrection {
        font-size: medium;
    }

    .matrixrow {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .matrixcolumn {
        display: flex;
        flex-direction: row;
        justify-content: right;
    }
</style>