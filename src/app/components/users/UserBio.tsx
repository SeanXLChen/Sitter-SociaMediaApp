import useUser from "@/app/hooks/useUser"
import useCurrentUser from "@/app/hooks/useCurrentUser"

interface UserBioProps {
  userId: string
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser()
  const { data: fetchedUser } = useUser(userId)
  
  return (
    <div>UserBio</div>
  )
}

export default UserBio