import "./Styles/header.css"

export function Header({ user }) {
    return (
        <>
            <div className="header">
                <div className="supergraphic">
                    <img src="../../public/supergraphic.svg" alt="supergraphic bosch" />
                </div>
                <div className="bar">
                    <img src="../../public/BoschLogo.png" alt="bosch logo"></img>
                    <div className="user">
                        <div className="boxicon">
                            <i className="icon icon-user" style={{ color: "white" }}></i>
                        </div>
                    
                    {user}
                    <span>Instrutor</span>
                    </div>
                </div>
            </div>
        </>
    )
}