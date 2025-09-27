export interface Tone {
    id: string;
    label: string;
};

export const tones: Tone[] = [
    {id: "formal", label:"Formal"},
    {id: "professional-business", label:"Professional/Business"},
    {id: "academic", label:"Academic"},
    {id: "casual", label:"Casual"},
    {id: "polite", label:"Polite/Courteous"},
    {id: "friendly", label:"Friendly/Warm"},
];