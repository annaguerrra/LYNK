import "./Styles/moreOpt.css";
import { useState } from "react";
import { useFloating, flip, shift, offset, autoUpdate } from "@floating-ui/react";

interface Option {
    name: string;
    onClick: () => void;
    color?: string;
}

interface MoreOptProps {
    data: Option[];
    size: Number;
}

export function MoreOpt({ data, size }: MoreOptProps) {
    const [open, setOpen] = useState(false);
    const { refs, floatingStyles } = useFloating({
        placement: "bottom-end",

        whileElementsMounted: autoUpdate,

        middleware: [
            offset(5),
            flip(),
            shift(),
        ],
    });

    return (
        <div>
            <div ref={refs.setReference} className="moreOpt" onClick={() => setOpen(!open)}>
                <img src="/moreOpt.svg" alt="" className="optImg" style={{width: `${size}px`}} />
            </div>

           {open && (
                <div ref={refs.setFloating} style={floatingStyles} className="moreOptModal">
                    {data.map((option) => (
                        <button
                            key={option.name}
                            style={{ color: option.color }}
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