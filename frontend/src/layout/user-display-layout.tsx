import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useInitials } from '@/hooks/use-initials'
import { UseAuthStore } from '@/store/UseAuthStore'
import { UseFollowStore } from '@/store/UseFollowStore'
import { UsePostStore } from '@/store/UsePostStore'
import { UseUserStore } from '@/store/UseUserStore'
import { LayoutGrid, Loader, Send, UserRoundCheck, UserRoundPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

type User = {
    _id: string,
    fullname: string,
    username: String,
    profile: any,
}

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

function UserDisplayLayout() {
    const { auth, onlineUsers } = UseAuthStore()
    const { userList, users } = UseUserStore() as {
        userList: User[]
        usersCount: number
        users: any
    }
    const getInitials = useInitials()
    const [container, setContainer] = useState("")
    const { isFollowing, handleFollow, isFollowed, followings, isUnFollowing, handleUnfollow } = UseFollowStore()
    const { posts, post } = UsePostStore() as { posts: Post[], post: any }

    useEffect(() => {
        post()
    }, [post])

    useEffect(() => {
        isFollowed()
    }, [isFollowed])

    const [formData, setFormData] = useState({
        followingId: auth._id,
        followerId: ""
    })

    useEffect(() => {
        users()
    }, [users])

    const handlesubmitFollow = (e: any) => {
        e.preventDefault()

        handleFollow(formData)
    }

    const handlesubmitUnFollow = (e: any) => {
        e.preventDefault()

        handleUnfollow(formData)
    }

    return (
        <div>
            {userList.length > 0 ?
                <div className='flex flex-col gap-4'>
                    {userList.slice(0, 5).map((users: User) => (
                        <div onMouseEnter={() => setContainer(users._id)} onMouseLeave={() => setContainer("")} className={container === users._id ? 'relative flex justify-between items-center cursor-pointer bg-accent p-2 rounded-md' : 'relative flex justify-between items-center cursor-pointer p-2 rounded-md'} key={users._id}>
                            <div className='flex flex-row items-center gap-2.5'>
                                <div className='relative'>
                                    <Avatar key={users._id} className='w-8 h-8 rounded-full'>
                                        {users.profile.length > 0 ?
                                            <img src={users.profile} alt="" className='object-cover'/> :
                                            <AvatarFallback className='text-white cursor-pointer border truncate whitespace-nowrap rounded-full'>
                                                {getInitials(users.fullname)}
                                            </AvatarFallback>}
                                    </Avatar>
                                    <div className={`absolute bottom-1 right-0 w-2 h-2 rounded-full ${onlineUsers.includes(users._id) ? "bg-green-500" : "bg-neutral-700"}`}></div>
                                </div>
                                <div className='flex flex-col'>
                                    <h1 className="capitalize font-medium text-sm">{users.fullname}</h1>
                                    <span className='text-xs text-muted-foreground'>{users.username}</span>
                                </div>
                            </div>
                            <div onMouseEnter={() => setContainer(users._id)} id={`container-${users._id}`} className={`fixed ml-55 z-50 bg-neutral-900 border border-white/20 min-w-70 min-h-50 \
                                p-4 shadow-md shadow-white/20 rounded-md origin-left transition-all ease-in-out duration-300 ${container === users._id ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <Avatar key={users._id} className='w-12 h-12 rounded-full'>
                                            {users.profile.length > 0 ?
                                                <img src={users.profile} alt="" /> :
                                                <AvatarFallback className='text-white cursor-pointer border truncate whitespace-nowrap rounded-full'>
                                                    {getInitials(users.fullname)}
                                                </AvatarFallback>}
                                        </Avatar>
                                        <h1 className='text-md font-bold capitalize'>{users.fullname}</h1>
                                    </div>
                                    <div className="flex flex-row items-center justify-center sm:justify-start gap-6 sm:gap-8 p-3">
                                        <h1 className="text-sm"><span className="font-bold">130</span> <span className="text-muted-foreground">following</span></h1>
                                        <h1 className="text-sm"><span className="font-bold">1,000</span> <span className="text-muted-foreground">followers</span></h1>
                                        <h1 className="text-sm"><span className="font-bold">13K</span> <span className="text-muted-foreground">likes</span></h1>
                                    </div>
                                </div>
                                <hr className="my-2 bg-white w-full" />
                                {posts.length >= 0 && (
                                    (() => {
                                        const post = posts.filter((post: Post) => post.posterId._id === users._id)

                                        return post.length > 0 ? (
                                            <div className='flex flex-row gap-1'>
                                                {post.slice(0, 3).map((post: Post) => (
                                                    <div key={post._id}>
                                                        {post.posterId._id === users._id && <div>
                                                            <img className='min-w-25 min-h-30 max-w-20 max-h-20' src={post.petPicture} alt="" />
                                                        </div>}
                                                    </div>
                                                ))}
                                            </div>
                                        ) :
                                            <div className="flex flex-col justify-center items-center py-6">
                                                <div className="p-4 bg-neutral-800/80 rounded-full">
                                                    <LayoutGrid className="size-5 text-neutral-300" />
                                                </div>

                                                <h1 className="mt-4 text-base font-semibold text-white">
                                                    No Posts Yet
                                                </h1>

                                                <p className="mt-1 text-neutral-400 text-sm">
                                                    When they post something, it will appear here.
                                                </p>
                                            </div>
                                    })()
                                )
                                }
                                <hr className="my-2 bg-white w-full" />
                                <div className='flex flex-row gap-2 justify-center'>
                                    {followings.some(f => f.followerId === users._id) ?
                                        <form onSubmit={handlesubmitUnFollow} className='flex-1'>
                                            <Button onClick={() => setFormData({ ...formData, followerId: users._id })}
                                                className='text-white bg-[#2F2F2F] hover:bg-[#2F2F2F]/90 cursor-pointer w-full'
                                            ><Loader className={isUnFollowing ? "animate-spin" : "hidden"} /><UserRoundCheck />Following</Button>
                                        </form>
                                        :
                                        <form onSubmit={handlesubmitFollow} className='flex-1'>
                                            <Button onClick={() => setFormData({ ...formData, followerId: users._id })}
                                                className='bg-[#58C185] text-[#2F2F2F] hover:bg-[#58C185]/90 cursor-pointer w-full'
                                                disabled={isFollowing}><Loader className={isFollowing ? "animate-spin" : "hidden"} /><UserRoundPlus />Follow</Button>
                                        </form>}
                                    <Button className='cursor-pointer flex-1'><Send />Message</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> : ""}

        </div>
    )
}

export default UserDisplayLayout