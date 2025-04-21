import type { Component } from "svelte";

export interface tab {
    label: string,
    value: number,
    class?: string,
    component?: Component | null
}