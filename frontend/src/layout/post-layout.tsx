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
import { Bell, Bookmark, Heart, History, InboxIcon, MessageCircle, MoreHorizontalIcon, Search, Share2 } from "lucide-react"
import { PostSkeleton } from "@/components/post-skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"

type Post = {
  _id: string
  posterId: posterId,
  petName: string,
  createdAt: any
  petPicture: string
}

type posterId = {
  _id: String
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
  const { posts, post, isCheckingPost, handleDeletePost, isDeletePost } = UsePostStore() as {
    post: any, posts: Post[],
    isCheckingPost: boolean, handleDeletePost: any,
    isDeletePost: boolean
  }
  const isMobile = useIsMobile()

  useEffect(() => {
    post()
  }, [post])

  const handleDelete = (postId: any) => {
    handleDeletePost(postId)
  }

  return (
    <div className="flex w-full">
      <div className="flex overflow-auto">
        <div className="flex flex-col gap-4">
          <div className={`fixed top-0 bg-neutral-900 w-full z-50 ${!isMobile && 'hidden'}`}>
            <div className="flex justify-between items-center mx-4 my-2">
              <div>
                <div className="truncate font-extrabold">
                  <span className="text-4xl fresh-green">e</span>
                  <span className="text-4xl text-white">Paw</span>
                  <span className="text-xs">PH</span>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <button><Search /></button>
                <button><Bell className="fresh-green fill-[#58C185]" /></button>
              </div>
              </div>
            <hr />
            </div>
            <div className={`flex flex-row gap-5 items-center bg-neutral-900 border p-4 px-10 rounded-md my-5 justify-center ${isMobile && 'hidden'}`}>
              <div className="flex flex-row items-center gap-2">
                <Avatar>
                  {auth.profile.length > 0 ? <img className="rounded-full object-cover" src={auth.profile} /> :
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

            {posts.length > 0 ?
              <div className={isMobile ? "flex h-full min-w-screen flex-col gap-6 rounded-xl overflow-x-hidden justify-center items-center pb-20"
                : "flex h-full flex-col gap-6 rounded-xl p-4 overflow-x-hidden"}>
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 max-w-120">
                  {isCheckingPost && <PostSkeleton />}

                  {posts.map(posts => (
                    <div key={posts._id}>
                      <div className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-row justify-between items-center px-4">
                          <div className="flex flex-row gap-2 items-center">
                            <Avatar className="w-8 h-8">
                              {posts.posterId.profile.length > 0 ? <img className="rounded-full object-cover" src={posts.posterId.profile} /> :
                                <AvatarFallback className='text-white cursor-pointer border rounded-full'>
                                  {getInitials(posts.posterId.fullname)}
                                </AvatarFallback>}
                            </Avatar>

                            <div className="flex flex-col gap-1 itesm-start">
                              <h1 className="text-sm font-bold truncate capitalize">{posts.posterId.fullname}</h1>
                              <div className="text-xs font-normal flex flex-row gap-1 items-center text-muted-foreground">
                                <History className="size-3" />
                                <span>
                                  {dayjs(posts.createdAt).fromNow() === "seconds ago" ? "Just now" : dayjs(posts.createdAt).fromNow()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <DropdownMenu modal={false}>
                              <DropdownMenuTrigger asChild>
                                <button className="cursor-pointer">
                                  <MoreHorizontalIcon className="size-5" />
                                </button  >
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-40" align="end">
                                <DropdownMenuGroup>
                                  <button className={auth._id === posts.posterId._id ? "hidden" : "w-full cursor-pointer"}>
                                    <DropdownMenuItem variant="destructive" className="cursor-pointer">
                                      Report
                                    </DropdownMenuItem>
                                  </button>
                                  <button onClick={() => handleDelete(posts._id)} className={auth._id === posts.posterId._id ? "w-full cursor-pointer" : "hidden"} disabled={isDeletePost}>
                                    <DropdownMenuItem variant="destructive" className="cursor-pointer">
                                      Delete
                                    </DropdownMenuItem>
                                  </button>

                                  <button className={auth._id === posts.posterId._id ? "w-full cursor-pointer" : "hidden"}>
                                    <DropdownMenuItem className="cursor-pointer">
                                      Edit
                                    </DropdownMenuItem>
                                  </button>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div>
                          <img className={`w-full h-full rounded-sm ${isMobile && 'rounded-none'}`} src={posts.petPicture} alt="" />
                        </div>
                        <div className="flex flex-row justify-between mx-4">
                          <div className="flex flex-row gap-6 items-center">
                            <button
                              className="flex flex-row items-center gap-1 cursor-pointer">
                              <Heart className="size-6" />
                              <span className="text-xs">1</span>
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
                          <button><Bookmark /></button>
                        </div>
                      </div>
                    </div>
                  ))}


                </div>
              </div> :
              <div className={isMobile ? "flex h-full min-w-screen flex-col gap-6 rounded-xl overflow-x-hidden justify-center items-center"
                : "flex h-full min-w-120 flex-col gap-6 rounded-xl p-4 overflow-x-hidden"}>
                <div className="flex justify-center">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <div className='mb-5 animate-bounce'>
                      <InboxIcon className="size-20" />
                    </div>
                    <h1> No posts yet — be the first to create one!</h1>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
      )
}

      export default PostLayout