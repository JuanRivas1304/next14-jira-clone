import { cn } from "@/lib/utils";

interface DottedSeparatorProps {
    className?: string;
    color?: string;
    height?: string;
    dotSize?: string;
    gapSize?: string;
    direction?: "horizontal" | "vertical";
}

export const DottedSeparator = ({
    className,
    height = "2px",
    dotSize = "2px",
    gapSize = "6px",
    direction = "horizontal"
}: DottedSeparatorProps) => {
    const isHorizontal = direction === "horizontal";

    return (
        <div className={cn(
            isHorizontal ? "w-full flex items-center" : "h-full flex felx-col items-center",
            className,
        )}>
            <div 
              className={isHorizontal ? "flex-grow" : "flex-grow-0"}
              style={{
                width: isHorizontal ? "100%" : height,
                height: isHorizontal ? height : "100%",
                backgroundSize: isHorizontal
                    ? `${parseInt(dotSize) + parseInt(gapSize)}px ${height}`
                    : `${height} ${parseInt(dotSize) + parseInt(gapSize)}px`,
                backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
                backgroundPosition: "center",
              }}
            />
        </div>
    )

};