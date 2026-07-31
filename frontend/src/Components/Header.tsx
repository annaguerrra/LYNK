import { useState } from "react";
import "./Styles/header.css"
import "../Pages/Styles/Modals.css"
import { useNavigate } from "react-router-dom";
import ChoosePicture from "./ChoosePicture";
import { useAuth } from "../Contexts/AuthContext";

export function Header() {
    
    //Variables to open the edit/logout modals and navigate throught pages
    const [openBox, setOpenBox] = useState(false);
    const [pictureModal, setPictureModal] = useState(false);
    const navigate = useNavigate();

    const { logout } = useAuth();
    const {user} = useAuth()

    return (
        <>
            {/* Header full container */}
            <div className="header">
                {/* Bosch colorful bar */}
                <div className="supergraphic">
                    <img src="../../public/supergraphic.svg" alt="supergraphic bosch" />
                </div>
                {/* Bosch logo */} 
                <div className="bar">
                    <img src="../../public/BoschLogo.png"
                        alt="bosch logo"
                        onClick={() => navigate("/disciplines")}
                        style={{ cursor: "pointer"}}    
                    ></img>
                    {/* User profile */}
                    <div className="userContainer">
                        <button className="user" onClick={() => setOpenBox(!openBox)}>
                            <img className="userPicture" src="../../public/UserDefault/user-purple.png"></img>

                            <span>{user.username}</span>
                        </button>

                        {/* Modal to edit profile or logout */}
                        {openBox &&
                            <div className="userBox">
                                {/* <button onClick={() => setPictureModal(true)} className="textIcon">
                                    <i className="icon icon-user"></i>
                                    <span>Trocar foto</span>
                                </button> */}
                                <button className="textIcon" style={{ color: "var(--red)" }} onClick={() => logout()}>
                                    <i className="icon icon-logout"></i>
                                    <span>Logout</span>
                                </button>
                            </div>
                        }

                    </div>
                </div>
            </div>
            
            {/* Modal to cut the image for profile */}
            <ChoosePicture isOpen={pictureModal} onClose={() => setPictureModal(false) } onSave={() => setPictureModal(false)}/>
        </>
    )
}