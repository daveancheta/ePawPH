import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useInitials } from "@/hooks/use-initials"
import Layout from "@/layout/app-layout"
import { UseAuthStore } from "@/store/UseAuthStore"
import { UseFollowStore } from "@/store/UseFollowStore"
import { Bolt, Bookmark, Copy, Heart, LayoutGrid, Search, Send } from "lucide-react"
import { useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

function Account() {
    const { auth } = UseAuthStore()
    const getInitials = useInitials()
    const { followingCount, countFollower, countFollowing,
        followerCount, followingList, listFollowing } = UseFollowStore()

    useEffect(() => {
        followingList()
    }, [followingList])

    useEffect(() => {
        followingCount()
    }, [followingCount])

    useEffect(() => {
        followerCount()
    }, [followerCount])

    return (
        <Layout>
            <div className="flex flex-col gap-6 sm:px-10 lg:px-20 w-full">

                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full">

                    <Avatar className="w-32 h-32 sm:w-60 sm:h-60">
                        {auth.profile?.length > 0 ? (
                            <img className="rounded-full" src={auth.profile} />
                        ) : (
                            <AvatarFallback className="text-white cursor-pointer border rounded-full">
                                {getInitials(auth.fullname)}
                            </AvatarFallback>
                        )}
                    </Avatar>

                    {/* User Info */}
                    <div className="flex flex-col gap-4 text-center sm:text-left">
                        <div className="flex flex-col items-center sm:items-start">
                            <h1 className="font-medium text-2xl sm:text-3xl">{auth.fullname}</h1>

                            <div className="flex flex-row items-center gap-2">
                                <p className="font-normal text-sm text-muted-foreground">@{auth.username}</p>
                                <button className="cursor-pointer text-muted-foreground">
                                    <Copy className="size-4" />
                                </button>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-row justify-center sm:justify-start gap-2">
                            <Button className="text-md cursor-pointer w-50" variant="form">Edit profile</Button>
                            <Button className="cursor-pointer"><Send /></Button>
                            <Button className="cursor-pointer"><Bolt /></Button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-row items-center justify-center sm:justify-start gap-6 sm:gap-8">
                            <h1 className="text-lg"><span className="font-bold">0</span> <span className="text-muted-foreground">post</span></h1>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="text-lg cursor-pointer">
                                        <span className="font-bold">{countFollowing}</span> <span className="text-muted-foreground">following</span>
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[700px]">
                                    <DialogHeader>
                                        <DialogTitle className="flex justify-center">Following</DialogTitle>
                                        <hr />

                                    </DialogHeader>
                                    <InputGroup>
                                        <InputGroupInput placeholder="Search..." />
                                        <InputGroupAddon>
                                            <Search />
                                        </InputGroupAddon>
                                    </InputGroup>

                                      {listFollowing.map((following: any) => (
                                            <div>
                                                <div className="flex justify-between items-center"> 
                                                <div className="flex flex-row items-center gap-2">
                                                <Avatar key={following._id} className='w-12 h-12 rounded-full'>
                                                {following.followerId.profile.length > 0 ?
                                                    <img src={following.followerId.profile} alt="" /> :
                                                    <AvatarFallback className='text-white cursor-pointer border truncate whitespace-nowrap rounded-full'>
                                                        {getInitials(following.followerId.fullname)}
                                                    </AvatarFallback>}
                                            </Avatar>
                                            <div className="flex flex-col">
                                            <h1 className="font-medium capitalize">{following.followerId.fullname}</h1>
                                            <span className="text-muted-foreground">{following.followerId.username}</span>
                                            </div>
                                            </div>

                                            <div>
                                                <Button variant={'form'}>Following</Button>
                                            </div>
                                            </div>
                                            </div>
                                        ))}

                                </DialogContent>
                            </Dialog>
                            <h1 className="text-lg"><span className="font-bold">{countFollower}</span> <span className="text-muted-foreground">followers</span></h1>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="w-full text-muted-foreground">
                    <div className="flex flex-row justify-center gap-15 sm:gap-40">
                        <button className="text-muted-foreground p-2"><LayoutGrid /></button>
                        <button className="text-muted-foreground p-2"><Bookmark /></button>
                        <button className="text-muted-foreground p-2"><Heart /></button>
                    </div>

                    <hr className="my-2 bg-white" />
                </div>

            </div>
        </Layout>
    )
}

export default Account
