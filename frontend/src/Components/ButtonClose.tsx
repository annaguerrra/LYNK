import "./Styles/buttonClose.css"

interface ButtonCloseProps {
    size: number
    onClose: () => void
}

export function ButtonClose({ size, onClose }: ButtonCloseProps) {
    return (
        <>
            <button className="btnClose" onClick={() => onClose()}>
                <i className="icon icon-close" style={{ fontSize: `${size}px` }}></i>
            </button>
        </>
    )
}

 