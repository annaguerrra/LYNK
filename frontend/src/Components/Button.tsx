import "./Styles/button.css"

interface ButtonProps {
    ButtonTitle: string;
    Type?: "button" | "submit" | null;
    onClose?: () => void;
}

export function Button({ ButtonTitle, Type = "button", onClose }: ButtonProps) {

    return (
        <button type={Type} className="backgroundButton" onClick={onClose}>
            <h1>{ButtonTitle}</h1>
        </button>
    );
}