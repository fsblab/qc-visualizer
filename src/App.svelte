<script lang="ts">
    import { onMount } from "svelte";

	onMount(async () => {
		Topbar = (await import('./lib/topbar/Topbar.svelte')).default;
		Workspace = (await import('./lib/workspace/Workspace.svelte')).default;
	});

	var Topbar = $state<any>(null);
	var Workspace = $state<any>(null);
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
		height: 90%;
	}
</style>
