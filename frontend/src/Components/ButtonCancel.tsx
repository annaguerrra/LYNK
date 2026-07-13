import "./Styles/buttonExclude.css"

interface ButtonCancelProps {
    ButtonTitle: string;
    onClose: () => void
}

export function ButtonCancel({ ButtonTitle, onClose }: ButtonCancelProps) {
    return (
        <button className="backgroundCancelButton" onClick={onClose}>
            <h1>{ButtonTitle}</h1>
        </button>
    );
}

 