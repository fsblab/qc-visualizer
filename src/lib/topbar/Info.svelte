<script lang="ts">
    import Infodialog from "./Infodialog.svelte";

    let dialog: HTMLDialogElement;
</script>

<button on:click={() => dialog.showModal()}>
    <MsInfoOutline></MsInfoOutline>
</button>
<Infodialog bind:dialog>
</Infodialog>

<style>
</style>