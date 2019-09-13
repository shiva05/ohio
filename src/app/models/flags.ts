export interface Flags {
    count: number;
    readOnly: FlagItem[];
    editable: FlagItem[];
    sources: FlagSource[];

}

export interface FlagItem {
    flagDescription: string;
    flagKey: number;
    selected: boolean;
}

export interface FlagSource{
    immediateOwnerName: string;
    immediateOwnerSourceKey: number;
}
