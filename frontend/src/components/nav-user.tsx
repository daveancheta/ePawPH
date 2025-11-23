import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { UseAuthStore } from '@/store/UseAuthStore';
import { useInitials } from '@/hooks/use-initials';
import { BadgeCheck, ChevronsUpDown, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NavUser() {
    const { auth, logout } = UseAuthStore()
    const getIntials = useInitials()
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent">

                            <Avatar className='rounded-md'>
                                {auth.profile.length > 0 ?
                                    <img src={auth.profile} alt="" /> :
                                    <AvatarFallback className='bg-neutral-800'>
                                        {getIntials(auth.fullname)}
                                    </AvatarFallback>}
                            </Avatar>
                            <div className='flex flex-col'>
                                <h1>{auth.fullname}</h1>
                                <span className='text-xs text-muted-foreground'>{auth.email}</span>
                            </div>
                            <ChevronsUpDown className='ml-5' />

                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-neutral-800 p-2"
                        align="end"

                    >
                        <div className='flex flex-row gap-2 text-sm'>
                            <Avatar className='rounded-md'>
                                {auth.profile.length > 0 ?
                                    <img src={auth.profile} alt="" /> :
                                    <AvatarFallback className='bg-neutral-900'>
                                        {getIntials(auth.fullname)}
                                    </AvatarFallback>}
                            </Avatar>
                            <div className='flex flex-col'>
                                <h1>{auth.fullname}</h1>
                                <span className='text-xs text-muted-foreground'>{auth.email}</span>
                            </div>
                        </div>
                        <hr className='my-2' />
                        <div className='flex flex-col gap-1'>
                            <Link to={'/account'} className='flex flex-row gap-2 items-center cursor-pointer text-sm p-2 hover-default'>
                                <BadgeCheck className='size-4' />Account
                            </Link>
                            <Link to={'/account'} className='flex flex-row gap-2 items-center cursor-pointer text-sm p-2 hover-default'>
                                <Settings className='size-4' />Settings
                            </Link>
                        </div>
                        <hr className='my-2' />
                        <button className='flex flex-row gap-2 items-center cursor-pointer text-sm hover-destrcutive p-2' onClick={logout}>
                            <LogOut className='size-4' /> Logout
                        </button>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
