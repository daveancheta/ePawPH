import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useInitials } from "@/hooks/use-initials"
import Layout from "@/layout/app-layout"
import { UseAuthStore } from "@/store/UseAuthStore"
import { UseFollowStore } from "@/store/UseFollowStore"
import { Bolt, Bookmark, Copy, EllipsisVertical, Heart, LayoutGrid, MessageCircle, MoreHorizontalIcon, Search, Send, Share2, Users2 } from "lucide-react"
import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { UsePostStore } from "@/store/UsePostStore"

type Post = {
    _id: string
    posterId: posterId,
    petName: string,
    createdAt: any
    petPicture: string
}

type posterId = {
    _id: String
    fullname: string,
    posterId: string
    profile: string,
}

function Account() {
    const { auth } = UseAuthStore()
    const getInitials = useInitials()
    const { followingCount, countFollower, countFollowing,
        followerCount, followingList, listFollowing,
        followerList, listFollower, isFollowed, followings,
        handleFollow, handleUnfollow } = UseFollowStore()
    const { posts, post } = UsePostStore() as { posts: Post[], post: any }
    const [hovered, setHoverd] = useState("")


    const [formData, setFormData] = useState({
        followingId: auth._id,
        followerId: ""
    })

    useEffect(() => {
        post()
    }, [post])

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

    const setHovered = (id: any) => {
        setHoverd(id)

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

                                            <button className="mt-6 px-4 py-2 bg-[#58C185] hover:bg-[#58C185]/90 rounded-lg text-[#2F2F2F]">
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
                    {posts.length >= 0 && (
                        (() => {
                            const post = posts.filter((post: Post) => post.posterId._id === auth._id)

                            return post.length > 0 ? (
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 my-10'>
                                    {post.map((post: Post) => (
                                        <div key={post._id}>
                                            {post.posterId._id === auth._id && <div>
                                                <div className="relative">
                                                    <div className="relative" onMouseEnter={() => setHovered(post._id)}>
                                                        <img className='w-full h-100 object-cover rounded-md border' src={post.petPicture} alt="" />

                                                    </div>
                                                    <div className={hovered === post._id ? 'absolute z-50 top-0 w-full h-30 bg-linear-to-b  from-black/70 to-transparent p-2 rounded-md text-white' : 'hidden'}>
                                                    </div>
                                                    <div className={hovered === post._id ? 'absolute z-50 bottom-0 w-full h-30 bg-linear-to-t  from-black/70 to-transparent p-2 rounded-md text-white' : 'hidden'}>

                                                    </div>
                                                    <div className={hovered === post._id ? 'absolute z-50 bottom-0 w-full p-2 text-white' : 'hidden'}>
                                                        <div className="w-full px-4 py-2 has-[>svg]:px-3 rounded-sm flex flex-row justify-start gap-1">
                                                            <div className="flex flex-row gap-6 items-center">
                                                                <button
                                                                    className="flex flex-row items-center gap-1 cursor-pointer">
                                                                    <Heart className="size-6" />
                                                                    <span className="text-xs">1</span>
                                                                </button>
                                                                <button
                                                                    className="flex flex-row items-center gap-1 cursor-pointer">
                                                                    <MessageCircle className="size-5" />
                                                                    <span className="text-xs">0</span>
                                                                </button>
                                                                <button
                                                                    className="flex flex-row items-center gap-1 cursor-pointer">
                                                                    <Share2 className="size-5" />
                                                                    <span className="text-xs">0</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={hovered === post._id ? 'absolute z-50 top-0 w-full p-2 text-white flex flex-col gap-1' : 'hidden'}>
                                                        <div className="w-full px-0 py-2 has-[>svg]:px-3 rounded-sm flex flex-row justify-end items-center gap-0">
                                                            <div className="flex flex-row gap-0 items-center">
                                                                <button
                                                                    className="">
                                                                    <Bookmark className="size-6" />
                                                                </button>
                                                                <button
                                                                    className="">
                                                                    <EllipsisVertical className="size-6" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                    ))}
                                </div>
                            ) :
                                <div className="flex flex-col justify-center items-center py-6">
                                    <div className="p-4 bg-neutral-800/80 rounded-full">
                                        <LayoutGrid className="size-5 text-neutral-300" />
                                    </div>

                                    <h1 className="mt-4 text-base font-semibold text-white">
                                        No Posts Yet
                                    </h1>

                                    <p className="mt-1 text-neutral-400 text-sm">
                                        When they post something, it will appear here.
                                    </p>
                                </div>
                        })()
                    )
                    }
                </div>

            </div>
        </Layout>
    )
}

export default Account
