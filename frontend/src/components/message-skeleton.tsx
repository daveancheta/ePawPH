import { Skeleton } from "@/components/ui/skeleton"

export function MessageSkeleton() {
    return (
        <div className="flex-1 overflow-auto scrollbar-hide px-4 py-2 gap-1 flex flex-col">
            {[1, 2, 3, 4].map((index) => (
                <div key={index}>
                    <div className="flex justify-start">
                        <Skeleton className="h-12 w-50 rounded-xl" />
                    </div>
                    <div className="flex justify-end">
                        <Skeleton className="h-12 w-50 rounded-xl" />
                    </div>
                </div>
            ))}
        </div>


    )
}
