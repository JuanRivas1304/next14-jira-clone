import { Navigation } from "./navigation"
import { WorkspaceSwitcher } from "./workspace-switcher"

export const Siderbar = () => {
    return (
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <WorkspaceSwitcher />
            <Navigation />
        </aside>
    )
}