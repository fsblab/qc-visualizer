import type { Component } from "svelte";
import Hgate from "./Hgate.svelte";
import type { gateProperties } from "../interfaces";


export const gates: {[key: string]: Component<gateProperties> | null} = {
    "None": null,
    "H": Hgate,
}