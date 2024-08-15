'use client'

import {useState, useCallback } from 'react'
import useLoginModal from '@/app/hooks/useLoginModal'
import Input from '@/app/components/Input'
import Modal from '../Modal'

const LoginModal = () => {
    const loginModal = useLoginModal()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

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

  return (
    <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel='Sign In'
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
    />
  )
}

export default LoginModal