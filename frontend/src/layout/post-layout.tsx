import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useInitials } from "@/hooks/use-initials"
import { UseAuthStore } from "@/store/UseAuthStore"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from "react-router-dom"
import { UsePostStore } from "@/store/UsePostStore"
import { useEffect } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { Heart, History, MessageCircle, Share2 } from "lucide-react"
import { PostSkeleton } from "@/components/post-skeleton"

type Post = {
  _id: string
  posterId: posterId,
  petName: string,
  createdAt: any
  petPicture: string
}

type posterId = {
  fullname: string,
  posterId: string
  profile: string,
}

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "seconds",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years"
  }
});

function PostLayout() {
  const { auth } = UseAuthStore()
  const getInitials = useInitials()
  const { posts, post, isCheckingPost } = UsePostStore() as { post: any, posts: Post[], isCheckingPost: boolean }

  useEffect(() => {
    post()
  }, [post])

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-row gap-5 items-center bg-neutral-900 border p-4 px-10 rounded-md">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              {auth.profile.length > 0 ? <img className="rounded-full" src={auth.profile} /> :
                <AvatarFallback className='text-white cursor-pointer border rounded-full'>
                  {getInitials(auth.fullname)}
                </AvatarFallback>}
            </Avatar>
          </div>
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

        <div className="flex h-full flex-col gap-6 rounded-xl p-4 overflow-x-hidden">
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 max-w-120">
            {isCheckingPost && <PostSkeleton />}

            {posts.map((posts) => (
              <div key={posts._id}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-2 items-center">
                    <Avatar className="w-8 h-8">
                      {posts.posterId.profile.length > 0 ? <img className="rounded-full" src={posts.posterId.profile} /> :
                        <AvatarFallback className='text-white cursor-pointer border rounded-full'>
                          {getInitials(posts.posterId.fullname)}
                        </AvatarFallback>}
                    </Avatar>

                    <div className="flex flex-col gap-1 itesm-start">
                      <h1 className="text-sm font-bold truncate capitalize">{posts.posterId.fullname}</h1>
                      <span className="text-xs font-normal flex flex-row gap-1 items-center text-muted-foreground">
                        <History className="size-3" />
                        {dayjs(posts.createdAt).fromNow() === "seconds ago" ? "Just now" : dayjs(posts.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <img className="w-full h-full rounded-sm" src={posts.petPicture} alt="" />
                  </div>
                  <div className="flex flex-row mx-2 gap-6 items-center">
                    <button
                      className="flex flex-row items-center gap-1 cursor-pointer">
                      <Heart className="size-6" />
                      <span className="text-xs">0</span>
                    </button>
                    <button
                      className="flex flex-row items-center gap-1 cursor-pointer">
                      <MessageCircle className="size-5" />
                      <span className="text-xs">0</span>
                    </button>
                    <button
                      className="flex flex-row items-center gap-1 cursor-pointer">
                      <Share2 className="size-5" />
                      <span className="text-xs">0</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostLayout