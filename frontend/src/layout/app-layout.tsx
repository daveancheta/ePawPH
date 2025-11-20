import AppHeader from "@/components/app-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <header className="fixed w-full">
                <div className="m-5 border border-white/20 rounded-md shadow-lg">
                    <AppHeader />
                </div>
            </header>

            <main className="pt-28 mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl">
                <div className="m-5">
                    {children}
                </div>
            </main>
        </div>
    )
}
