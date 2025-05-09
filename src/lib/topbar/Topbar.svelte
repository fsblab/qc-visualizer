<script lang="ts">
    import { onMount } from "svelte";

    onMount(async () => {
        Darkmode = (await import('./Darkmode.svelte')).default;
        Info = (await import('./Info.svelte')).default;
    });

    var Darkmode = $state<any>(null);
    var Info = $state<any>(null);
</script>

<div class="topbar">
    <div class="topbarcontainer">
        <div class="darkmode">
            <Darkmode></Darkmode>
        </div>
        <div class="info">
            <Info></Info>
        </div>
    </div>
</div>

<style>
    .topbar {
        display: flex;
    }

    .topbarcontainer {
        margin: .4em;
        margin-left: 1em;
        display: flex;
    }

    .info {
        margin-left: .2em;
    }
</style>
