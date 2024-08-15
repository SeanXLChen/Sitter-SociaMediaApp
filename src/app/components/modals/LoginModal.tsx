'use client'

import {useState, useCallback } from 'react'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Input from '@/app/components/Input'
import Modal from '../Modal'

const LoginModal = () => {
    const loginModal = useLoginModal() // import login state
    const registerModal = useRegisterModal()  // import register state

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onToggle = useCallback(() => {
        // if loading, do not allow toggle
        if (isLoading) {
            return;
        }

        console.log('login toggle')

        // close login modal & open register modal
        loginModal.onClose()
        registerModal.onOpen()
    }
    , [isLoading, loginModal, registerModal])

    const onSubmit = useCallback( async () => {
        try {
            setIsLoading(true)
            
            // TODO - login user

            loginModal.onClose()
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }, [loginModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input 
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
            <p>First time using Twitter?</p>
            <span onClick={onToggle} className='text-white cursor-pointer hover:underline'>Create an account</span>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel='Sign In'
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModal