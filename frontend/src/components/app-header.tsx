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
} from "@/components/ui/dialog-settings"
import { useState } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
import { ShieldEllipsis, UserRoundCog, X } from 'lucide-react'
import { cn } from '@/lib/utils.ts'




export default function AppHeader() {
    const { auth, logout } = UseAuthStore();
    const getInitials = useInitials();
    const [open, setOpen] = useState(Boolean)
    const [category, setCategory] = useState("")
    const isCategoryAccount = category === "account" || category === ""
    const isCategorySecurity = category === "security"

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

                {auth ? <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarFallback className='text-white cursor-pointer'>{getInitials(auth.fullname)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto" align="end">
                        <DropdownMenuLabel className='flex flex-col'>
                            <span className='capitalize'>{auth.fullname}</span>
                            <span className='text-xs text-muted-foreground font-normal'>{auth.email}</span>
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
                    <DialogContent className="sm:max-w-[680px]">
                        <DialogHeader>
                            <DialogClose>
                                <X className='size-5 cursor-pointer' />
                            </DialogClose>
                            <DialogDescription>
                                <div>
                                    <div className='flex flex-row gap-2'>
                                        <div className='flex flex-col justify-start items-start gap-2 min-w-30'>
                                            <button onClick={() => setCategory("account")} className={cn('category-btn', isCategoryAccount ? "bg-accent" : "")}>
                                                <UserRoundCog className='size-5' />
                                                Account</button>
                                            <button onClick={() => setCategory("security")} className={cn('category-btn', isCategorySecurity ? "bg-accent" : "")}>
                                                <ShieldEllipsis className='size-5' />
                                                Security</button>
                                        </div>
                                        <div className='flex justify-start'>
                                            <div className={isCategoryAccount ? "" : "hidden"}>
                                            </div>
                                            <div className={isCategorySecurity ? "" : "hidden"}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
