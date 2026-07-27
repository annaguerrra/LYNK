import './Styles/Login.css'
import { Button } from '../Components/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext'
import { useState } from 'react'

export function Login() {
    //Variables to navigate and open modals
    const navigate = useNavigate()   
    //Variables to control the users and its interactions
    const [username, setUsername] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [newPassword, setNewPassword] = useState("");
    const [mustChangePassword, setMustChangePassword] = useState(false);

    const { login, changePassword } = useAuth();

    async function handleLogin() {
        const changePassword = await login(username, userPassword);

        if (changePassword) {
            setMustChangePassword(true);
            return;
        }

        navigate("/Disciplines");
    }

    async function handleChangePassword() {
        try {
            await changePassword(
                username,
                userPassword,
                newPassword
            );

            navigate("/Disciplines");
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            {/* Whole login page */}
            <div className="backgroundLogin">
                <div className='containerLogin'>
                    <img src="/BoschLogo.png" alt="" />
                    
                    {/* Username input */}
                    <div className='boxTexts'>
                        <h1>Usuário</h1>
                        <input className='loginInput' type="text" placeholder='Digite seu usuário:'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    
                    {/* Password input */}
                    <div className='boxTexts'>
                        <h1>Senha</h1>
                        <input className='loginInput' type="password" placeholder='Digite sua senha :'
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}/>
                    </div>

                    {mustChangePassword && (
                        <div className="boxTexts">
                            <h1>Nova senha</h1>
                            <input
                                className="loginInput"
                                type="password"
                                placeholder="Digite a nova senha"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                    )}
                    <Button ButtonTitle={"Entrar"}  onClose={mustChangePassword ? handleChangePassword : handleLogin}></Button>
                </div>
            </div>
        </>
    )
}