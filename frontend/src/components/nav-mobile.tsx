import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Globe, HomeIcon, MessageCircleMore, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback } from './ui/avatar'
import { useInitials } from '@/hooks/use-initials'
import { UseAuthStore } from '@/store/UseAuthStore'


function NavMobile() {
    const getInitials = useInitials()
    const { auth } = UseAuthStore()
    return (
        <div className={`fixed bottom-0 left-0 w-full bg-neutral-900 border-t shadow-md z-40 md:hidden`}>
            <div className="flex items-center justify-between px-6 h-16">
                <Link to="/" className="flex items-center justify-center">
                    <HomeIcon className="size-6 text-white" />
                </Link>

                <Link to={'/messages'}>
                    <MessageCircleMore className="size-6 text-white" />
                </Link>

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="">
                            <Send className="size-6 text-white" />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Pet Status</DialogTitle>
                            <DialogDescription>
                                We hope you find our platform helpful for your pet-related concerns.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Link to={'/lost'} className="bg-red-200 text-red-800 
                  hover:bg-red-300 hover:text-red-900 
                  font-bold text-center p-2 rounded-md cursor-pointer">Lost</Link>
                            </div>
                            <div className="grid gap-3">
                                <Link to={'/adaption'} className="bg-yellow-100 text-yellow-800 
                  hover:bg-yellow-200 hover:text-yellow-900 
                  font-bold text-center p-2 rounded-md cursor-pointer">Adaption</Link>
                            </div>
                            <div className="grid gap-3">
                                <Link to={'/found'} className="bg-green-100 text-green-800 
                  hover:bg-green-200 hover:text-green-900 
                  font-bold text-center p-2 rounded-md cursor-pointer">Found</Link>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <Link to="/news" className="flex items-center justify-center">
                    <Globe className="size-6 text-white" />
                </Link>

                <Link to="/account" className="flex items-center justify-center">
                    <Avatar className="w-8 h-8">
                        {auth.profile.length > 0 ? (
                            <img
                                className="rounded-full object-cover"
                                src={auth.profile}
                                alt="profile"
                            />
                        ) : (
                            <AvatarFallback>
                                {getInitials(auth.fullname)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                </Link>

            </div>
        </div>
    )
}

export default NavMobile