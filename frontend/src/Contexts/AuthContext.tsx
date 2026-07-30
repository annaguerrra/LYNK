import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import api from "../Services/api";

type Role = "ADMIN" | "INSTRUCTOR" | "STUDENT";

interface User {
    username: string;
    userId: number;
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
        repeatPassword: string
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

        localStorage.setItem("token", token);

        localStorage.setItem("user", JSON.stringify({
            username: user.username,
            userId: user.id,
            role: user.userType
        }));

        setUser({
            username: user.username,
            userId: user.id,
            role: user.userType,
            token: token,
            mustChangePassword
        });

        return mustChangePassword;
    }

    async function changePassword(
        oldPassword: string,
        newPassword: string,
        repeatPassword: string
    ) {
        await api.put("/user/change-password", {
            oldPassword,
            newPassword,
            repeatPassword
        });
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
    }


    useEffect(() => {
        const interceptor = api.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401) {
                    logout();
                }

                return Promise.reject(error);
            }
        );

        return () => api.interceptors.response.eject(interceptor);
    }, []);




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