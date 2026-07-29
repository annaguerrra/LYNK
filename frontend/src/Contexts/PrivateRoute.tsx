import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface Props {
    children: React.ReactNode;
}

export function PrivateRoute({ children }: Props) {

    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
}