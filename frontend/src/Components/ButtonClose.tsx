import "./Styles/buttonClose.css"

export function ButtonClose({ size }) {
    return (
        <>
            <button className="btnClose">
                <i className="icon icon-close" style={{ fontSize: `${size}px` }}></i>
            </button>
        </>
    )
}