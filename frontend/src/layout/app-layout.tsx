import AppHeader from "@/components/app-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <header>
                <AppHeader />
            </header>
            <main className="bg-neutral-900">
                {children}
            </main>
        </div>
    )
}
