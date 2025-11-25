import { Input } from '@/components/ui/input'
import AppLayout from '@/layout/app-layout'
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { UsePostStore } from '@/store/UsePostStore'
import { UseAuthStore } from '@/store/UseAuthStore'
import { LoaderIcon } from 'lucide-react'

function Lost() {
    const { handlePetPost, isCreatingPost } = UsePostStore() as { handlePetPost: any, isCreatingPost: boolean }
    const { auth } = UseAuthStore()
    const [formData, setFormData] = useState({
        posterId: "",
        petName: "",
        status: "",
        gender: "",
        petType: "",
        age: 0,
        breed: "",
        color: "",
        petPicture: "",
        lastSeenDate: "",
        lastSeenLocation: "",
        message: "",
    });

    const handlePost = (e: any) => {
        e.preventDefault()

        handlePetPost(formData)
    }

    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setFormData({ ...formData, petPicture: reader.result });
            }
        };
    }


    return (
        <AppLayout>
            <form onSubmit={handlePost}>
                <div className='flex flex-col gap-4 items-center'>
                    <h1 className='font-extrabold text-2xl'>Pet Description</h1>

                    <div className='flex flex-row gap-2'>
                        <Input type="text" placeholder='Name'
                            onChange={(e) => setFormData({ ...formData, petName: e.target.value })} value={formData.petName} />
                        <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Gender</SelectLabel>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='flex flex-row gap-2'>
                        <Input type="text" placeholder='Pet type (e.g. Dog, Cat, Bird, etc..)'
                            onChange={(e) => setFormData({ ...formData, petType: e.target.value })} value={formData.petType} />
                        <Input className="w-[180px]" type='number' placeholder='Age' 
                         onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })} value={formData.age}/>
                    </div>

                    <div className='flex flex-row gap-2'>
                        <Input className="max-w-[180px]" type="text" placeholder='Breed'
                            onChange={(e) => setFormData({ ...formData, breed: e.target.value })} value={formData.breed} />
                        <Input type='text' placeholder='Color' 
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })} value={formData.color}/>
                    </div>

                    <Input type="file" accept='image/*' onChange={handleImageUpload}
                    />
                    <Input type="text" placeholder='Last seen (Location)'
                        onChange={(e) => setFormData({ ...formData, lastSeenLocation: e.target.value })} value={formData.lastSeenLocation} />
                    <Input type="date" placeholder='Last seen (Date)'
                        onChange={(e) => setFormData({ ...formData, lastSeenDate: e.target.value })} value={formData.lastSeenDate} />
                    <Textarea className='max-w-100' placeholder='Message (Optional)'
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })} value={formData.message} />

                    <Button className="cursor-pointer" variant={'form'} onClick={() => setFormData({ ...formData, posterId: auth._id, status: "lost" })}
                        disabled={isCreatingPost || !formData.petName.trim() || !formData.gender.trim() || !formData.petType.trim()
                            || !formData.age || !formData.breed.trim()
                            || !formData.color.trim() || !formData.petPicture.trim()
                            || !formData.lastSeenDate.trim() || !formData.lastSeenLocation.trim()
                            || !formData.lastSeenDate.trim() || !formData.message.trim()}><LoaderIcon className={isCreatingPost ? "animate-spin" : "hidden"} />Create new post</Button>

                    <div className='flex flex-col items-center'>
                        <p className='text-xs font-bold'>Stay <span className='fresh-green'>hopeful</span>  — we wish for your pet’s <span className='fresh-green'>safe</span> return soon. Our </p>
                        <p className='text-xs font-bold'><span className='fresh-green'>community</span> is here to help you every step of the way.</p>
                    </div>
                </div>
            </form>
        </AppLayout>
    )
}

export default Lost