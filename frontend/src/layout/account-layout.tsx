import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useInitials } from "@/hooks/use-initials"
import { UseAuthStore } from "@/store/UseAuthStore"
import { Bolt, BookMarked, Copy, Heart, LayoutGrid, Send } from "lucide-react"

function AccountLayout() {
    const { auth } = UseAuthStore()
    const getInitials = useInitials()

    return (
        <div className="flex flex-col items-center p-10 justify-center">
            <div className="flex flex-row items-center gap-6">
                <Avatar className="w-60 h-60">
                    {auth.profile.length > 0 ? <img className="rounded-full" src={auth.profile} /> :
                        <AvatarFallback className='text-white cursor-pointer border rounded-full'>
                            {getInitials(auth.fullname)}
                        </AvatarFallback>}
                </Avatar>


                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <h1 className="font-medium text-3xl">{auth.fullname}</h1>
                        <div className="flex flex-row items-center gap-2">
                            <p className="font-normal text-sm text-muted-foreground">@{auth.username}</p>
                            <button className="cursor-pointer text-muted-foreground"><Copy className="size-4" /></button>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Button className="w-30 text-md cursor-pointer" variant={'form'}>Edit profile</Button>
                        <Button className="cursor-pointer"><Send /></Button>
                        <Button className="cursor-pointer"><Bolt /></Button>
                    </div>

                    <div className="flex flex-row items-center gap-3">
                        <h1 className="text-lg"><span className="font-bold">0</span> <span className="text-muted-foreground">post</span></h1>
                        <h1 className="text-lg"><span className="font-bold">130</span> <span className="text-muted-foreground">following</span></h1>
                        <h1 className="text-lg"><span className="font-bold">1,000</span> <span className="text-muted-foreground">followers</span></h1>
                    </div>
                </div>
            </div>

            <div className="">
                <div className="flex flex-row"> 
                <button className="text-muted-foreground p-2"><LayoutGrid /></button>
                <button className="text-muted-foreground p-2"><BookMarked /></button>
                <button className="text-muted-foreground p-2"><Heart /></button>
                </div>
                <hr className="my-2 bg-white"/>
            </div>
        </div>
    )
}

export default AccountLayout