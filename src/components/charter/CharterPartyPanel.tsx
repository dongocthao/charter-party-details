import { Calendar as CalendarIcon, Save, X, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-foreground/90 pt-2">{children}</div>;
}

export function CharterPartyPanel({
  contractNumber,
  vessel,
  owners,
  charterers,
  cpForm,
  cpDate,
  showTc = false,
  showRelet = false,
  showManager = false,
}: {
  contractNumber?: string;
  vessel?: string;
  owners?: string;
  charterers?: string;
  cpForm?: string;
  cpDate?: string;
  showTc?: boolean;
  showRelet?: boolean;
  showManager?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <fieldset className="rounded border bg-card p-4">
        <legend className="px-2 text-sm font-semibold">Charter Party Details</legend>
        <div className="grid grid-cols-[110px_1fr] gap-x-3 gap-y-2 items-center">
          <FieldLabel>Contract Number</FieldLabel>
          <Input defaultValue={contractNumber} className="h-9" />

          <FieldLabel>Vessel</FieldLabel>
          <div className="relative">
            <Input defaultValue={vessel} className="h-9 pr-20" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground">
              <Save className="h-4 w-4" />
              <X className="h-4 w-4" />
              <List className="h-4 w-4" />
            </div>
          </div>

          <FieldLabel>Owners</FieldLabel>
          {showManager ? (
            <div className="flex gap-2">
              <Input defaultValue={owners} className="h-9 flex-1" />
              <Select defaultValue="manager">
                <SelectTrigger className="h-9 w-32"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="manager">Manager</SelectItem></SelectContent>
              </Select>
            </div>
          ) : (
            <Input defaultValue={owners} className="h-9" />
          )}

          <FieldLabel>Charterers</FieldLabel>
          <div className="relative">
            <Input defaultValue={charterers} className="h-9 pr-9" />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <FieldLabel>CP Form</FieldLabel>
          <Input defaultValue={cpForm} className="h-9" />

          <FieldLabel>CP Date</FieldLabel>
          <div className="relative">
            <Input defaultValue={cpDate} className="h-9 pr-9" />
            <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <FieldLabel>Status</FieldLabel>
          <Select defaultValue="standby">
            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="standby">Standby</SelectItem>
              <SelectItem value="fixed">Fixed</SelectItem>
            </SelectContent>
          </Select>

          {showTc && (
            <>
              <FieldLabel>TC</FieldLabel>
              <Select defaultValue="in">
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="in">In</SelectItem>
                  <SelectItem value="out">Out</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}

          {showRelet && (
            <>
              <FieldLabel>Relet</FieldLabel>
              <input type="checkbox" className="h-4 w-4" />
            </>
          )}
        </div>
      </fieldset>

      <fieldset className="rounded border bg-card p-4 flex-1 min-h-[200px] flex flex-col">
        <legend className="px-2 text-sm font-semibold">Remark</legend>
        <Textarea className="flex-1 min-h-[180px] resize-none" />
      </fieldset>
    </div>
  );
}
