import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UseAuthStore } from "../store/UseAuthStore.ts"
import { Button } from './ui/button'
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

export default function AppHeader() {
    const { authUser, logout } = UseAuthStore();
    const getInitials = useInitials();

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
                            <DropdownMenuItem >
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem variant='destructive' className='cursor-pointer'>
                                <button className='cursor-pointer' onClick={logout}>Logout</button>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu> : ""}


            </div>
        </div>
    )
}
