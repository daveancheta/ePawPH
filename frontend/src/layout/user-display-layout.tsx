import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useInitials } from '@/hooks/use-initials'
import { UseAuthStore } from '@/store/UseAuthStore'
import { UseFollowStore } from '@/store/UseFollowStore'
import { UseUserStore } from '@/store/UseUserStore'
import { Loader, Send, UserRoundPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

type User = {
    _id: string,
    fullname: string,
    username: String,
    profile: any,
}
function UserDisplayLayout() {
    const { auth } = UseAuthStore()
    const { userList, users } = UseUserStore() as {
        userList: User[]
        usersCount: number
        users: any
    }
    const getInitials = useInitials()
    const [container, setContainer] = useState("")
    const { isFollowing, handleFollow } = UseFollowStore() as { isFollowing: any, handleFollow: any }
    const [formData, setFormData] = useState({
        followingId: auth._id,
        followerId: ""
    })

    useEffect(() => {
        users()
    }, [users])

    const handleOpenContainer = (id: any) => {
        setContainer(id)
    }

    const handlesubmitFollow = (e: any) => {
        e.preventDefault()

        handleFollow(formData)
    }

    return (
        <div>
            {userList.length > 0 ?
                <div className='flex flex-col gap-4'>
                    {userList.slice(0, 5).map((users: User) => (
                        <div onMouseOver={() => handleOpenContainer(users._id)} className='relative flex justify-between items-center cursor-pointer' key={users._id}>
                            <div className='flex flex-row items-center gap-2.5'>
                                <div className='relative'>
                                    <Avatar key={users._id} className='w-8 h-8 rounded-full'>
                                        {users.profile.length > 0 ?
                                            <img src={users.profile} alt="" /> :
                                            <AvatarFallback className='text-white cursor-pointer border truncate whitespace-nowrap rounded-full'>
                                                {getInitials(users.fullname)}
                                            </AvatarFallback>}
                                    </Avatar>
                                    <div className='absolute bottom-1 right-0 w-2 h-2 bg-green-500 rounded-full'></div>
                                </div>
                                <div className='flex flex-col'>
                                    <h1 className='capitalize font-medium text-sm'>{users.fullname}</h1>
                                    <span className='text-xs text-muted-foreground'>{users.username}</span>
                                </div>
                            </div>
                            <div className={container === users._id ? 'fixed left-50 bg-neutral-900 border border-white/20 min-w-70 min-h-50 p-4 shadow-md shadow-white/20 rounded-md' : "hidden"}>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <Avatar key={users._id} className='w-12 h-12 rounded-full'>
                                            {users.profile.length > 0 ?
                                                <img src={users.profile} alt="" /> :
                                                <AvatarFallback className='text-white cursor-pointer border truncate whitespace-nowrap rounded-full'>
                                                    {getInitials(users.fullname)}
                                                </AvatarFallback>}
                                        </Avatar>
                                        <h1>{users.fullname}</h1>
                                    </div>
                                    <div className="flex flex-row items-center justify-center sm:justify-start gap-6 sm:gap-8 p-3">
                                        <h1 className="text-sm"><span className="font-bold">130</span> <span className="text-muted-foreground">following</span></h1>
                                        <h1 className="text-sm"><span className="font-bold">1,000</span> <span className="text-muted-foreground">followers</span></h1>
                                        <h1 className="text-sm"><span className="font-bold">13K</span> <span className="text-muted-foreground">likes</span></h1>
                                    </div>
                                </div>
                                <hr className="my-2 bg-white w-full" />

                                <hr className="my-2 bg-white w-full" />
                                <div className='flex flex-row gap-2 justify-center'>
                                    <form onSubmit={handlesubmitFollow} className='flex-1'>
                                        <Button onClick={() => setFormData({ ...formData, followerId: users._id })}
                                            className='bg-[#58C185] text-[#2F2F2F] hover:bg-[#58C185]/90 cursor-pointer w-full'
                                            disabled={isFollowing}><Loader className={isFollowing ? "" : "hidden"} /><UserRoundPlus />Follow</Button>
                                    </form>
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