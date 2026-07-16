import "./Styles/buttonBack.css"

export function ButtonBack({ onClick = () => {} }) {
    return (
        <>
            <button className="btnBack" onClick={ () => onClick() }>
                <i className="icon icon-left"></i>
            </button>
        </>
    )
}