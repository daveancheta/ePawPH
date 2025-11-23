import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { UseUserStore } from '@/store/UseUserStore'
import { useEffect } from 'react'

type User = {
    _id: string,
    fullname: string,
}
function UserDisplayLayout() {
    const { userList, users } = UseUserStore() as {
        userList: User[]
        usersCount: number
        users: any
    }

    useEffect(() => {
        users()
    }, [users])

    const getInitials = useInitials()
    return (
        <div>
            <div className='flex items-center justify-between space-x-10 truncate mb-2'>
                <h1 className='text-sm font-medium'>Suggested for you</h1>
            </div>

            {userList.length > 0 ?
                <div className='flex flex-col gap-4'>
                    {userList.slice(0, 5).map((users: User) => (
                        <div className='flex justify-between items-center' key={users._id}>
                            <div className='flex flex-row items-center gap-2.5'>
                                <div className='relative'>
                                    <Avatar key={users._id} className='w-10 h-10 rounded-full'>
                                        <AvatarFallback className='text-white cursor-pointer border truncate whitespace-nowrap rounded-full'>
                                            {getInitials(users.fullname)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='absolute bottom-1 right-0 w-2 h-2 bg-green-500 rounded-full'></div>
                                </div>
                                <div className='flex flex-col'>
                                    <h1 className='capitalize font-medium text-sm'>{users.fullname}</h1>
                                    <span className='text-xs text-muted-foreground'>@username</span>
                                </div>
                            </div>

                        </div>
                    ))}

                </div> : ""}

        </div>
    )
}

export default UserDisplayLayout