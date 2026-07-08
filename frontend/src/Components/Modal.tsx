import "./Styles/modal.css"

export function Modal({ onClose }) {
    return (
        <>
            <div className="modalOverlay" onClick={() => onClose}>
                <div className="modalBackdrop">

                </div>
            </div>
        </>
    )
}