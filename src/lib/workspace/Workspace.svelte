<script lang="ts">
    import Tabs from "../Tabs/Tabs.svelte";

    $: projects = [{label: "Project 0", value: 0, childComponent: Tabs, props: {items: [{label: "Component 0", value: 0}], standardName: "Component"}}];
</script>

<div>
    <Tabs items={projects} standardName="Project" comp={Tabs}>
    </Tabs>
</div>

<style>
    div {
        height: 100%
    }
</style>
