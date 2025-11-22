import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UseAuthStore } from "../store/UseAuthStore.ts"
"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useInitials } from '@/hooks/use-initials.tsx'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'




export default function AppHeader() {
    const { authUser, logout } = UseAuthStore();
    const getInitials = useInitials();
    const [open, setOpen] = useState(Boolean)
    return (
        <div
            className='bg-neutral-900
        flex items-center justify-between p-10 px-20 py-5 rounded-md'>
            {/* Logo */}
            <Link to={'/'}>
                <div>
                    <h1 className='text-3xl font-extrabold'>
                        <span className='fresh-green'>e</span>
                        <span className='text-white'>
                            Paw
                            <span className='text-sm'>PH</span>
                        </span>
                    </h1>
                </div>
            </Link>

            {/* Navigation Links */}
            <div className='text-white text-sm font-medium flex flex-row gap-10 items-center'>
                <Link to={'/'}>Home</Link>
                <Link to={'/'}>Message</Link>
                <Link to={'/'}>News</Link>
                <Link to={'/'}>Notification</Link>

                {authUser ? <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarFallback className='text-white cursor-pointer'>{getInitials(authUser.fullname)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto" align="end">
                        <DropdownMenuLabel className='flex flex-col'>
                            <span className='capitalize'>{authUser.fullname}</span>
                            <span className='text-xs text-muted-foreground font-normal'>{authUser.email}</span>
                        </DropdownMenuLabel>
                        <hr />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className='cursor-pointer'>
                                <button className='cursor-pointer w-full text-start'
                                    onClick={() => setOpen(true)}>Settings</button>
                            </DropdownMenuItem>
                            <DropdownMenuItem variant='destructive' className='cursor-pointer'>
                                <button className='cursor-pointer w-full text-start'
                                    onClick={logout}>Logout</button>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu> : ""}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Settings</DialogTitle>
                            <DialogDescription>
                              
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">

                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
