export interface componentProperties {
    numberOfQubits: number,
    currentTranslation: number[],
    scale: number,
}

export interface tab {
    label: string,
    value: number,
    class?: string,
    componentCounter?: number,
    componentActiveTab?: number,
    components?: tab[],
    componentProperties?: componentProperties
}