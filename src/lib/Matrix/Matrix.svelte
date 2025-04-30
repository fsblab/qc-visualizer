<script lang="ts">
    var {
        matrix,
        scalar
    }: {matrix: Array<Array<any>>, scalar: string} = $props();
</script>

<div class="matrix">
    <div class="scalar">
        { scalar }
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
</style>