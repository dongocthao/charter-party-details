import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const DEFAULT_PORTS = [
  "Vostochny (RU) [+10:00]",
  "Lanshan (CN) [+08:00]",
  "Taboneo (ID) [+08:00]",
  "Incheon (KR) [+09:00]",
  "London (GB) [+00:00]",
  "Singapore (SG) [+08:00]",
  "Rotterdam (NL) [+01:00]",
];

export function PortCombobox({
  value,
  onChange,
  options = DEFAULT_PORTS,
  placeholder = "Select or type port...",
}: {
  value: string;
  onChange: (v: string) => void;
  options?: string[];
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const filtered = options.filter((o) =>
    o.toLowerCase().includes((value || "").toLowerCase()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="h-7 border-0 bg-transparent pr-7 shadow-none focus-visible:ring-0"
        />
        <PopoverTrigger asChild>
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="p-0 w-64" align="start">
        <ul className="max-h-56 overflow-auto py-1 text-sm">
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-muted-foreground">No matches</li>
          )}
          {filtered.map((opt) => (
            <li
              key={opt}
              className={cn(
                "flex items-center justify-between px-3 py-1.5 cursor-pointer hover:bg-accent",
                opt === value && "bg-accent/60",
              )}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              <span>{opt}</span>
              {opt === value && <Check className="h-3.5 w-3.5 text-primary" />}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
