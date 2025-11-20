import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AppHeader() {
    return (
        <div
            className='bg-neutral-900 dark:bg-neutral-100 
        flex items-center justify-between p-10 pl-30 pr-30 py-5 rounded-md'>
            {/* Logo */}
            <div>
                <h1 className='text-3xl font-extrabold'>
                    <span className='fresh-green'>e</span>
                    <span className='text-white dark:dark-gray'>
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
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>UN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}
