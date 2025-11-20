import AppHeader from "@/components/app-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <header className="fixed w-full">
                <div className="m-5 border border-white/20 rounded-md shawdow-lg">
                    <AppHeader />
                </div>
            </header>
            <main className="min-h-screen bg-neutral-800">
                {children}
            </main>
        </div>
    )
}
