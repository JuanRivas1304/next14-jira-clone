"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { JoinWorksoaceForm } from "@/features/workspaces/components/join-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const WorkspaceIdJoinClient = () => {
    const workspaceId = useWorkspaceId();
    const { data: initialValues, isLoading } = useGetWorkspaceInfo({ workspaceId });

    if (isLoading) {
        return <PageLoader />
    }

    if (!initialValues) {
        return <PageError message="Project not found" />
    }

    return (
        <div className="w-full lg:max-w-xl">
            <JoinWorksoaceForm initialValues={initialValues}/>
        </div>
    )
}