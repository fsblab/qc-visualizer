<script lang="ts">
    import Tabs from "../Tabs/Tabs.svelte";

    $: projects = [{label: "Project 0", value: 0, component: Tabs}];
</script>

<div>
    <Tabs items={projects} standardName="Project" comp={Tabs}>
    </Tabs>
</div>

<style>
    div {
        width: 100%;
        height: 100%;
    }
</style>
