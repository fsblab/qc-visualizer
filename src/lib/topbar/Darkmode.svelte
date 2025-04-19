<script lang="ts">
    import { designStore } from "../stores/design";

    //source: https://pyronaur.com/dark-mode
    function toggleColorScheme() {
        $designStore.darkmode = !$designStore.darkmode;
        
        if ($designStore.darkmode) {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        }
    }
</script>

<button on:click={() => toggleColorScheme()}>
    {#if $designStore.darkmode}
        <MsDarkMode></MsDarkMode>
    {:else}
        <MsLightMode></MsLightMode>
    {/if}
</button>

<style>
</style>
