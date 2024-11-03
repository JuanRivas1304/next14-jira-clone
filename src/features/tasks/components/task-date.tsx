import { differenceInDays, format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskDateProps {
    value: string; // Suponiendo que value es una cadena de fecha
    className?: string;
};

export const TaskDate = ({ value, className }: TaskDateProps) => {
    const today = new Date();
    const endDate = new Date(value); // Convertir la cadena a objeto Date
    const diffInDays = differenceInDays(endDate, today);

    let textColor = "text-muted-foreground";
    if (diffInDays <= 3) {
        textColor = "text-red-500";
    } else if (diffInDays <= 7) {
        textColor = "text-orange-500";
    } else if (diffInDays <= 14) {
        textColor = "text-yellow-500";
    }

    return (
        <div className={textColor}>
            <span className={cn("truncate", className)}>
                {format(endDate, "PPP")} {/* Usar endDate en lugar de value */}
            </span>
        </div>
    );
};
