import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar as CalendarIcon, Info, Plus, Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CharterPartyPanel } from "@/components/charter/CharterPartyPanel";

// ============== Nhãn giao diện - Tab Thuê tàu định hạn (chỉnh sửa tại đây) ==============
export const TC_LABELS = {
  tabVoyage: "Thuê chuyến",
  tabTime: "Thuê định hạn",
  mainTerms: "Điều khoản chính",
  recap: "Tóm tắt",
  attachment: "Đính kèm",
  title: "Chi tiết Thuê tàu định hạn",
  single: "Đơn",
  multi: "Nhiều",
  duration: "Thời hạn",
  minimum: "Tối thiểu",
  maximum: "Tối đa",
  day: "Ngày",
  month: "Tháng",
  year: "Năm",
  aboutMeans: "'About' nghĩa là",
  layCan: "Lay / Can",
  delArea: "Nơi giao tàu",
  redelArea: "Nơi trả tàu",
  area: "Khu vực",
  port: "Cảng",
  estSchedule: "Lịch dự kiến",
  actSchedule: "Lịch thực tế",
  hire: "Giá thuê",
  customHire: "Tuỳ chọn giá thuê",
  addComm: "Phí hoa hồng",
  ballastBonus: "Phụ phí ballast",
  cev: "C. E. V.",
  inLumpsum: "Trọn gói",
  perDay: "/ ngày",
  per30Days: "/ 30 ngày",
  perMonth: "/ tháng",
  perYear: "/ năm",
  ilohc: "ILOHC",
  bunker: "Nhiên liệu",
  borToBe: "BOR sẽ là",
  aboutSameBod: "Tương đương BOD",
  type: "Loại",
  quantity: "Số lượng",
  bod: "BOD",
  bor: "BOR",
  unit: "Đơn vị",
  priceBothEnds: "Giá tại 2 đầu",
  unitPrice: "Đơn giá",
  perMt: "trên MT",
  brokerage: "Phí môi giới",
  brokerageRate: "Tỷ lệ phí",
  beneficiary: "Bên thụ hưởng",
  cancel: "Huỷ",
  save: "Lưu",
  pickDate: "Chọn ngày",
  search: "Tìm kiếm",
};

const CURRENCIES = ["USD", "EUR", "VND", "JPY", "SGD", "GBP"];
const GMT_OFFSETS = [
  ...Array.from({ length: 13 }, (_, i) => `+${String(i).padStart(2, "0")}:00`),
  ...Array.from({ length: 13 }, (_, i) => `-${String(i).padStart(2, "0")}:00`),
];

export const Route = createFileRoute("/time-charter")({
  head: () => ({
    meta: [
      { title: "Thuê tàu định hạn" },
      { name: "description", content: "Nhập các điều khoản chính của hợp đồng thuê tàu định hạn." },
    ],
  }),
  component: TimeCharterPage,
});

function FieldRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 items-start py-1.5">
      <div className="text-sm pt-2">{label}</div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

function IconBtn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
    >
      {children}
    </button>
  );
}

function DateInput({ value, placeholder, w = "w-44" }: { value?: string; placeholder?: string; w?: string }) {
  return (
    <div className="relative">
      <Input defaultValue={value} placeholder={placeholder} className={`${w} pr-9 h-9`} />
      <IconBtn title={TC_LABELS.pickDate}><CalendarIcon className="h-4 w-4" /></IconBtn>
    </div>
  );
}

function CurrencySelect({ defaultValue = "USD" }: { defaultValue?: string }) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="w-24 h-9"><SelectValue /></SelectTrigger>
      <SelectContent>
        {CURRENCIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

function PeriodSelect({ defaultValue = "day" }: { defaultValue?: string }) {
  const L = TC_LABELS;
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="w-28 h-9"><SelectValue /></SelectTrigger>
      <SelectContent>
        <SelectItem value="day">{L.perDay}</SelectItem>
        <SelectItem value="month">{L.perMonth}</SelectItem>
        <SelectItem value="year">{L.perYear}</SelectItem>
      </SelectContent>
    </Select>
  );
}

type BunkerRow = { type: string; bod: string; bor: string; price: string };
type BrokerRow = { rate: string; beneficiary: string };

function TimeCharterPage() {
  const L = TC_LABELS;
  const [activeTab, setActiveTab] = React.useState<"main" | "recap" | "attachment">("main");
  const [bunkerRows, setBunkerRows] = React.useState<BunkerRow[]>([
    { type: "", bod: "", bor: "", price: "" },
  ]);
  const [brokerRows, setBrokerRows] = React.useState<BrokerRow[]>([
    { rate: "", beneficiary: "" },
  ]);

  const addBunker = (i: number) => {
    const n = [...bunkerRows];
    n.splice(i + 1, 0, { type: "", bod: "", bor: "", price: "" });
    setBunkerRows(n);
  };
  const removeBunker = (i: number) => {
    if (bunkerRows.length === 1) { setBunkerRows([{ type: "", bod: "", bor: "", price: "" }]); return; }
    setBunkerRows(bunkerRows.filter((_, idx) => idx !== i));
  };
  const addBroker = (i: number) => {
    const n = [...brokerRows];
    n.splice(i + 1, 0, { rate: "", beneficiary: "" });
    setBrokerRows(n);
  };
  const removeBroker = (i: number) => {
    if (brokerRows.length === 1) { setBrokerRows([{ rate: "", beneficiary: "" }]); return; }
    setBrokerRows(brokerRows.filter((_, idx) => idx !== i));
  };

  const tabBtn = (key: typeof activeTab, label: string) => (
    <button
      type="button"
      onClick={() => setActiveTab(key)}
      className={`px-4 py-2 text-sm rounded-t-md border-b-2 transition-colors ${
        activeTab === key
          ? "border-primary text-primary font-semibold bg-background"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-4 flex gap-2">
          <Link to="/voyage-charter" className="text-sm text-muted-foreground px-3 py-1.5 hover:text-foreground">{L.tabVoyage}</Link>
          <Link to="/time-charter" className="text-sm font-semibold border-b-2 border-primary px-3 py-1.5">{L.tabTime}</Link>
        </div>

        <div className="mb-2 flex gap-1 border-b">
          {tabBtn("main", L.mainTerms)}
          {tabBtn("recap", L.recap)}
          {tabBtn("attachment", L.attachment)}
        </div>

        {activeTab !== "main" && (
          <div className="mt-6 rounded-md border bg-card p-10 text-center text-muted-foreground">
            {activeTab === "recap" ? L.recap : L.attachment}
          </div>
        )}

        {activeTab === "main" && (
        <div className="grid grid-cols-1 lg:grid-cols-[494px_1fr] gap-6 mt-4">
          <CharterPartyPanel
            contractNumber="Seafuture 2022"
            vessel="NETPAS"
            owners="Netpas"
            cpDate="2022-10-13"
            showTc
            showManager
          />

          <div className="rounded-md border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b pb-3 mb-4">
              <h2 className="text-base font-bold">{L.title}</h2>
              <Select defaultValue="single">
                <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">{L.single}</SelectItem>
                  <SelectItem value="multi">{L.multi}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <FieldRow label={L.duration}>
              <Select defaultValue="min"><SelectTrigger className="w-28 h-9"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="min">{L.minimum}</SelectItem></SelectContent>
              </Select>
              <Input className="w-28 h-9" />
              <Select defaultValue="day"><SelectTrigger className="w-24 h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">{L.day}</SelectItem>
                  <SelectItem value="month">{L.month}</SelectItem>
                  <SelectItem value="year">{L.year}</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground">-</span>
              <Select defaultValue="max"><SelectTrigger className="w-28 h-9"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="max">{L.maximum}</SelectItem></SelectContent>
              </Select>
              <Input className="w-28 h-9" />
              <Select defaultValue="day"><SelectTrigger className="w-24 h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">{L.day}</SelectItem>
                  <SelectItem value="month">{L.month}</SelectItem>
                  <SelectItem value="year">{L.year}</SelectItem>
                </SelectContent>
              </Select>
            </FieldRow>

            <div className="grid grid-cols-[140px_1fr] gap-3 items-center py-1.5">
              <div />
              <div className="flex items-center gap-2">
                <Input placeholder={L.aboutMeans} className="w-28 h-9" disabled />
                <Input className="w-28 h-9" disabled />
                <Select disabled><SelectTrigger className="w-24 h-9"><SelectValue placeholder={L.day} /></SelectTrigger><SelectContent /></Select>
              </div>
            </div>

            <FieldRow label={L.layCan}>
              <DateInput value="2022-10-13 00:01" />
              <span className="text-muted-foreground">-</span>
              <DateInput value="2022-10-14 23:59" />
              <Select defaultValue="+00:00">
                <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {GMT_OFFSETS.map((g) => <SelectItem key={g} value={g}>GMT {g}</SelectItem>)}
                </SelectContent>
              </Select>
            </FieldRow>

            <FieldRow label={L.delArea}>
              <Select><SelectTrigger className="w-28 h-9"><SelectValue placeholder="" /></SelectTrigger><SelectContent><SelectItem value="a">{L.area}</SelectItem></SelectContent></Select>
              <Input defaultValue="Incheon (KR) [+09:00]" className="w-56 h-9" />
              <Info className="h-4 w-4 text-primary" />
            </FieldRow>

            <FieldRow label={L.redelArea}>
              <Select><SelectTrigger className="w-28 h-9"><SelectValue placeholder="" /></SelectTrigger><SelectContent><SelectItem value="a">{L.area}</SelectItem></SelectContent></Select>
              <Input defaultValue="London (GB) [+00:00]" className="w-56 h-9" />
              <Info className="h-4 w-4 text-primary" />
            </FieldRow>

            <FieldRow label={L.estSchedule}>
              <DateInput value="2022-10-27 01:37" />
              <span className="text-muted-foreground">-</span>
              <DateInput />
            </FieldRow>

            <FieldRow label={L.actSchedule}>
              <DateInput />
              <span className="text-muted-foreground">-</span>
              <DateInput />
            </FieldRow>

            {/* Hire | Custom hire */}
            <FieldRow label={L.hire}>
              <Input className="w-40 h-9 text-right" />
              <CurrencySelect />
              <PeriodSelect />
              <Input placeholder={L.customHire} className="w-56 h-9" />
            </FieldRow>

            {/* Phí hoa hồng | Phụ phí ballast */}
            <FieldRow label={L.addComm}>
              <Input className="w-40 h-9 text-right" />
              <CurrencySelect />
              <span className="ml-6 text-sm w-32">{L.ballastBonus}</span>
              <div className="relative">
                <Input className="w-40 h-9 pl-8 text-right" />
                <button type="button" title={L.search} aria-label={L.search} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <Search className="h-4 w-4" />
                </button>
              </div>
              <CurrencySelect />
              <Select defaultValue="lump">
                <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="lump">{L.inLumpsum}</SelectItem></SelectContent>
              </Select>
            </FieldRow>

            {/* C.E.V | ILOHC */}
            <FieldRow label={L.cev}>
              <Input defaultValue="1,300.00" className="w-40 h-9 text-right" />
              <CurrencySelect />
              <Select defaultValue="lump">
                <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="lump">{L.inLumpsum}</SelectItem>
                  <SelectItem value="day">{L.perDay}</SelectItem>
                  <SelectItem value="30d">{L.per30Days}</SelectItem>
                </SelectContent>
              </Select>
              <span className="ml-6 text-sm w-32">{L.ilohc}</span>
              <Input defaultValue="4,500.00" className="w-40 h-9 text-right" />
              <CurrencySelect />
            </FieldRow>

            {/* Phí môi giới */}
            <FieldRow label={L.brokerage}>
              <div className="overflow-hidden rounded border w-full max-w-2xl">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border px-2 py-1 font-medium">{L.brokerageRate}</th>
                      <th className="border px-2 py-1 font-medium">{L.beneficiary}</th>
                      <th className="border px-2 py-1 w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {brokerRows.map((row, i) => (
                      <tr key={i}>
                        <td className="border px-2 py-1">
                          <Input value={row.rate} onChange={(e) => { const n = [...brokerRows]; n[i].rate = e.target.value; setBrokerRows(n); }} className="h-7 border-0 text-right shadow-none focus-visible:ring-0" />
                        </td>
                        <td className="border px-2 py-1">
                          <Input value={row.beneficiary} onChange={(e) => { const n = [...brokerRows]; n[i].beneficiary = e.target.value; setBrokerRows(n); }} className="h-7 border-0 shadow-none focus-visible:ring-0" />
                        </td>
                        <td className="border px-2 py-1">
                          <div className="flex gap-1 justify-center">
                            <button type="button" onClick={() => addBroker(i)} className="text-emerald-600 hover:text-emerald-700"><Plus className="h-4 w-4" /></button>
                            <button type="button" onClick={() => removeBroker(i)} className="text-rose-600 hover:text-rose-700"><Minus className="h-4 w-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FieldRow>

            <FieldRow label={L.bunker}>
              <span className="text-sm">{L.borToBe}</span>
              <Select defaultValue="same"><SelectTrigger className="w-56 h-9"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="same">{L.aboutSameBod}</SelectItem></SelectContent>
              </Select>
            </FieldRow>

            <div className="grid grid-cols-[140px_1fr] gap-3 items-start py-1.5">
              <div />
              <div className="overflow-hidden rounded border w-full max-w-2xl">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th rowSpan={2} className="border px-2 py-1 font-medium">{L.type}</th>
                      <th colSpan={3} className="border px-2 py-1 font-medium">{L.quantity}</th>
                      <th colSpan={2} className="border px-2 py-1 font-medium">{L.priceBothEnds}</th>
                      <th className="border px-2 py-1 w-16"></th>
                    </tr>
                    <tr>
                      <th className="border px-2 py-1 font-normal">{L.bod}</th>
                      <th className="border px-2 py-1 font-normal">{L.bor}</th>
                      <th className="border px-2 py-1 font-normal">{L.unit}</th>
                      <th className="border px-2 py-1 font-normal">{L.unitPrice}</th>
                      <th className="border px-2 py-1 font-normal">{L.unit}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bunkerRows.map((row, i) => (
                      <tr key={i}>
                        <td className="border px-2 py-1"><Input value={row.type} onChange={(e) => { const n = [...bunkerRows]; n[i].type = e.target.value; setBunkerRows(n); }} className="h-7 border-0 shadow-none focus-visible:ring-0" /></td>
                        <td className="border px-2 py-1"><Input value={row.bod} onChange={(e) => { const n = [...bunkerRows]; n[i].bod = e.target.value; setBunkerRows(n); }} className="h-7 border-0 text-right shadow-none focus-visible:ring-0" /></td>
                        <td className="border px-2 py-1"><Input value={row.bor} onChange={(e) => { const n = [...bunkerRows]; n[i].bor = e.target.value; setBunkerRows(n); }} className="h-7 border-0 text-right shadow-none focus-visible:ring-0" /></td>
                        <td className="border px-2 py-1 text-center">MT</td>
                        <td className="border px-2 py-1"><Input value={row.price} onChange={(e) => { const n = [...bunkerRows]; n[i].price = e.target.value; setBunkerRows(n); }} className="h-7 border-0 text-right shadow-none focus-visible:ring-0" /></td>
                        <td className="border px-2 py-1 bg-yellow-50 text-center">{L.perMt}</td>
                        <td className="border px-2 py-1">
                          <div className="flex gap-1 justify-center">
                            <button type="button" onClick={() => addBunker(i)} className="text-emerald-600 hover:text-emerald-700"><Plus className="h-4 w-4" /></button>
                            <button type="button" onClick={() => removeBunker(i)} className="text-rose-600 hover:text-rose-700"><Minus className="h-4 w-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-6 border-t mt-6">
              <Button>{L.save}</Button>
              <Button variant="outline">{L.cancel}</Button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
