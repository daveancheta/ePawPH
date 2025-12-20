import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useInitials } from "@/hooks/use-initials"
import Layout from "@/layout/app-layout"
import { UseAuthStore } from "@/store/UseAuthStore"
import { UseFollowStore } from "@/store/UseFollowStore"
import { Bolt, Bookmark, Copy, EllipsisVertical, Heart, LayoutGrid, Loader, MessageCircle, Pencil, Send, Share2, Users2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UsePostStore } from "@/store/UsePostStore"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DialogClose } from "@radix-ui/react-dialog"
import { useIsMobile } from "@/hooks/use-mobile"

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
    const isMobile = useIsMobile()
    const { auth, updateProfile, isUpdatingProfile } = UseAuthStore()
    const getInitials = useInitials()
    const { followingCount, countFollower, countFollowing,
        followerCount, followingList, listFollowing,
        followerList, listFollower, isFollowed, followings,
        handleFollow, handleUnfollow } = UseFollowStore()
    const { posts, post } = UsePostStore() as { posts: Post[], post: any }
    const [hovered, setHoverd] = useState("")
    const [formData, setFormData] = useState({
        followingId: auth._id,
        followerId: "",
        fullname: auth.fullname,
        username: auth.username,
        profile: auth.profile,
    })
    const profileRef = useRef<HTMLInputElement>(null)

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

    const handleUpdateProfile = (e: any) => {
        e.preventDefault()

        updateProfile(formData)
    }

    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setFormData({ ...formData, profile: reader.result });
            }
        };
    }

    const hasChanges =
        formData.fullname !== auth.fullname ||
        formData.username !== auth.username ||
        formData.profile !== auth.profile;


    return (
        <Layout>
            <div className="flex flex-col gap-6 sm:px-10 lg:px-20 w-full">

                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full">

                    <Avatar className="w-32 h-32 sm:w-60 sm:h-60">
                        {auth.profile?.length > 0 ? (
                            <img className="rounded-full object-cover w-60 h-60" src={auth.profile} />
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
                            <Dialog>

                                <DialogTrigger asChild>
                                    <Button className="text-md cursor-pointer w-50" variant="form">Edit profile</Button>

                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[700px]">
                                    <form onSubmit={handleUpdateProfile} className="flex flex-col gap-6">
                                        <DialogHeader>
                                            <DialogTitle>Edit profile</DialogTitle>
                                        </DialogHeader>
                                        <hr />

                                        <div className="grid gap-4">
                                            <input type="file" ref={profileRef} onChange={handleImageUpload} accept="image/*" hidden />
                                            <div className="grid gap-3">
                                                <Label className="flex justify-start" htmlFor="name-1">Profile</Label>
                                                <div className="flex justify-center">
                                                    <div className="relative">
                                                        <img className="w-50 h-50 rounded-full object-cover" src={formData.profile} alt="" />
                                                        <Button variant={'following'} className="absolute right-0 bottom-6 rounded-full w-10"
                                                            onClick={() => profileRef?.current?.click()} type="button"><Pencil /></Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="grid gap-3">
                                                <Label htmlFor="name-1">Full Name</Label>
                                                <Input onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} value={formData.fullname} />
                                            </div>
                                            <hr />
                                            <div className="grid gap-3">
                                                <Label htmlFor="username-1">Username</Label>
                                                <Input onChange={(e) => setFormData({ ...formData, username: e.target.value })} value={formData.username} />
                                            </div>
                                            <hr />
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="button" variant="outline">Cancel</Button>
                                            </DialogClose>
                                            <Button type="submit" disabled={isUpdatingProfile || !hasChanges
                                            }>
                                                <div className="flex flex-row gap-1 items-center">
                                                    {isUpdatingProfile && <Loader className="animate-spin" />}
                                                    <span>Save changes</span>
                                                </div></Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
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
                                        <DialogTitle className="flex justify-start">Following</DialogTitle>
                                        <hr />

                                    </DialogHeader>
                                    {listFollowing.length > 0 ? <div className="space-y-6">
                                        {
                                            listFollowing.map((following: any) => (
                                                <div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex flex-row items-center gap-2">
                                                            <Avatar key={following._id} className='w-12 h-12 rounded-full'>
                                                                {following.followerId.profile.length > 0 ?
                                                                    <img className="object-cover" src={following.followerId.profile} alt="" /> :
                                                                    <AvatarFallback className='text-white cursor-pointer border truncate whitespace-nowrap rounded-full'>
                                                                        {getInitials(following.followerId.fullname)}
                                                                    </AvatarFallback>}
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                {isMobile ?
                                                                    <h1 className="font-medium capitalize">
                                                                        {following.followerId.fullname.length > 9 ?
                                                                            following.followerId.fullname.slice(0, 9) + '...' : following.followerId.fullname}
                                                                    </h1> :
                                                                    <h1 className="font-medium capitalize">
                                                                        {following.followerId.fullname}
                                                                    </h1>
                                                                }
                                                                {isMobile ?
                                                                    <span className="text-muted-foreground">{following.followerId.username.length > 9 ?
                                                                        following.followerId.username.slice(0, 9) + '...'
                                                                        : following.followerId.username}</span>
                                                                    :
                                                                    <span className="text-muted-foreground">{following.followerId.username}</span>
                                                                }
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
                                        <DialogTitle className="flex justify-start">Followers</DialogTitle>
                                        <hr />

                                    </DialogHeader>
                                    {listFollower.length > 0 ? <div className="space-y-6">
                                        {
                                            listFollower.map((follower: any) => (
                                                <div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex flex-row items-center gap-2">
                                                            <Avatar key={follower._id} className='w-12 h-12 rounded-full'>
                                                                {follower.followingId.profile.length > 0 ?
                                                                    <img className="object-cover" src={follower.followingId.profile} alt="" /> :
                                                                    <AvatarFallback className='text-white cursor-pointer border truncate whitespace-nowrap rounded-full'>
                                                                        {getInitials(follower.followingId.fullname)}
                                                                    </AvatarFallback>}
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                {isMobile ?
                                                                    <h1 className="font-medium capitalize">
                                                                        {follower.followingId.fullname.length > 9 ?
                                                                            follower.followingId.fullname.slice(0, 9) + '...' : follower.followingId.fullname}
                                                                    </h1> :
                                                                    <h1 className="font-medium capitalize">
                                                                        {follower.followingId.fullname}
                                                                    </h1>
                                                                }
                                                                {isMobile ?
                                                                    <span className="text-muted-foreground">{follower.followingId.username.length > 9 ?
                                                                        follower.followingId.username.slice(0, 9) + '...'
                                                                        : follower.followingId.username}</span>
                                                                    :
                                                                    <span className="text-muted-foreground">{follower.followingId.username}</span>
                                                                }
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
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 my-10 pb-10'>
                                    {post.map((post: Post) => (
                                        <div key={post._id}>
                                            {post.posterId._id === auth._id && <div>
                                                <div className="relative">
                                                    <div className="relative" onMouseEnter={() => setHovered(post._id)} onMouseLeave={() => setHovered("")}>
                                                        <img className='w-full h-100 object-cover rounded-md border' src={post.petPicture} alt="" />

                                                    </div>
                                                    <div onMouseEnter={() => setHovered(post._id)} onMouseLeave={() => setHovered("")} className={`
            absolute top-0 w-full h-16 bg-linear-to-b from-black/70 to-transparent
            rounded-t-md text-white
            transition-opacity duration-300 ease-in-out
            ${hovered === post._id ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}>
                                                    </div>
                                                    <div onMouseEnter={() => setHovered(post._id)} onMouseLeave={() => setHovered("")} className={`
            absolute bottom-0 w-full h-16 bg-linear-to-t from-black/70 to-transparent
            rounded-t-md text-white
            transition-opacity duration-300 ease-in-out
            ${hovered === post._id ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}>

                                                    </div>
                                                    <div onMouseEnter={() => setHovered(post._id)} onMouseLeave={() => setHovered("")} className={`absolute bottom-0 text-white transition-opacity duration-300 ease-in-out ${hovered === post._id ? "opacity-100" : "opacity-0"}`}>
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
                                                    <div onMouseEnter={() => setHovered(post._id)} onMouseLeave={() => setHovered("")} className={`absolute top-0 p-2 flex justify-end w-full text-white transition-opacity duration-300 ease-in-out ${hovered === post._id ? "opacity-100" : "opacity-0"}`}>
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
