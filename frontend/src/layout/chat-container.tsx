import { Avatar } from '@/components/ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { UseAuthStore } from '@/store/UseAuthStore'
import { UseMessageStore } from '@/store/UseMessageStore'
import { AvatarFallback } from '@radix-ui/react-avatar'
import dayjs from 'dayjs'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

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
    const { setSelectedUser, selectedUser, getConversation, conversation } = UseMessageStore() as {
        setSelectedUser: any,
        getConversation: any, conversation: any, selectedUser: any
    }
    const { auth } = UseAuthStore()
    const getInitials = useInitials()

    useEffect(() => {
        getConversation(selectedUser?.followerId?._id)
    }, [getConversation])


    return (
        <div className={`fixed bottom-10 right-10 rounded-sm cursor-pointer min-h-130 min-w-100 bg-neutral-950 border origin-bottom-right transition-all duration-300`}>
            <div className='flex justify-between items-center py-4 px-6 '>
                <div className='flex flex-row items-center gap-2'>
                    <Avatar className="w-15 h-15">
                        {selectedUser.followerId.profile?.length > 0 ? (
                            <img className="rounded-full object-cover" src={selectedUser.followerId.profile} />
                        ) : (
                            <AvatarFallback className="text-white cursor-pointer border rounded-full w-15 h-15 flex items-center justify-center">
                                {getInitials(selectedUser.followerId.fullname)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <h1 className='font-bold'>{selectedUser?.followerId.fullname}</h1>
                </div>
                <button onClick={() => {
                    setSelectedUser(null)
                }
                }>
                    <X />
                </button>
            </div>
            <hr />
            <div className="flex flex-col gap-6 mt-4 px-4 py-2">
                {conversation.map((convo: any) => (
                    <div
                        key={convo._id}
                        className={`flex w-full ${auth._id === convo.senderId ? "justify-end" : "justify-start"}`}
                    >
                        <div className='relative'>
                        <div
                            className={`
          ${auth._id === convo.senderId
                                    ? "bg-[#58C185] text-[#2F2F2F]"
                                    : "bg-gray-700 text-white"}
          rounded-xl px-4 py-2 max-w-xs wrap-break-words
        `}
                        >
                            {convo.text}
                        </div>
                        <p className={`text-xs text-muted-foreground absolute ${auth._id === convo.senderId ? "right-2" : "left-2"}`}> {dayjs(convo.createdAt).fromNow() === "seconds ago" ? "Just now" : dayjs(convo.createdAt).fromNow()}</p>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default ChatContainer