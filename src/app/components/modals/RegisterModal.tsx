'use client'

import { useState, useCallback } from 'react'
import useregisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Input from '@/app/components/Input'
import Modal from '../Modal'

const registerModal = () => {
    const registerModal = useregisterModal()
    const loginModal = useLoginModal()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onToggle = useCallback(() => {
        // if loading, do not allow toggle
        if (isLoading) {
            return;
        }

        // close register modal
        registerModal.onClose()
        loginModal.onOpen()
    }
    , [isLoading, loginModal, registerModal])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            // TODO - Add register and login

            registerModal.onClose()
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }, [registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p>Already have an account?</p>
            <span className='text-white cursor-pointer hover:underline'>Sign in</span>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Create an Account"
            actionLabel='Register'
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default registerModal