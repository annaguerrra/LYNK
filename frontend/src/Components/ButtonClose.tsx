import "./Styles/buttonClose.css"

export function ButtonClose({ size, onClick }) {
    return (
        <>
            <button className="btnClose" onClick={onClick()}>
                <i className="icon icon-close" style={{ fontSize: `${size}px` }}></i>
            </button>
        </>
    )
}

 