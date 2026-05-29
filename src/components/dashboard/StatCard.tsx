import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  helperText?: string;
  icon?: ReactNode;
};

export function StatCard({ label, value, helperText, icon }: StatCardProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
        </div>

        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-slate-600">
            {icon}
          </div>
        )}
      </div>

      {helperText && (
        <p className="mt-3 text-xs text-slate-500">{helperText}</p>
      )}
    </div>
  );
}