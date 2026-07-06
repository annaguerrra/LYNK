import './Styles/Login.css'
import { Button } from '../Components/Button'
export function Login() {

    return (
        <>
            <div className="backgroundLogin">
                <div className='containerLogin'>
                    <img src="/BoschLogo.png" alt="" />
                    <div className='boxTexts'>
                        <h1>Usuário</h1>
                        <input className='loginInput' type="text" placeholder='Digite seu usuário:'/>
                    </div>
                    <div className='boxTexts'>
                        <h1>Senha</h1>
                    <input className='loginInput' type="text" placeholder='Digite sua senha :'/>
                    </div>
                    <Button ButtonTitle={"Entrar"} path={'/Disciplines'}></Button>
                </div>
            </div>
        </>
    )
}