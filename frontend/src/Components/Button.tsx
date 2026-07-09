import { useNavigate } from "react-router-dom";

interface ButtonProps {
    ButtonTitle: string;
    path?: string;
    onClose?: () => void;
}

export function Button({ ButtonTitle, path, onClose }: ButtonProps) {
    const navigate = useNavigate();

    return (
        <button className="backgroundButton" onClick={onClose}>
            <h1>{ButtonTitle}</h1>
        </button>
    );
}