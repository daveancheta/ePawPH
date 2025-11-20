import { Link } from 'react-router-dom'

export default function AppHeader() {
    return (
        <div className='h-full min-w-[20px] bg-neutral-900 dark:bg-neutral-100 flex items-center justify-between p-10 pl-30 pr-30'>
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
            <div className='text-white dark:dark-gray text-xl font-semibold'>
                <Link to={'/'}>Home</Link>
            </div>

            {/* Settings & Profile */}
            <div className='text-white dark:dark-gray text-xl font-semibold'>
                 <Link to={'/profile'}>Profile</Link>
                </div>
        </div>
    )
}
