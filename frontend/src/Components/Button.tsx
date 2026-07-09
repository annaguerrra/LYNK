import "./Styles/button.css"

interface ButtonProps {
    ButtonTitle: string;
    onClose?: () => void;
}

export function Button({ ButtonTitle, onClose }: ButtonProps) {

    return (
        <button className="backgroundButton" onClick={onClose}>
            <h1>{ButtonTitle}</h1>
        </button>
    );
}