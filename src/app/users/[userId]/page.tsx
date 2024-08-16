'use client'
import useUser from '@/app/hooks/useUser'
import { ClipLoader } from 'react-spinners'

import UserHero from '@/app/components/users/UserHero'
import UserBio from '@/app/components/users/UserBio'

const UserView = ({ params, }: { params: { userId: string } }) => {

  const { data: fetchedUser, isLoading } = useUser(params.userId)

  if (isLoading || !fetchedUser) {
    return (
      <div className='
        flex
        justify-center
        items-center
        h-full
      '>
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return (
    <>
      <UserHero userId={params.userId} />
      <UserBio userId={params.userId} />
    </>
  )
}

export default UserView