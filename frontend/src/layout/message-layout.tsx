import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useInitials } from '@/hooks/use-initials'
import { UseUserStore } from '@/store/UseUserStore'
import { Send } from 'lucide-react'
import { useEffect } from 'react'

type User = {
    _id: string,
    fullname: string
}

function MessageLayout() {
    const { userList, users } = UseUserStore() as { userList: User[], users: any }
    const getInitials = useInitials()

    useEffect(() => {
        users()
    }, [users])

    return (
        <div>
            <Button className='fixed bottom-10 right-10 rounded-full cursor-pointer p-6' variant={'default'}>
                <div className='flex justify-between space-x-10'>
                    <div className='flex flex-row items-center text-md gap-1'>
                        <Send className='size-6' /> <span className='font-bold'>Messages</span>
                    </div>
                    <div className={userList.length > 0 ? "flex flex-row -gap-1" : "hidden"}>
                        {userList.slice(0, 3).map((users: User) => [
                            <Avatar key={users._id} className='rounded-full'>
                                <AvatarFallback className='text-white cursor-pointer border rounded-full'>
                                    {getInitials(users.fullname)}
                                </AvatarFallback>
                            </Avatar>
                        ])}
                    </div>
                </div>

            </Button>
        </div>
    )
}

export default MessageLayout