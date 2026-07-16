import "./Styles/moreOpt.css";
import { useState } from "react";

interface Option {
    name: string;
    onClick: () => void;
}

interface MoreOptProps {
    data: Option[];
}

export function MoreOpt({ data }: MoreOptProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="moreOpt">
            <div onClick={() => setOpen(!open)}>
                <img src="/moreOpt.svg" alt="" className="optImg" style={{paddingTop: 0}}/>
            </div>

            {open && (
                <div className="moreOptModal">
                    {data.map((option) => (
                        <button
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