import { format } from "date-fns"
import { useMemo } from "react"
import useUser from "@/app/hooks/useUser"
import useCurrentUser from "@/app/hooks/useCurrentUser"

import Button from "../Button"


interface UserBioProps {
  userId: string
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser()
  const { data: fetchedUser } = useUser(userId)

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy")
  }, [fetchedUser?.createdAt])

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        
        {/* if user is current user, can edit profile, otherwise, can follow */}
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={() => { }} />
        ) : (
          <Button secondary label="Follow" onClick={() => { }} />
        )}

      </div>
    </div>
  )
}

export default UserBio