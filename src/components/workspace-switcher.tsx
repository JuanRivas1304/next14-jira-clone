"use client"
import { RiAddCircleFill} from "react-icons/ri";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

export const WorkspaceSwitcher = () => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const { data: workspaces } = useGetWorkspaces();
    const { open } = useCreateWorkspaceModal();

    const onSelect = (id: string) => {
        router.push(`/workspaces/${id}`);
    };

    return (
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase text-neutral-500">Workspaces</p>
            <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacit-75 transition"/>
          </div>
          <Select onValueChange={onSelect} value={workspaceId}>
            <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
                <SelectValue placeholder="No workspace selected" />
            </SelectTrigger>
            <SelectContent>
                {workspaces?.documents.map((workspace) => (
                    <SelectItem key={workspace.$id} value={workspace.$id}>
                        <div className="flex justify-start items-center gap-3 font-medium">
                            <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl}/>
                            <span className="truncate">{workspace.name}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
    );
};