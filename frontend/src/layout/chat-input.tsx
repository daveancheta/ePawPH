import { ArrowUpIcon, Heart, Image, TreePalmIcon, X } from "lucide-react"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { UseMessageStore } from "@/store/UseMessageStore"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

export function ChatInput() {
    const isMobile = useIsMobile()
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
        if (!formData.text.trim() && !formData.image.trim()) {
            return;
        } else if(e.key === 'Enter') {
                handleSendMessage(e);
        }
    }

    return (
        <div className="px-0 py-0">
            <form onSubmit={handleSendMessage}>
                <InputGroup className={`rounded-none rounded-b-sm border-none ${isMobile ? "w-full" : "max-w-120"} wrap-break-word`}>
                    {formData.image &&
                        <div className="w-full p-2 flex">
                            <div className="relative">
                                <img className="w-30 h-30 flex justify-start rounded-sm" src={formData.image} alt="" />
                                <button className="absolute top-0 right-0 m-1 cursor-pointer"
                                    onClick={() => setFormData({ ...formData, image: "" })
                                    }>
                                    <X className="text-black" />
                                </button>
                            </div>
                        </div>}
                    <InputGroupTextarea onKeyDown={handleKeyPress} placeholder="Aa"
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })} value={formData.text} />
                    <input type="file" ref={imageFileRef} accept="image/*" onChange={handleImageUpload} hidden />
                    <InputGroupAddon align="block-end">
                        <InputGroupButton
                            variant="outline"
                            className="rounded-full cursor-pointer"
                            size="icon-sm"
                            onClickCapture={() => imageFileRef?.current?.click()}
                        >
                            <Image />
                        </InputGroupButton>
                        <div className="flex-1" />
                        <Button
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
