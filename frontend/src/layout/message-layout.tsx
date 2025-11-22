import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useInitials } from '@/hooks/use-initials'
import { UseAuthStore } from '@/store/UseAuthStore'
import { Send } from 'lucide-react'
import React from 'react'

function MessageLayout() {
    const { authUser } = UseAuthStore()
    const getInitials = useInitials()

    return (
        <div>
            <Button className='fixed bottom-10 right-10 rounded-full cursor-pointer p-6' variant={'default'}>
                <div className='flex justify-between space-x-10'>
                <div className='flex flex-row items-center text-md gap-1'>
                <Send className='size-6'/> <span className='font-bold'>Messages</span>
                </div>
                <div className='flex flex-row -gap-1'>
                {[1, 2, 3].map((item) => [
                    <Avatar key={item}>
                        <AvatarFallback className='text-white cursor-pointer border'>
                            {getInitials(authUser.fullname)}
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