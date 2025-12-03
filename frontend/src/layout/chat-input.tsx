import { IconPlus } from "@tabler/icons-react"
import { ArrowUpIcon, Image } from "lucide-react"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from "@/components/ui/input-group"

export function ChatInput() {
    return (
        <div className=" px-0 py-0">
            <InputGroup className="rounded-none rounded-b-sm border-none max-w-120 wrap-break-word">
                <InputGroupTextarea placeholder="Ask, Search or Chat..." />
                <InputGroupAddon align="block-end">
                    <InputGroupButton
                        variant="outline"
                        className="rounded-full"
                        size="icon-sm"
                    >
                        <Image />
                    </InputGroupButton>
                    <div className="flex-1"/>
                    <InputGroupButton
                        variant="default"
                        className="rounded-full"
                        size="icon-sm"
                    >
                        <ArrowUpIcon />
                        <span className="sr-only">Send</span>
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}
