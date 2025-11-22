import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useInitials } from "@/hooks/use-initials"
import { UseAuthStore } from "@/store/UseAuthStore"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from "react-router-dom"

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
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button className="text-muted-foreground cursor-pointer" variant='outline'>Create Pet Post</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Pet Status</DialogTitle>
                <DialogDescription>
                  We hope you find our platform helpful for your pet-related concerns.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Link to={'/lost'} className="bg-red-200 text-red-800 
                  hover:bg-red-300 hover:text-red-900 
                  font-bold text-center p-2 rounded-md cursor-pointer">Lost</Link>
                </div>
                <div className="grid gap-3">
                     <Link to={'/adaption'} className="bg-yellow-100 text-yellow-800 
                  hover:bg-yellow-200 hover:text-yellow-900 
                  font-bold text-center p-2 rounded-md cursor-pointer">Adaption</Link>
                </div>
                <div className="grid gap-3">
                   <Link to={'/found'} className="bg-green-100 text-green-800 
                  hover:bg-green-200 hover:text-green-900 
                  font-bold text-center p-2 rounded-md cursor-pointer">Found</Link>
                </div>
              </div>
            </DialogContent>
          </form>
        </Dialog>

      </div>
    </div>
  )
}

export default PostLayout