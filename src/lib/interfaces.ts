import type { Component } from "svelte";

export interface properties {
    items?: tab[]
    activeTab?: number
    comp?: Component[] | null
    add?: boolean
}

export interface tab {
    label: string,
    value: number,
    class?: string,
    componentCounter?: number,
    componentActiveTab?: number,
    components?: tab[],
}