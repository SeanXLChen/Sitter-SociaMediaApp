'use client'
import useCurrentUser from '@/app/hooks/useCurrentUser'
import useEditModal from '@/app/hooks/useEditModal'
import useUser from '@/app/hooks/useUser'
import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import Modal from '../Modal'
import Input from '../Input'

const EditModal = () => {
  const { data: currentUser } = useCurrentUser()
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id)
  const editModal = useEditModal()

  const [profileImage, setProfileImage] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    setProfileImage(currentUser?.profileImage)
    setCoverImage(currentUser?.coverImage)
    setName(currentUser?.name)
    setUsername(currentUser?.username)
    setBio(currentUser?.bio)
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage,
  ])

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      // edit user bio at database
      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        profileImage,
        coverImage
      })

      mutateFetchedUser()
      toast.success('Profile updated.')
      editModal.onClose()
    } catch (error) {
      toast.error(`Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }
  , [
    bio,
    coverImage,
    editModal,
    mutateFetchedUser,
    name,
    profileImage,
    username,
  ])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
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
        placeholder='Bio'
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit Profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}

export default EditModal