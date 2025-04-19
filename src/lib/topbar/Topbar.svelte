<script lang="ts">
    import Darkmode from "./Darkmode.svelte";
    import Info from "./Info.svelte";
</script>

<div class="topbar">
    <div class="margincontainer">
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
        position: absolute;
        width: 100%;
        top: 0em;
        left: 0em;
        background-color: rgb(16, 16, 16);
    }

    .margincontainer {
        margin: .1em;
        display: flex;
    }

    .info {
        margin-left: .2em;
        display: flex;
    }
</style>
