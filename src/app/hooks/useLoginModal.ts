import { create } from 'zustand'

interface LoginModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
    isOpen: true,
    onOpen: () => {
        console.log('login modal open')
        set({ isOpen: true })
    },
    onClose: () => {
        console.log('login modal close')
        set({ isOpen: false })
    }
}))

export default useLoginModal