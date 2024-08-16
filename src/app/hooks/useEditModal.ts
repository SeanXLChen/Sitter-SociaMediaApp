import { create } from 'zustand'

interface EditModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useEditModal = create<EditModalStore>((set) => ({
    isOpen: false,
    onOpen: () => {
        // console.log('login modal open')
        set({ isOpen: true })
    },
    onClose: () => {
        // console.log('login modal close')
        set({ isOpen: false })
    }
}))

export default useEditModal