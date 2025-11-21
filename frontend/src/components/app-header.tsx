import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UseAuthStore } from "../store/UseAuthStore.ts"
import { Button } from './ui/button'

export default function AppHeader() {
    const { authUser, logout } = UseAuthStore();

    return (
        <div
            className='bg-neutral-900
        flex items-center justify-between p-10 px-20 py-5 rounded-md'>
            {/* Logo */}
            <div>
                <h1 className='text-3xl font-extrabold'>
                    <span className='fresh-green'>e</span>
                    <span className='text-white'>
                        Paw
                        <span className='text-sm'>PH</span>
                    </span>
                </h1>
            </div>

            {/* Navigation Links */}
            <div className='text-white text-sm font-medium flex flex-row gap-10 items-center'>
                <Link to={'/'}>Home</Link>
                <Link to={'/'}>Message</Link>
                <Link to={'/'}>News</Link>
                <Link to={'/'}>Notification</Link>
                {authUser ?
                <button onClick={logout}>Logout</button> : "    "}
                {authUser ?
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    :
                    <Link to={'/login'}><Button className='cursor-pointer' variant={'secondary'}>Login</Button></Link>
                    }
            </div>
        </div>
    )
}
