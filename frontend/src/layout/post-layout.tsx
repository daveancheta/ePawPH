import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useInitials } from "@/hooks/use-initials"
import { UseAuthStore } from "@/store/UseAuthStore"

function PostLayout() {
  const { authUser } = UseAuthStore()
  const getInitials = useInitials()

  return (
    <div className="flex justify-start items-center">
      <div className="flex flex-row items-center gap-4 bg-neutral-900 p-4 px-10 rounded-md">
        <Avatar>
          <AvatarFallback className='text-white cursor-pointer border'>
            {getInitials(authUser.fullname)}
            </AvatarFallback>
        </Avatar>
        <Button className="" variant={'outline'}>Create Pet Post</Button>
      </div>
    </div>
  )
}

export default PostLayout