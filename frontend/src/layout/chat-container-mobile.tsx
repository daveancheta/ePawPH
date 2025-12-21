import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useInitials } from '@/hooks/use-initials'
import { UseMessageStore } from '@/store/UseMessageStore'
import { UseUserStore } from '@/store/UseUserStore'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import ChatContainer from './chat-container'
import { UseAuthStore } from '@/store/UseAuthStore'
import { MoreHorizontalIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from 'react-router-dom'

function MessageMobile() {
    const { users } = UseUserStore() as { users: any }
    const { getChats, chats, setSelectedUser, selectedUser, chatContainer, setChatContainer } = UseMessageStore()
    const { onlineUsers } = UseAuthStore()
    const getInitials = useInitials()

    useEffect(() => {
        users()
    }, [users])

    useEffect(() => {
        getChats()
    }, [getChats])

    useEffect(() => {
        chatContainer === "open" ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
    })

    return (
        <div>
            <div className='relative'>
                <div
                    className={`fixed rounded-sm cursor-pointer bg-neutral-950 border 
                 transition-all duration-300  min-h-screen min-w-screen z-50 top-0 right-0
                opacity-100 scale-100`} hidden={selectedUser}>
                    <div className='flex justify-between items-center py-4 px-6 '>
                        <h1 className='font-bold'>Messages</h1>
                        <div className='flex flex-row items-center'>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className='cursor-pointer' variant="ghost" aria-label="Open menu" size="icon-sm">
                                            <MoreHorizontalIcon />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-40" align="end">
                                        <DropdownMenuLabel>Chat Settings</DropdownMenuLabel>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                Message Requet
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Archive
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu></div>
                            <button onClick={() => setChatContainer("")}>
                                <Link to={'/'}>
                                <X />
                                </Link>
                            </button>
                        </div>

                    </div>
                    <hr />
                    <div className='flex flex-col gap-0'>
                        {chats.map((chats: any) => (
                            <div
                                className='flex flex-row gap-2 items-center cursor-pointer hover:bg-accent transition-all duration-200 ease-in-out py-3 px-6'
                                key={chats._id}
                                onClick={() =>
                                    setSelectedUser(chats)
                                }>
                                <div className='relative'>
                                    <Avatar className="w-15 h-15">
                                        {chats.followerId.profile?.length > 0 ? (
                                            <img className="rounded-full object-cover" src={chats.followerId.profile} />
                                        ) : (
                                            <AvatarFallback className="text-white cursor-pointer border rounded-full">
                                                {getInitials(chats.followerId.fullname)}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div className={`absolute bottom-1 right-0 w-3 h-3 rounded-full ${onlineUsers.includes(chats.followerId._id) ? "bg-green-500" : "bg-neutral-700"}`}></div>
                                </div>
                                <h1 className='capitalize'>{chats.followerId.fullname}</h1>

                            </div>
                        ))}
                    </div>
                </div>

                {selectedUser &&
                    <ChatContainer />}
            </div>
        </div>
    )
}

export default MessageMobile