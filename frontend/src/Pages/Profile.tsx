import { Header } from "../Components/Header";

interface User {
    name: string;
    photo: string;
}

// ISSO AQUI FOI GERADO SÓ PARA TESTE, MAS EU ACHO QUE NÃO VAMOS USAR
// NÃO SEI SE TEM NECESSIDADE DE FAZER UMA TELA DE PROFILE SÓ PRA MOSTRAR 
// NOME E FOTO KKK

export function Profile() {
    const user: User = {
        name: "João Silva",
        photo: "https://i.pravatar.cc/150?img=12"
    };

    return (
        <>
            <Header />
            <div className="userPage">
                <img
                    className="userPhoto"
                    src={user.photo}
                    alt={`Foto de ${user.name}`}
                />

                <h1 className="userName">
                    {user.name}
                </h1>
            </div>
        </>
    );
}