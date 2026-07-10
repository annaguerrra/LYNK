import { createContext, useContext, useEffect, useState } from "react";

interface ModalContextType {
    modal: boolean;
    openModal: () => void;
    closeModal: () => void;
    toggleModal: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }) {
    const [modal, setModal] = useState(false);

    const openModal = () => setModal(true);
    const closeModal = () => {setModal(false), console.trace("CLOSE")};
    const toggleModal = () => setModal(prev => !prev);

    useEffect(() => {
        console.log(modal)
    }, [modal])

    return (
        <ModalContext.Provider
            value={{
                modal,
                openModal,
                closeModal,
                toggleModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    return useContext(ModalContext);
}