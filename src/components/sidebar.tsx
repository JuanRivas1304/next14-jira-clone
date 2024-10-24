import { Navigation } from "./navigation"
import { WorkspaceSwitcher } from "./workspace-switcher"
import { DottedSeparator } from "./dotted-separator"

export const Siderbar = () => {
    return (
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <DottedSeparator className="my-4"/>
            <WorkspaceSwitcher />
            <DottedSeparator className="my-4"/>
            <Navigation />
        </aside>
    );
};