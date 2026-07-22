import { createContext, useContext } from 'react';
// import { Role } from './permissions';

interface User {
    id: string;
    username: string;
    //   role: Role;
}

const AuthContext = createContext<User | null>(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);

    if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
    
    return ctx;
};

export const AuthProvider = AuthContext.Provider;