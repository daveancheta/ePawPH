import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useInitials } from '@/hooks/use-initials'
import { UseMessageStore } from '@/store/UseMessageStore'
import { UseUserStore } from '@/store/UseUserStore'
import { Send, X } from 'lucide-react'
import { useEffect, useState } from 'react'
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

type User = {
    _id: string,
    fullname: string,
    profile: any,
}

function MessageLayout() {
    const { userList, users } = UseUserStore() as { userList: User[], users: any }
    const { getChats, chats, setSelectedUser, selectedUser } = UseMessageStore()
    const { onlineUsers } = UseAuthStore()
    const getInitials = useInitials()
    const [chatContainer, setChatContiner] = useState("")

    useEffect(() => {
        users()
    }, [users])

    useEffect(() => {
        getChats()
    }, [getChats])

    return (
        <div>
            <div className='relative'>
                <Button onClick={() => setChatContiner("open")} className='fixed bottom-10 right-10 rounded-full cursor-pointer p-6' variant={'default'}>
                    <div className='flex justify-between space-x-10'>
                        <div className='flex flex-row items-center text-md gap-1'>
                            <Send className='size-6' /> <span className='font-bold'>Messages</span>
                        </div>
                        <div className={userList.length > 0 ? "flex flex-row -gap-1" : "hidden"}>
                            {userList.slice(0, 3).map((users: User) => [
                                <Avatar key={users._id} className='rounded-full'>

                                    {users.profile.length > 0 ?
                                        <img src={users.profile} alt="" /> :
                                        <AvatarFallback className='text-white cursor-pointer border rounded-full'>
                                            {getInitials(users.fullname)}
                                        </AvatarFallback>}

                                </Avatar>
                            ])}
                        </div>
                    </div>

                </Button>

                <div
                    className={`fixed bottom-10 right-10 rounded-sm cursor-pointer min-h-130 min-w-100 bg-neutral-950 border 
                origin-bottom-right transition-all duration-300 
                ${chatContainer === "open" ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} hidden={selectedUser}>
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
                            <button onClick={() => setChatContiner("")}>
                                <X />
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

export default MessageLayout