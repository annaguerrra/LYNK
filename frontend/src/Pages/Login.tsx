import './Styles/Login.css'
import { Button } from '../Components/Button'
import { useNavigate } from 'react-router-dom'

export function Login() {
    //Variables to navigate and open modals
    const navigate = useNavigate()    

    return (
        <>
            {/* Whole login page */}
            <div className="backgroundLogin">
                <div className='containerLogin'>
                    <img src="/BoschLogo.png" alt="" />
                    
                    {/* Username input */}
                    <div className='boxTexts'>
                        <h1>Usuário</h1>
                        <input className='loginInput' type="text" placeholder='Digite seu usuário:'/>
                    </div>
                    
                    {/* Password input */}
                    <div className='boxTexts'>
                        <h1>Senha</h1>
                    <input className='loginInput' type="text" placeholder='Digite sua senha :'/>
                    </div>
                    <Button ButtonTitle={"Entrar"} onClose={() => navigate('/Disciplines')}></Button>
                </div>
            </div>
        </>
    )
}