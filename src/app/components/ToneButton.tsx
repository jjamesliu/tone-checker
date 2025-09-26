import { LucideIcon } from "lucide-react";

interface ToneButtonProps {
    tone: string;
    selected: boolean;
    onClick: (tone: string) => void;
    children: React.ReactNode;
    icon?: LucideIcon;

}

export default function ToneButton({ tone, selected, onClick, children, icon: Icon }: ToneButtonProps) {
    return (
    <button onClick={() => onClick(tone)}
    data-selected={selected}
    className={`button-primary ${selected ? "!bg-green-500/80 !text-white" : ""}`}>
        {Icon && <Icon size={16}/>}
        {children}
    </button>
    );
}