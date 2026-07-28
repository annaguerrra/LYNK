import {
    createContext,
    useContext,
    useState
} from "react";
import api from "../Services/api";

type Role = "ADMIN" | "INSTRUCTOR" | "STUDENT";

interface User {
    username: string;
    profilePic: string;
    role: Role;
    token: string;
    mustChangePassword: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    changePassword: (
        oldPassword: string,
        newPassword: string,
        confirmPassword: string
    ) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [user, setUser] = useState<User | null>(() => {
        const token = localStorage.getItem("token");

        if (!token) return null;

        return JSON.parse(localStorage.getItem("user")!);
    });

    async function login(username: string, password: string) {

        const response = await api.post("/login", {
            username,
            password
        });

        const { token, mustChangePassword, user } = response.data.response;

        console.log(response.data.response)

        localStorage.setItem("token", token);

        localStorage.setItem("user", JSON.stringify({
            username: user.username,
            // profilePic: user.photo,
            role: user.userType
        }));

        setUser({
            username: user.username,
            profilePic: user.photo,
            role: user.userType,
            token: token,
            mustChangePassword
        });

        return mustChangePassword;
    }

    async function changePassword(
        oldPassword: string,
        newPassword: string,
        confirmPassword: string
    ) {
        await api.post("/user/change-password", {
            oldPassword,
            newPassword,
            confirmPassword
        });
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                changePassword,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth deve ser usado dentro de AuthProvider"
        );
    }

    return context;
}