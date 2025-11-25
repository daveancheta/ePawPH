import { Skeleton } from "@/components/ui/skeleton"

export function PostSkeleton() {
    return (
        <div className="flex flex-col gap-4">

            <div className="flex items-center space-x-4">
                <Skeleton className="w-9 h-9 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[120px]" />
                </div>

              
            </div>
              <div>
                    <Skeleton className="h-[500px] min-w-120" />
                </div>
        </div>
    )
}
