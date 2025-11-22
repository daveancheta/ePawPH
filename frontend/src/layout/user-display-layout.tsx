import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { UseUserStore } from '@/store/UseUserStore'
import { useEffect } from 'react'

type User = {
    _id: string,
    fullname: string,
}
function UserDisplayLayout() {
    const { userList, usersCount, users } = UseUserStore() as {
        userList: User[]
        usersCount: number
        users: any
    }

    useEffect(() => {
        users()
    }, [users])

    const getInitials = useInitials()
    return (
        <div className='absolute right-5'>

            {userList.length > 0 ?
                <div className='min-w-100 min-h-130 bg-neutral-900 rounded-md p-8 py-5 flex flex-col justify-between'>
                    {userList.map((users: User) => (
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-row items-center gap-2.5'>
                                <div className='relative'>
                                    <Avatar key={users._id} className='w-15 h-15'>
                                        <AvatarFallback className='text-white cursor-pointer border'>
                                            {getInitials(users.fullname)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='absolute bottom-2 right-0 w-3 h-3 bg-green-500 rounded-full'></div>
                                </div>
                                <div className='flex flex-col'>
                                    <h1>{users.fullname}</h1>
                                    <span className='text-xs text-muted-foreground'>Sugessted for you</span>
                                </div>
                            </div>
                            <div>
                                <button className='text-[#58C185] font-medium cursor-pointer hover:text-[#58C185]/70'>Follow</button>
                            </div>
                        </div>
                    ))}
                    <div>
                        <p className='flex justify-center text-muted-foreground text-xs'>
                            {usersCount} user{usersCount > 1 ? "s" : ""} to connect with
                        </p>
                    </div>
                </div> : "0"}

        </div>
    )
}

export default UserDisplayLayout