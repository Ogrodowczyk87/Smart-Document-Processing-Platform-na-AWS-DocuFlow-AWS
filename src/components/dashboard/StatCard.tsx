import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  helperText?: string;
  icon?: ReactNode;
  tone?: "ink" | "teal" | "amber" | "coral" | "paper";
};

const toneClasses = {
  ink: "border-[#2d4540] bg-[#213531] text-white",
  teal: "border-[#b6ddd7] bg-[#e8f5f2] text-[#135d57]",
  amber: "border-[#efd7a8] bg-[#fff5df] text-[#8a5a13]",
  coral: "border-[#efc4b8] bg-[#fff0ec] text-[#a44735]",
  paper: "border-[#ddd9cf] bg-[#fffefa] text-[#273936]",
};

export function StatCard({
  label,
  value,
  helperText,
  icon,
  tone = "paper",
}: StatCardProps) {
  return (
    <div className={`border p-4 ${toneClasses[tone]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.13em] opacity-70">
            {label}
          </p>
          <p className="mt-4 text-3xl font-semibold">{value}</p>
        </div>

        {icon && (
          <div className="flex h-9 w-9 items-center justify-center bg-white/50">
            {icon}
          </div>
        )}
      </div>

      {helperText && (
        <p className="mt-3 text-xs opacity-70">{helperText}</p>
      )}
    </div>
  );
}
