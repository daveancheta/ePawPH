import { ArrowUpIcon, Heart, Image, X } from "lucide-react"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { UseMessageStore } from "@/store/UseMessageStore"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export function ChatInput() {
    const { sendMessage, selectedUser } = UseMessageStore()
    const [formData, setFormData] = useState({
        receiverId: selectedUser.followerId,
        text: "",
        image: ""
    })
    const imageFileRef = useRef<HTMLInputElement>(null)

    const handleSendMessage = (e: any) => {
        e.preventDefault()
        sendMessage(formData)

        setFormData({ ...formData, text: "", image: "" })
    }

    const handleImageUpload = (e: any) => {
        const file = e.target.files[0]
        if (!file) return;

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setFormData({ ...formData, image: reader.result })
            }
        }
    }

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (formData.text.trim() || formData.image) {
                handleSendMessage(e);
            }
        }
    }

    return (
        <div className="w-full">
            <form onSubmit={handleSendMessage} className="w-full">
                <InputGroup className="rounded-none rounded-b-sm border-none w-full">
                    {formData.image &&
                        <div className="w-full p-2 flex">
                            <div className="relative">
                                <img className="w-30 h-30 flex justify-start rounded-sm object-cover" src={formData.image} alt="" />
                                <button 
                                    type="button"
                                    className="absolute top-0 right-0 m-1 cursor-pointer"
                                    onClick={() => setFormData({ ...formData, image: "" })}
                                >
                                    <X className="text-black" />
                                </button>
                            </div>
                        </div>
                    }
                    <InputGroupTextarea 
                        onKeyDown={handleKeyPress} 
                        placeholder="Aa"
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })} 
                        value={formData.text} 
                        rows={1}
                        className="flex-1 min-w-0 resize-none"
                    />
                    <input type="file" ref={imageFileRef} accept="image/*" onChange={handleImageUpload} hidden />
                    <InputGroupAddon align="block-end" className="shrink-0">
                        <InputGroupButton
                            type="button"
                            variant="outline"
                            className="rounded-full cursor-pointer"
                            size="icon-sm"
                            onClickCapture={() => imageFileRef?.current?.click()}
                        >
                            <Image />
                        </InputGroupButton>
                        <div className="flex-1" />
                        <Button
                            type="submit"
                            variant={'outline'}
                            className="rounded-full cursor-pointer"
                            hidden={!formData.text.trim() && !formData.image}
                        >
                            <ArrowUpIcon className="text-white" />
                            <span className="sr-only">Send</span>
                        </Button>

                        <Button
                            type="submit"
                            variant={'outline'}
                            className="rounded-full cursor-pointer"
                            hidden={formData.text.trim() || formData.image}
                            onClick={() => setFormData({ ...formData, text: "heart" })}
                        >
                            <Heart className="fill-red-400 text-red-400" />
                            <span className="sr-only">Heart</span>
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </form>
        </div>
    )
}