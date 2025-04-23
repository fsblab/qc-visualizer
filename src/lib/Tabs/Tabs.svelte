<script lang="ts">
    import type { Snippet } from "svelte";
    import type { tab } from "../interfaces";

    interface propInterface {
        children?: Snippet,
        addButtonPressed?: any,
        items: tab[],
        activeTab?: number,
        useAddButton?: boolean,
        useCloseButton?: boolean
    }

    let {
        children,
        addButtonPressed,
        items,
        activeTab = $bindable(),
        useAddButton = true,
        useCloseButton = true
    }: propInterface = $props();
</script>

<div class="tabs">
    <ul>
        {#each items as item}
            <li class={activeTab === item.value ? "active" : item.class}>
                <button class={activeTab === item.value ? "active" : item.class} onclick={() => activeTab = item.value}>
                    {item.label}
                </button>
            </li>
            {#if useCloseButton}
                <button class={activeTab === item.value ? "active closebutton" : item.class + " closebutton"}>
                    <MsCloseSmallRounded></MsCloseSmallRounded>
                </button>
            {/if}
        {/each}
        {#if useAddButton}
            <li>
                <button class="add" onclick={() => addButtonPressed()}>
                    +
                </button>
            </li>
        {/if}
    </ul>
    <div class="container">
        {@render children?.()}
    </div>
</div>

<style>
    ul {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
    }
    
    button {
        border-radius: 0;
        border: none;
        width: 10em;
    }

    .tabs {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
    }

    .closebutton {
        display: flex;
        width: 2em;
        justify-content: center;
    }
        
    .add {
        display: flex;
        width: 2em;
        justify-content: center;
    }

    .container {
        height: 100%;
    }
</style>
