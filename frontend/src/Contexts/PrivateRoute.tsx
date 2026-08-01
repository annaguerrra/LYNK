import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface PrivateRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

export function PrivateRoute({
    children,
    allowedRoles,
}: PrivateRouteProps) {

    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {
        return (
            <Navigate to="*" />
        );
    }

    return children;
}