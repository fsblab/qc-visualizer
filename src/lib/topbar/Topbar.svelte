<script lang="ts">
    import Darkmode from "./Darkmode.svelte";
    import Info from "./Info.svelte";
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
    .topbarcontainer {
        margin-left: 1em;
        display: flex;
    }

    .info {
        margin-left: .2em;
    }
</style>
