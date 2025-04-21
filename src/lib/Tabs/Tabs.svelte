<script lang="ts">
    import type { Component } from "svelte";
    import type { tab } from "../interfaces";

    function addItem() {
        items[items.length - 1] = {label: (standardName || "Component") + " " + String(items.length - 1), value: items.length, class: "", component: comp};
        items.push({label: '+', value: 999, class: "add"});
        activeTab = items.length - 1;
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
        {#if items.length > 1}
            <svelte:component this={items[activeTab].component} />
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
        border-left: 1px solid #dee2e6;
    }
    
    button {
        border-radius: 0;
        border: none;
        width: 100%;
        border-top: 1px solid #dee2e6;
        border-right: 1px solid #dee2e6;
        width: 8em;
    }
    
    button:hover {
        background-color: #42818b;
        color: black;
    }

    .active {
        background-color: #dee2e6;
        color: black;
    }
    
    .add {
        width: 2em;
        display: flex;
        justify-content: center;
    }

    div {
        width: 100%;
        height: 100%;
    }

    .container {
        border: 2px solid #dee2e6;
        width: 80%;
        height: 80%;
    }
</style>
