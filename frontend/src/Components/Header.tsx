import { useState } from "react";
import "./Styles/header.css"
import "../Pages/Styles/Modals.css"
import { useNavigate } from "react-router-dom";
import { ButtonClose } from "./ButtonClose";
import { Button } from "./Button";
import ChoosePicture from "./ChoosePicture";

export function Header({ user = null }) {
    const [openBox, setOpenBox] = useState(false);
    const [pictureModal, setPictureModal] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="header">
                <div className="supergraphic">
                    <img src="../../public/supergraphic.svg" alt="supergraphic bosch" />
                </div>
                <div className="bar">
                    <img src="../../public/BoschLogo.png"
                        alt="bosch logo"
                        onClick={() => navigate("/disciplines")}
                        style={{ cursor: "pointer"}}    
                    ></img>
                    <div className="userContainer">
                        <button className="user" onClick={() => setOpenBox(!openBox)}>
                            {/* <div className="boxicon">
                                <i className="icon icon-user" style={{ color: "white" }}></i>
                            </div> */}
                            <img className="userPicture" src="../../public/UserDefault/user-purple.png"></img>

                            <span>Instrutor</span>
                        </button>

                        {openBox &&
                            <div className="userBox">
                                <button onClick={() => setPictureModal(true)} className="textIcon">
                                    <i className="icon icon-user"></i>
                                    <span>Perfil</span>
                                </button>
                                <button className="textIcon" style={{ color: "var(--red)" }}>
                                    <i className="icon icon-logout"></i>
                                    <span>Logout</span>
                                </button>
                            </div>
                        }

                    </div>
                </div>
            </div>

            <ChoosePicture isOpen={pictureModal} onClose={() => setPictureModal(false) } onSave={() => setPictureModal(false)}/>
        </>
    )
}