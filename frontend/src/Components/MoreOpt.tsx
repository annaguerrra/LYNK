import "./Styles/moreOpt.css";
import { useState } from "react";

interface Option {
    name: string;
    onClick: () => void;
}

interface MoreOptProps {
    data: Option[];
    size: Number;
    color?: string;
}

export function MoreOpt({ data, size }: MoreOptProps) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="moreOpt" onClick={() => setOpen(!open)}>
                <img src="/moreOpt.svg" alt="" className="optImg" style={{width: `${size}px`}} />
            </div>

            {open && (
                <div className="moreOptModal">
                    {data.map((option) => (
                        <button
                            style={{ color: option.color }}
                            key={option.name}
                            onClick={() => {
                                option.onClick();
                                setOpen(false);
                            }}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}