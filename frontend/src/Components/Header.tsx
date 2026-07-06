import "./Styles/header.css"

export function Header() {
    return (
        <>
            <div className="header">
                <div className="supergraphic">
                    <img src="../../public/supergraphic.svg" alt="supergraphic bosch" />
                </div>
                <div className="bar">
                    <img src="../../public/BoschLogo.png" alt="bosch logo"></img>
                    <i></i>
                </div>
            </div>
        </>
    )
}