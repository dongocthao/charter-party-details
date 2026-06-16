import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar as CalendarIcon, Info, Plus, Minus, Search, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/voyage-charter")({
  head: () => ({
    meta: [
      { title: "Voyage Charter Details" },
      { name: "description", content: "Input the main terms of Voyage Charter." },
    ],
  }),
  component: VoyageCharterPage,
});

function FieldRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 items-start py-2">
      <div className="text-sm font-medium pt-2">{label}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function DateInput({ value }: { value?: string }) {
  return (
    <div className="relative inline-block">
      <Input defaultValue={value} className="w-44 pr-9 h-9" />
      <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function PortTable({ title }: { title: string }) {
  return (
    <div className="overflow-hidden rounded border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th rowSpan={2} className="border px-2 py-1 font-medium w-56">Port</th>
            <th colSpan={2} className="border px-2 py-1 font-medium">Laytime</th>
            <th colSpan={2} className="border px-2 py-1 font-medium">Freight Tax</th>
            <th className="border w-16"></th>
          </tr>
          <tr>
            <th className="border px-2 py-1 font-normal" colSpan={2}>Detention</th>
            <th className="border px-2 py-1 font-normal" colSpan={2}>Liner Term</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={2} className="border px-2 py-1 align-middle">
              <div className="flex items-center gap-2">
                <span>{title} (ID) [+08:00]</span>
                <Info className="h-4 w-4 text-primary" />
              </div>
            </td>
            <td className="border px-2 py-1 bg-yellow-50"><div className="flex items-center"><Search className="h-3.5 w-3.5 text-muted-foreground" /><Input className="h-7 border-0 bg-transparent" /></div></td>
            <td className="border px-2 py-1 bg-yellow-50 text-right">per Days</td>
            <td className="border px-2 py-1 bg-yellow-50"><div className="flex items-center"><Search className="h-3.5 w-3.5 text-muted-foreground" /><Input className="h-7 border-0 bg-transparent" /></div></td>
            <td className="border px-2 py-1 bg-yellow-50"></td>
            <td rowSpan={2} className="border px-2 py-1">
              <div className="flex gap-1 justify-center"><button className="text-emerald-600"><Plus className="h-4 w-4" /></button><button className="text-rose-600"><Minus className="h-4 w-4" /></button></div>
            </td>
          </tr>
          <tr>
            <td className="border px-2 py-1 bg-yellow-50"><Input className="h-7 border-0 bg-transparent" /></td>
            <td className="border px-2 py-1 bg-yellow-50 text-right">per Days</td>
            <td className="border px-2 py-1 bg-yellow-50"><Input className="h-7 border-0 bg-transparent" /></td>
            <td className="border px-2 py-1 bg-yellow-50 text-right">in Lumpsum</td>
          </tr>
          <tr>
            <td rowSpan={2} className="border px-2 py-1 text-center"><Pencil className="h-4 w-4 inline text-primary" /></td>
            <td className="border px-2 py-1 bg-yellow-50"><Input className="h-7 border-0 bg-transparent" /></td>
            <td className="border px-2 py-1 bg-yellow-50 text-right">per Days</td>
            <td className="border px-2 py-1 bg-yellow-50"><Input className="h-7 border-0 bg-transparent" /></td>
            <td className="border px-2 py-1 bg-yellow-50"></td>
            <td rowSpan={2} className="border px-2 py-1">
              <div className="flex gap-1 justify-center"><button className="text-emerald-600"><Plus className="h-4 w-4" /></button><button className="text-rose-600"><Minus className="h-4 w-4" /></button></div>
            </td>
          </tr>
          <tr>
            <td className="border px-2 py-1 bg-yellow-50"><Input className="h-7 border-0 bg-transparent" /></td>
            <td className="border px-2 py-1 bg-yellow-50 text-right">per Days</td>
            <td className="border px-2 py-1 bg-yellow-50"><Input className="h-7 border-0 bg-transparent" /></td>
            <td className="border px-2 py-1 bg-yellow-50"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function VoyageCharterPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex gap-2">
          <Link to="/time-charter" className="text-sm text-muted-foreground px-3 py-1.5 hover:text-foreground">Time Charter</Link>
          <Link to="/voyage-charter" className="text-sm font-semibold border-b-2 border-primary px-3 py-1.5">Voyage Charter</Link>
        </div>

        <div className="rounded-md border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b pb-3 mb-4">
            <h2 className="text-base font-bold">Voyage Charter Details</h2>
            <Select defaultValue="single">
              <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="single">Single</SelectItem><SelectItem value="multi">Multi</SelectItem></SelectContent>
            </Select>
          </div>

          <FieldRow label="Shipment">
            <div className="overflow-hidden rounded border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="border px-2 py-1 font-medium">Cargo</th>
                    <th className="border px-2 py-1 font-medium">Quantity</th>
                    <th className="border px-2 py-1 font-medium w-20">Unit</th>
                    <th className="border px-2 py-1 font-medium">Margin</th>
                    <th className="border w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1"><Input defaultValue="coal in blk" className="h-7 border-0" /></td>
                    <td className="border px-2 py-1"><Input defaultValue="55,000.00" className="h-7 border-0 text-right" /></td>
                    <td className="border px-2 py-1 text-center">MT</td>
                    <td className="border px-2 py-1"><Input className="h-7 border-0" /></td>
                    <td className="border px-2 py-1"><div className="flex gap-1 justify-center"><button className="text-emerald-600"><Plus className="h-4 w-4" /></button><button className="text-rose-600"><Minus className="h-4 w-4" /></button></div></td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1"><Input className="h-7 border-0" /></td>
                    <td className="border px-2 py-1"><Input className="h-7 border-0 text-right" /></td>
                    <td className="border px-2 py-1"></td>
                    <td className="border px-2 py-1"><Input className="h-7 border-0" /></td>
                    <td className="border px-2 py-1"><div className="flex gap-1 justify-center"><button className="text-emerald-600"><Plus className="h-4 w-4" /></button><button className="text-rose-600"><Minus className="h-4 w-4" /></button></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FieldRow>

          <FieldRow label="Lay / Can">
            <div className="flex flex-wrap items-center gap-2">
              <DateInput value="2022-10-12 00:01" />
              <span className="text-muted-foreground">-</span>
              <DateInput value="2022-10-13 23:59" />
              <Select defaultValue="gmt"><SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="gmt">GMT +00:00</SelectItem></SelectContent>
              </Select>
            </div>
          </FieldRow>

          <FieldRow label="Loading Port"><PortTable title="Taboneo" /></FieldRow>
          <FieldRow label="Discharging Port"><PortTable title="Port" /></FieldRow>

          <FieldRow label="Freight">
            <div className="overflow-hidden rounded border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="border px-2 py-1 font-medium">Freight</th>
                    <th className="border px-2 py-1 font-medium">Unit</th>
                    <th className="border px-2 py-1 font-medium">Term</th>
                    <th className="border px-2 py-1 font-medium" colSpan={2}>Based On</th>
                    <th className="border w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1"><Input defaultValue="27.00" className="h-7 border-0 text-right" /></td>
                    <td className="border px-2 py-1"><Select defaultValue="mt"><SelectTrigger className="h-7 border-0"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="mt">per MT</SelectItem></SelectContent></Select></td>
                    <td className="border px-2 py-1">FIO</td>
                    <td className="border px-2 py-1">Base On</td>
                    <td className="border px-2 py-1"><Input className="h-7 border-0" /> /</td>
                    <td className="border px-2 py-1"><div className="flex gap-1 justify-center"><button className="text-emerald-600"><Plus className="h-4 w-4" /></button><button className="text-rose-600"><Minus className="h-4 w-4" /></button></div></td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1"></td>
                    <td className="border px-2 py-1"></td>
                    <td className="border px-2 py-1"></td>
                    <td className="border px-2 py-1">Base On</td>
                    <td className="border px-2 py-1"><Input className="h-7 border-0" /> /</td>
                    <td className="border px-2 py-1"><div className="flex gap-1 justify-center"><button className="text-emerald-600"><Plus className="h-4 w-4" /></button><button className="text-rose-600"><Minus className="h-4 w-4" /></button></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FieldRow>

          <FieldRow label="Add Comm.">
            <div className="flex items-center gap-2"><Input defaultValue="2.50" className="w-32 h-9 text-right" /><span>%</span></div>
          </FieldRow>

          <FieldRow label="Brokerage">
            <div className="overflow-hidden rounded border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="border px-2 py-1 font-medium">Account</th>
                    <th className="border px-2 py-1 font-medium" colSpan={2}>Brokerage</th>
                    <th className="border w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={2} className="border px-2 py-1"><Input className="h-7 border-0" /></td>
                    <td className="border px-2 py-1"><Input className="h-7 border-0 text-right" /></td>
                    <td className="border px-2 py-1">Percent</td>
                    <td className="border px-2 py-1"><div className="flex gap-1 justify-center"><button className="text-emerald-600"><Plus className="h-4 w-4" /></button><button className="text-rose-600"><Minus className="h-4 w-4" /></button></div></td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1"><Input className="h-7 border-0 text-right" /></td>
                    <td className="border px-2 py-1">Percent</td>
                    <td className="border px-2 py-1"><div className="flex gap-1 justify-center"><button className="text-emerald-600"><Plus className="h-4 w-4" /></button><button className="text-rose-600"><Minus className="h-4 w-4" /></button></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FieldRow>

          <div className="flex justify-end gap-2 pt-6 border-t mt-6">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
