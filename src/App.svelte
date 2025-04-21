<script lang="ts">
	import Topbar from "./lib/topbar/Topbar.svelte";
    import Workspace from "./lib/workspace/Workspace.svelte";
</script>

<main>
	<div class="topbar">
		<Topbar></Topbar>
	</div>
	<div class="workspace">
		<Workspace></Workspace>
	</div>
</main>

<style>
	.workspace {
		margin-left: 1em;
		margin-right: 1em;
		height: 100%;
	}
</style>
