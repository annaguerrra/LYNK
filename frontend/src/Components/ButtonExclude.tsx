import "./Styles/buttonExclude.css"

interface ButtonExcludeProps {
    ButtonTitle: string;
    onClose: () => void
}

export function ButtonExclude({ ButtonTitle, onClose }: ButtonExcludeProps) {
    return (
        <button className="backgroundExclude  Button" onClick={onClose}>
            <h1>{ButtonTitle}</h1>
        </button>
    );
}

 