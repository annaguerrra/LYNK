import './Styles/Login.css'
import { Button } from '../Components/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'
import { useState } from 'react'
import { toast } from 'react-toastify';

export function Login() {
    //Variables to navigate and open modals
    const navigate = useNavigate()
    //Variables to control the users and its interactions
    const [username, setUsername] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mustChangePassword, setMustChangePassword] = useState(false);

    //Declaring all the alerts
    const notifySucess = () => toast.success("Usuário logado com sucesso!");
    const notifyServer = () => toast.error("Erro interno. Tente novamente.");
    const notifyNull = () => toast.warning("Campos vazios ou inválidos.");
    const notifyInvalidLogin = () => toast.error("Usuário ou senha inválidos.");
    // const notifyDifferentPassword = () => toast.error("As senhas não coincidem.");
    // const notifySamePassword = () => toast.error("A nova senha não pode ser igual à senha atual.");


    const { login, changePassword } = useAuth();

    async function handleLogin() {

        if (!username || !userPassword) {
            notifyNull();
            return;
        }

        try {
            const changePassword = await login(username, userPassword);

            if (changePassword) {
                setMustChangePassword(true);
                toast.warning("Sua senha precisa ser redefinida para continuar.")
                return;
            }

            notifySucess();
            navigate("/Disciplines");
        } catch (error: any) {
            if (error.response?.status === 404) {
                notifyInvalidLogin();
            } else {
                notifyServer();
            }
            // setUsername("");
            // setUserPassword("");
        }

    }

    async function handleChangePassword() {
        try {
            await changePassword(
                userPassword,
                newPassword,
                confirmPassword
            );

            toast.success("Senha redefinida com sucesso!")

            setMustChangePassword(false);

            setUsername("");
            setUserPassword("");
        } catch (error) {
            console.log(error.response)
            // arruma aqui para disparar a mensagem correta
            notifyServer()
            
        }
    }


    return (
        <form onSubmit={(e) => {
            e.preventDefault();

            if (mustChangePassword) {
                handleChangePassword();
            } else {
                handleLogin();
            }
        }}>
            {/* Whole login page */}
            <div className="backgroundLogin">
                <div className='containerLogin'>
                    <img src="/BoschLogo.png" alt="" />

                    {/* Username input */}
                    <div className='boxTexts'>
                        <h1>Usuário</h1>
                        <input className='loginInput' type="text" placeholder='Digite seu usuário:'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    {/* Password input */}
                    <div className='boxTexts'>
                        <h1>Senha</h1>
                        <input className='loginInput' type="password" placeholder='Digite sua senha :'
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)} />
                    </div>

                    {mustChangePassword && (
                        <>
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

                            <div className="boxTexts">
                                <h1>Repita sua senha</h1>
                                <input
                                    className="loginInput"
                                    type="password"
                                    placeholder="Digite a nova senha"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                    <Button Type='submit' ButtonTitle={"Entrar"}></Button>
                </div>
            </div>
        </form>
    )
}