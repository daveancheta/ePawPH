import { Avatar } from '@/components/ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { UseAuthStore } from '@/store/UseAuthStore'
import { UseMessageStore } from '@/store/UseMessageStore'
import { AvatarFallback } from '@radix-ui/react-avatar'
import dayjs from 'dayjs'
import { Heart, History, MessageCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { ChatInput } from './chat-input'
import { MessageSkeleton } from '@/components/message-skeleton'
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"


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

function ChatContainer() {
    const { setSelectedUser, selectedUser, getConversation,
        conversation, isLoadingMessages } = UseMessageStore() as {
            setSelectedUser: any,
            getConversation: any, conversation: any, selectedUser: any,
            isLoadingMessages: any
        }
    const { auth, onlineUsers } = UseAuthStore()
    const getInitials = useInitials()
    const messageRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        getConversation(selectedUser?.followerId?._id)
    }, [getConversation])

    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: "smooth" })
        }
    })


    return (
        <div className="fixed bottom-10 right-10 rounded-sm min-h-160 max-h-160 min-w-120 max-w-120 bg-neutral-950 border origin-bottom-right transition-all duration-300 flex flex-col select-none">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="">
                    <div className='mt-5'>
                        <img src={previewImage} alt="" />
                    </div>
                </DialogContent>
            </Dialog>
            <div className="flex justify-between items-center py-4 px-6">
                <div className="flex flex-row items-center gap-2">
                    <Avatar className="w-15 h-15">
                        {selectedUser.followerId.profile?.length > 0 ? (
                            <img className="rounded-full object-cover" src={selectedUser.followerId.profile} />
                        ) : (
                            <AvatarFallback className="text-white cursor-pointer border rounded-full w-15 h-15 flex items-center justify-center">
                                {getInitials(selectedUser.followerId.fullname)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div className='flex flex-col'>
                        <h1 className="font-bold capitalize">{selectedUser?.followerId.fullname}</h1>
                        <div className='flex flex-row items-center gap-1'>
                            <div className={`w-2 h-2 rounded-full ${onlineUsers.includes(selectedUser.followerId._id) ? "bg-green-500" : "bg-neutral-700"}`}></div>
                            <span className='text-muted-foreground text-xs'>{onlineUsers.includes(selectedUser.followerId._id) ? "Online" : "Offline"}</span>
                        </div>
                    </div>
                </div>

                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>

            <hr />

            {isLoadingMessages ? <MessageSkeleton /> :
                conversation.length > 0 ? (<div className="flex-1 overflow-auto scrollbar-hide px-4 py-2 gap-6 flex flex-col">
                    {conversation.map((convo: any) => (
                        <div
                            key={convo._id}
                            className={`flex w-full ${auth._id === convo.senderId ? "justify-end" : "justify-start"}`}
                        >
                            <div className="relative">
                                <div
                                    className={`${auth._id === convo.senderId
                                        ? `${convo.text === "heart" ? "" : "bg-[#58C185] text-[#2F2F2F]"}`
                                        : `${convo.text === "heart" ? "" : "bg-gray-700 text-white]"}`
                                        } rounded-xl px-4 py-2 max-w-xs wrap-break-word`}
                                >
                                    {convo.image &&
                                        <button className='cursor-pointer' onClick={() => {
                                            setOpen(true)
                                            setPreviewImage(convo.image)
                                        }}>
                                            <img className='rounded-sm' src={convo.image} />
                                        </button>
                                    }

                                    {convo.text === "heart" ?
                                        <Heart className="fill-red-400 text-red-400 size-8" /> :
                                        convo.text}
                                </div>

                                <p
                                    className={`text-xs text-muted-foreground absolute flex flex-row gap-1 items-center mt-1 truncate ${auth._id === convo.senderId ? "right-2" : "left-2"
                                        }`}
                                >
                                    <History className="size-3" />
                                    <span>
                                        {dayjs(convo.createdAt).fromNow() === "seconds ago"
                                            ? "Just now"
                                            : dayjs(convo.createdAt).fromNow()}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={messageRef}></div>
                </div>) : (
                    <div className="flex-1 overflow-auto scrollbar-hide px-4 py-2 gap-1 flex flex-col justify-center items-center">
                        <div className="p-4 bg-neutral-800/80 rounded-full flex justify-center items-center w-16 h-16 animate-pulse">
                            <MessageCircle className="size-10 text-neutral-300 animate-pulse" />
                        </div>

                        <h1 className="mt-4 text-base font-semibold text-white">
                            Start a conversation with <span className='capitalize'>{selectedUser?.followerId.fullname}</span>
                        </h1>

                        <p className="mt-1 text-neutral-400 text-sm text-center">
                            Once you send a message, your conversation will appear here.
                        </p>
                    </div>

                )
            }

            <hr />

            <div>
                <ChatInput />
            </div>
        </div>

    )
}

export default ChatContainer