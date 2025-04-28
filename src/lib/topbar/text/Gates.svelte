<script lang="ts">
    import { gates } from "../../Gates/gates";
</script>

<table>
    <thead>
        <tr>
            <td>Name</td>
            <td>Symbol</td>
            <td>Size</td>
            <td>Matrix</td>
            <td class="gate">Gate</td>
        </tr>
    </thead>
    <tbody>
        {#each Object.entries(gates) as [_, gate]}
            {#if gate}
                {@const sqrt = gate.name.includes("&radic") ? true : false}
                <tr>
                    <td> {#if sqrt} <span> &radic; </span> <span class="sqrt"> &nbsp;{gate.name.replace("&radic; ", "")}&nbsp; </span> {:else} {gate.name} {/if} </td>
                    <td> {gate.symbol} </td>
                    <td> {gate.size} </td>
                    <td> {gate.matrix} </td>
                    <td class="gate">
                        {#if gate.gate}
                            {@const Gate = gate.gate}
                            <svg><Gate position={[0, 0]} scale={1} fontsize={20}></Gate></svg>
                        {/if}
                    </td>
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

    .gate {
        display: flex;
        justify-content: center;
        flex-shrink: 1;
    }

    .sqrt {
        text-decoration: overline;
    }
</style>