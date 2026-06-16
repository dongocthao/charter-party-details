import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar as CalendarIcon, Info, Plus, Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/time-charter")({
  head: () => ({
    meta: [
      { title: "Time Charter Details" },
      { name: "description", content: "Input the main terms of Time Charter." },
    ],
  }),
  component: TimeCharterPage,
});

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium text-foreground pt-2">{children}</div>;
}

function FieldRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-3 items-start py-1.5">
      <Label>{label}</Label>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

function DateInput({ value, placeholder }: { value?: string; placeholder?: string }) {
  return (
    <div className="relative">
      <Input defaultValue={value} placeholder={placeholder} className="w-48 pr-9 h-9" />
      <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function TimeCharterPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex gap-2">
          <Link to="/time-charter" className="text-sm font-semibold border-b-2 border-primary px-3 py-1.5">Time Charter</Link>
          <Link to="/voyage-charter" className="text-sm text-muted-foreground px-3 py-1.5 hover:text-foreground">Voyage Charter</Link>
        </div>

        <div className="rounded-md border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b pb-3 mb-4">
            <h2 className="text-base font-bold">Time Charter Details</h2>
            <Select defaultValue="single">
              <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="multi">Multi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <FieldRow label="Duration">
            <Select defaultValue="min"><SelectTrigger className="w-28 h-9"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="min">Minimum</SelectItem></SelectContent>
            </Select>
            <Input className="w-28 h-9" />
            <Select defaultValue="day"><SelectTrigger className="w-24 h-9"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="day">Day</SelectItem><SelectItem value="month">Month</SelectItem></SelectContent>
            </Select>
            <span className="text-muted-foreground">-</span>
            <Select defaultValue="max"><SelectTrigger className="w-28 h-9"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="max">Maximum</SelectItem></SelectContent>
            </Select>
            <Input className="w-28 h-9" />
            <Select defaultValue="day"><SelectTrigger className="w-24 h-9"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="day">Day</SelectItem></SelectContent>
            </Select>
          </FieldRow>

          <div className="grid grid-cols-[160px_1fr] gap-3 items-center py-1.5">
            <div />
            <div className="flex items-center gap-2">
              <Input placeholder="'About' Means" className="w-28 h-9" disabled />
              <Input className="w-28 h-9" disabled />
              <Select disabled><SelectTrigger className="w-24 h-9"><SelectValue placeholder="Day" /></SelectTrigger><SelectContent /></Select>
            </div>
          </div>

          <FieldRow label="Lay / Can">
            <DateInput value="2022-10-13 00:01" />
            <span className="text-muted-foreground">-</span>
            <DateInput value="2022-10-14 23:59" />
            <Select defaultValue="gmt"><SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="gmt">GMT +00:00</SelectItem></SelectContent>
            </Select>
          </FieldRow>

          <FieldRow label="Del Area or Port">
            <Select><SelectTrigger className="w-32 h-9"><SelectValue placeholder="" /></SelectTrigger><SelectContent><SelectItem value="a">Area</SelectItem></SelectContent></Select>
            <Input defaultValue="Incheon (KR) [+09:00]" className="w-64 h-9" />
            <Info className="h-4 w-4 text-primary" />
          </FieldRow>

          <FieldRow label="Redel Area or Port">
            <Select><SelectTrigger className="w-32 h-9"><SelectValue placeholder="" /></SelectTrigger><SelectContent><SelectItem value="a">Area</SelectItem></SelectContent></Select>
            <Input defaultValue="London (GB) [+00:00]" className="w-64 h-9" />
            <Info className="h-4 w-4 text-primary" />
          </FieldRow>

          <FieldRow label="Estimated Schedule">
            <DateInput value="2022-10-27 01:37" />
            <span className="text-muted-foreground">-</span>
            <DateInput />
          </FieldRow>

          <FieldRow label="Actual Schedule">
            <DateInput />
            <span className="text-muted-foreground">-</span>
            <DateInput />
          </FieldRow>

          <FieldRow label="Hire">
            <Input className="w-64 h-9" />
          </FieldRow>
          <div className="grid grid-cols-[160px_1fr] gap-3 items-center py-1.5">
            <div />
            <Input placeholder="Input custom hire option." className="w-64 h-9" />
          </div>

          <FieldRow label="Add. Comm.">
            <Input className="w-40 h-9" />
          </FieldRow>

          <FieldRow label="Ballast Bonus">
            <div className="relative">
              <Input className="w-40 h-9 pl-8" />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </FieldRow>

          <FieldRow label="C. E. V.">
            <Input defaultValue="1,300.00" className="w-40 h-9 text-right" />
            <Select defaultValue="lump"><SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="lump">in Lumpsum</SelectItem></SelectContent>
            </Select>
          </FieldRow>

          <FieldRow label="ILOHC">
            <Input defaultValue="4,500.00" className="w-40 h-9 text-right" />
          </FieldRow>

          <FieldRow label="Bunker">
            <span className="text-sm">BOR to be</span>
            <Select defaultValue="same"><SelectTrigger className="w-56 h-9"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="same">About Same As On BOD</SelectItem></SelectContent>
            </Select>
          </FieldRow>

          <div className="grid grid-cols-[160px_1fr] gap-3 items-start py-1.5">
            <div />
            <div className="overflow-hidden rounded border w-full max-w-2xl">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th rowSpan={2} className="border px-2 py-1 font-medium">Type</th>
                    <th colSpan={3} className="border px-2 py-1 font-medium">Quantity</th>
                    <th colSpan={2} className="border px-2 py-1 font-medium">Price at both ends</th>
                    <th className="border px-2 py-1 w-16"></th>
                  </tr>
                  <tr>
                    <th className="border px-2 py-1 font-normal">BOD</th>
                    <th className="border px-2 py-1 font-normal">BOR</th>
                    <th className="border px-2 py-1 font-normal">Unit</th>
                    <th className="border px-2 py-1 font-normal">Unit Price</th>
                    <th className="border px-2 py-1 font-normal">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1"><Input className="h-7 border-0" /></td>
                    <td className="border px-2 py-1"><Input className="h-7 border-0 text-right" /></td>
                    <td className="border px-2 py-1"><Input className="h-7 border-0 text-right" /></td>
                    <td className="border px-2 py-1 text-center">MT</td>
                    <td className="border px-2 py-1"><Input className="h-7 border-0 text-right" /></td>
                    <td className="border px-2 py-1 bg-yellow-50 text-center">per MT</td>
                    <td className="border px-2 py-1">
                      <div className="flex gap-1 justify-center">
                        <button className="text-emerald-600"><Plus className="h-4 w-4" /></button>
                        <button className="text-rose-600"><Minus className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-6 border-t mt-6">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
