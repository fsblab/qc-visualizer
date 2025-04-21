import { writable } from "svelte/store";

export const designStore = writable({
    //source: https://robkendal.co.uk/blog/2024-11-21-detecting-os-level-dark-mode/
    darkmode: !window.matchMedia("(prefers-color-scheme: dark)").matches,
})