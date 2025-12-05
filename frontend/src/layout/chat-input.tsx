import { ArrowUpIcon, Image } from "lucide-react"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { UseMessageStore } from "@/store/UseMessageStore"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ChatInput() {
    const { sendMessage, selectedUser } = UseMessageStore() as { sendMessage: any, selectedUser: any }
    const [formData, setFormData] = useState({
        receiverId: selectedUser.followerId,
        text: "",
        image: ""
    })
    const handleSendMessage = (e: any) => {
        e.preventDefault()
        sendMessage(formData)

        setFormData({ ...formData, text: "" })
    }
    return (
        <div className=" px-0 py-0">
            <form onSubmit={handleSendMessage}>
                <InputGroup className="rounded-none rounded-b-sm border-none max-w-120 wrap-break-word">
                    <InputGroupTextarea placeholder="Ask, Search or Chat..."
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })} value={formData.text} />
                    <InputGroupAddon align="block-end">
                        <InputGroupButton
                            variant="outline"
                            className="rounded-full"
                            size="icon-sm"
                        >
                            <Image />
                        </InputGroupButton>
                        <div className="flex-1" />
                        <Button
                            className="rounded-full"
                            disabled={!formData.text.trim()}
                        >
                            <ArrowUpIcon />
                            <span className="sr-only">Send</span>
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </form>
        </div>
    )
}
