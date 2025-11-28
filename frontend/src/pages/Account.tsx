import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useInitials } from "@/hooks/use-initials"
import Layout from "@/layout/app-layout"
import { UseAuthStore } from "@/store/UseAuthStore"
import { UseFollowStore } from "@/store/UseFollowStore"
import { Bolt, Bookmark, Copy, Heart, LayoutGrid, Search, Send, Users2 } from "lucide-react"
import { useEffect, useState } from "react"
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
        followerCount, followingList, listFollowing,
        followerList, listFollower, isFollowed, followings,
        handleFollow, handleUnfollow } = UseFollowStore()

    const [formData, setFormData] = useState({
        followingId: auth._id,
        followerId: ""
    })

    useEffect(() => {
        isFollowed()
    }, [isFollowed])


    useEffect(() => {
        followerList()
    }, [followerList])

    useEffect(() => {
        followingList()
    }, [followingList])

    useEffect(() => {
        followingCount()
    }, [followingCount])

    useEffect(() => {
        followerCount()
    }, [followerCount])

    const handlesubmitFollow = (e: any) => {
        e.preventDefault()

        handleFollow(formData)
    }

    const handlesubmitUnFollow = (e: any) => {
        e.preventDefault()

        handleUnfollow(formData)
    }

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
                                    {listFollowing.length > 0 ? <div className="space-y-6">
                                        {
                                            listFollowing.map((following: any) => (
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
                                                            {followings.some(f => f.followerId === following.followerId._id) ? <form onSubmit={handlesubmitUnFollow}>
                                                                <Button variant={'following'} onClick={() => setFormData({ ...formData, followerId: following.followerId._id, followingId: following.followingId })}>Following</Button>
                                                            </form> :
                                                                <form onSubmit={handlesubmitFollow}>
                                                                    <Button variant={'form'} onClick={() => setFormData({ ...formData, followerId: following.followerId._id, followingId: following.followingId })}>Follow</Button>
                                                                </form>}

                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }</div> :
                                        <div className="flex flex-col items-center justify-center py-20 text-center">
                                            <div className="p-4 bg-neutral-800 rounded-full">
                                                <Users2 className="w-10 h-10 text-neutral-400" />
                                            </div>

                                            <h2 className="mt-4 text-xl font-semibold text-white">
                                                No Following Yet
                                            </h2>

                                            <p className="mt-2 text-neutral-400 max-w-sm">
                                                When you follow someone, they will appear here.
                                            </p>

                                            <button className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">
                                                Discover People
                                            </button>
                                        </div>}


                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="text-lg cursor-pointer">
                                        <span className="font-bold">{countFollower}</span> <span className="text-muted-foreground">followers</span>
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[700px]">
                                    <DialogHeader>
                                        <DialogTitle className="flex justify-center">Followers</DialogTitle>
                                        <hr />

                                    </DialogHeader>
                                    <InputGroup>
                                        <InputGroupInput placeholder="Search..." />
                                        <InputGroupAddon>
                                            <Search />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {listFollower.length > 0 ? <div className="space-y-6">
                                        {
                                            listFollower.map((follower: any) => (
                                                <div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex flex-row items-center gap-2">
                                                            <Avatar key={follower._id} className='w-12 h-12 rounded-full'>
                                                                {follower.followingId.profile.length > 0 ?
                                                                    <img src={follower.followingId.profile} alt="" /> :
                                                                    <AvatarFallback className='text-white cursor-pointer border truncate whitespace-nowrap rounded-full'>
                                                                        {getInitials(follower.followingId.fullname)}
                                                                    </AvatarFallback>}
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <h1 className="font-medium capitalize">{follower.followingId.fullname}</h1>
                                                                <span className="text-muted-foreground">{follower.followingId.username}</span>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            {followings.some(f => f.followerId === follower.followingId._id) ?
                                                                <form onSubmit={handlesubmitUnFollow}>
                                                                    <Button variant={'following'} onClick={() => setFormData({ ...formData, followerId: follower.followingId._id, followingId: follower.followerId })}>Following</Button>
                                                                </form> :
                                                                <form onSubmit={handlesubmitFollow}>
                                                                    <Button variant={'form'} onClick={() => setFormData({ ...formData, followerId: follower.followingId._id, followingId: follower.followerId })}>Follow Back</Button>
                                                                </form>}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }</div> :
                                        <div className="flex flex-col items-center justify-center py-16 text-center">
                                            <div className="p-4 bg-neutral-800 rounded-full">
                                                <Users2 className="w-10 h-10 text-neutral-400" />
                                            </div>

                                            <h2 className="mt-4 text-xl font-semibold text-white">
                                                No Followers Yet
                                            </h2>

                                            <p className="mt-2 text-neutral-400 max-w-xs">
                                                When someone follows you, they’ll appear here.
                                            </p>
                                        </div>}

                                </DialogContent>
                            </Dialog>
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
