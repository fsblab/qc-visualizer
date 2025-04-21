<script lang="ts">
    import type { Component } from "svelte";
    import type { tab } from "../interfaces";

    function addItem() {
        items[items.length - 1] = {label: standardName + " " + String(items.length - 1), value: items.length, class: "", childComponent: comp};
        items.push({label: '+', value: 999, class: "add"});
    }

    export let items: tab[] = [];
    export let activeTab: number = 0;
    export let standardName: string = "";
    export let comp: Component | null = null;
    export let add: boolean = true;

    if (add) {
        items.push({label: '+', value: 999, class: "add"});
    }
</script>

<div>
    <ul>
        {#each items as item}
            <li class={activeTab === item.value ? "active" : item.class}>
                <button class={activeTab === item.value ? "active" : item.class} on:click={() => item.class === "add" ? addItem() : activeTab = item.value}>
                    {item.label}
                </button>
            </li>
        {/each}
    </ul>
    <div class="container">
        {#if items.length}
            <svelte:component this={items[activeTab].childComponent} {...items[activeTab].props} />
        {/if}
    </div>
    <slot>
    </slot>
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
        
    .add {
        display: flex;
        width: 2em;
        justify-content: center;
    }
</style>
