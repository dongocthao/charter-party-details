import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar as CalendarIcon, Info, Plus, Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CharterPartyPanel } from "@/components/charter/CharterPartyPanel";
import { PortCombobox } from "@/components/charter/PortCombobox";

// ============== Nhãn giao diện - Tab Thuê chuyến (chỉnh sửa tại đây) ==============
export const VC_LABELS = {
  tabVoyage: "Thuê chuyến",
  tabTime: "Thuê định hạn",
  mainTerms: "Điều khoản chính",
  recap: "Tóm tắt",
  attachment: "Đính kèm",
  title: "Chi tiết Thuê chuyến",
  single: "Đơn",
  multi: "Nhiều",
  shipment: "Lô hàng",
  cargo: "Hàng hoá",
  quantity: "Số lượng",
  unit: "Đơn vị",
  margin: "Biên độ",
  layCan: "Lay / Can",
  loadingPort: "Cảng xếp hàng",
  dischargingPort: "Cảng dỡ hàng",
  port: "Cảng",
  laytime: "Thời gian xếp/dỡ",
  freightTax: "Thuế cước",
  detention: "Phạt chậm",
  linerTerm: "Điều khoản Liner",
  perDays: "trên ngày",
  inLumpsum: "Trọn gói",
  freight: "Cước",
  term: "Điều khoản",
  basedOn: "Dựa trên",
  baseOn: "Dựa trên",
  perMt: "trên MT",
  addComm: "Hoa hồng thêm",
  brokerage: "Hoa hồng môi giới",
  account: "Tài khoản",
  percent: "Phần trăm",
  cancel: "Huỷ",
  save: "Lưu",
  pickDate: "Chọn ngày",
  search: "Tìm kiếm",
};

export const Route = createFileRoute("/voyage-charter")({
  head: () => ({
    meta: [
      { title: "Thuê chuyến" },
      { name: "description", content: "Nhập các điều khoản chính của hợp đồng thuê chuyến." },
    ],
  }),
  component: VoyageCharterPage,
});

function FieldRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3 items-start py-2">
      <div className="text-sm pt-2">{label}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function DateInput({ value }: { value?: string }) {
  return (
    <div className="relative inline-block">
      <Input defaultValue={value} className="w-44 pr-9 h-9" />
      <button type="button" title={VC_LABELS.pickDate} aria-label={VC_LABELS.pickDate} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
        <CalendarIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

type ShipmentRow = { cargo: string; quantity: string; unit: string; margin: string };
type PortRow = { port: string };
type FreightRow = { freight: string; unit: string; term: string; baseOnA: string; baseOnB: string };
type BrokerageRow = { account: string; value: string };

function SearchBtn() {
  return (
    <button type="button" title={VC_LABELS.search} aria-label={VC_LABELS.search} className="text-muted-foreground hover:text-foreground">
      <Search className="h-3.5 w-3.5" />
    </button>
  );
}

function PortTable({ rows, setRows }: { rows: PortRow[]; setRows: (r: PortRow[]) => void }) {
  const L = VC_LABELS;
  const addRow = (i: number) => {
    const n = [...rows];
    n.splice(i + 1, 0, { port: "" });
    setRows(n);
  };
  const removeRow = (i: number) => {
    if (rows.length === 1) {
      setRows([{ port: "" }]);
      return;
    }
    setRows(rows.filter((_, idx) => idx !== i));
  };
  const update = (i: number, v: string) => {
    const n = [...rows];
    n[i] = { port: v };
    setRows(n);
  };

  return (
    <div className="overflow-hidden rounded border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th rowSpan={2} className="border px-2 py-1 font-medium w-64">{L.port}</th>
            <th colSpan={2} className="border px-2 py-1 font-medium">{L.laytime}</th>
            <th colSpan={2} className="border px-2 py-1 font-medium">{L.freightTax}</th>
            <th rowSpan={2} className="border w-16"></th>
          </tr>
          <tr>
            <th className="border px-2 py-1 font-normal" colSpan={2}>{L.detention}</th>
            <th className="border px-2 py-1 font-normal" colSpan={2}>{L.linerTerm}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <React.Fragment key={i}>
              <tr>
                <td rowSpan={2} className="border px-2 py-1 align-middle">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <PortCombobox value={row.port} onChange={(v) => update(i, v)} />
                    </div>
                    {row.port && <Info className="h-4 w-4 text-primary shrink-0" />}
                  </div>
                </td>
                <td className="border px-2 py-1 bg-yellow-50"><div className="flex items-center gap-1"><SearchBtn /><Input className="h-7 border-0 bg-transparent shadow-none focus-visible:ring-0" /></div></td>
                <td className="border px-2 py-1 bg-yellow-50 text-right text-xs">{L.perDays}</td>
                <td className="border px-2 py-1 bg-yellow-50"><div className="flex items-center gap-1"><SearchBtn /><Input className="h-7 border-0 bg-transparent shadow-none focus-visible:ring-0" /></div></td>
                <td className="border px-2 py-1 bg-yellow-50"></td>
                <td rowSpan={2} className="border px-2 py-1">
                  <div className="flex gap-1 justify-center">
                    <button type="button" onClick={() => addRow(i)} className="text-emerald-600"><Plus className="h-4 w-4" /></button>
                    <button type="button" onClick={() => removeRow(i)} className="text-rose-600"><Minus className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border px-2 py-1 bg-yellow-50"><Input className="h-7 border-0 bg-transparent shadow-none focus-visible:ring-0" /></td>
                <td className="border px-2 py-1 bg-yellow-50 text-right text-xs">{L.perDays}</td>
                <td className="border px-2 py-1 bg-yellow-50"><Input className="h-7 border-0 bg-transparent shadow-none focus-visible:ring-0" /></td>
                <td className="border px-2 py-1 bg-yellow-50 text-right text-xs">{L.inLumpsum}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VoyageCharterPage() {
  const L = VC_LABELS;
  const [activeTab, setActiveTab] = React.useState<"main" | "recap" | "attachment">("main");
  const [shipments, setShipments] = React.useState<ShipmentRow[]>([
    { cargo: "Coal in Bulk", quantity: "70,000.00", unit: "MT", margin: "10% MOLOO" },
    { cargo: "", quantity: "", unit: "", margin: "" },
  ]);
  const [loadingPorts, setLoadingPorts] = React.useState<PortRow[]>([{ port: "Vostochny (RU) [+10:00]" }]);
  const [dischargingPorts, setDischargingPorts] = React.useState<PortRow[]>([{ port: "Lanshan (CN) [+08:00]" }]);
  const [freightRows, setFreightRows] = React.useState<FreightRow[]>([
    { freight: "12.00", unit: "mt", term: "FIO", baseOnA: "1", baseOnB: "1" },
    { freight: "", unit: "", term: "", baseOnA: "", baseOnB: "" },
  ]);
  const [brokerageRows, setBrokerageRows] = React.useState<BrokerageRow[]>([
    { account: "Base Brokers", value: "1.25" },
    { account: "", value: "" },
  ]);

  const addShipment = (i: number) => {
    const n = [...shipments];
    n.splice(i + 1, 0, { cargo: "", quantity: "", unit: "", margin: "" });
    setShipments(n);
  };
  const removeShipment = (i: number) => {
    if (shipments.length === 1) return setShipments([{ cargo: "", quantity: "", unit: "", margin: "" }]);
    setShipments(shipments.filter((_, idx) => idx !== i));
  };

  const addFreight = (i: number) => {
    const n = [...freightRows];
    n.splice(i + 1, 0, { freight: "", unit: "", term: "", baseOnA: "", baseOnB: "" });
    setFreightRows(n);
  };
  const removeFreight = (i: number) => {
    if (freightRows.length === 1) return setFreightRows([{ freight: "", unit: "", term: "", baseOnA: "", baseOnB: "" }]);
    setFreightRows(freightRows.filter((_, idx) => idx !== i));
  };

  const addBrokerage = (i: number) => {
    const n = [...brokerageRows];
    n.splice(i + 1, 0, { account: "", value: "" });
    setBrokerageRows(n);
  };
  const removeBrokerage = (i: number) => {
    if (brokerageRows.length === 1) return setBrokerageRows([{ account: "", value: "" }]);
    setBrokerageRows(brokerageRows.filter((_, idx) => idx !== i));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-4 flex gap-2">
          <Link to="/voyage-charter" className="text-sm font-semibold border-b-2 border-primary px-3 py-1.5">{L.tabVoyage}</Link>
          <Link to="/time-charter" className="text-sm text-muted-foreground px-3 py-1.5 hover:text-foreground">{L.tabTime}</Link>
        </div>

        <div className="mb-2 flex gap-1 border-b">
          {(["main","recap","attachment"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setActiveTab(k)}
              className={`px-4 py-2 text-sm rounded-t-md border-b-2 transition-colors ${
                activeTab === k
                  ? "border-primary text-primary font-semibold bg-background"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {k === "main" ? L.mainTerms : k === "recap" ? L.recap : L.attachment}
            </button>
          ))}
        </div>

        {activeTab !== "main" && (
          <div className="mt-6 rounded-md border bg-card p-10 text-center text-muted-foreground">
            {activeTab === "recap" ? L.recap : L.attachment}
          </div>
        )}

        {activeTab === "main" && (
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 mt-4">
          <CharterPartyPanel
            contractNumber="Coal202203"
            vessel=""
            owners="Seafuture"
            charterers="Coal Trader"
            cpForm="GENCON"
            cpDate="8/1/2022"
            showRelet
          />

          <div className="rounded-md border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b pb-3 mb-4">
              <h2 className="text-base font-bold">{L.title}</h2>
              <Select defaultValue="single">
                <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="single">{L.single}</SelectItem><SelectItem value="multi">{L.multi}</SelectItem></SelectContent>
              </Select>
            </div>

            <FieldRow label={L.shipment}>
              <div className="overflow-hidden rounded border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border px-2 py-1 font-medium">{L.cargo}</th>
                      <th className="border px-2 py-1 font-medium">{L.quantity}</th>
                      <th className="border px-2 py-1 font-medium w-20">{L.unit}</th>
                      <th className="border px-2 py-1 font-medium">{L.margin}</th>
                      <th className="border w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((s, i) => (
                      <tr key={i}>
                        <td className="border px-2 py-1"><Input value={s.cargo} onChange={(e) => { const n = [...shipments]; n[i].cargo = e.target.value; setShipments(n); }} className="h-7 border-0 shadow-none focus-visible:ring-0" /></td>
                        <td className="border px-2 py-1"><Input value={s.quantity} onChange={(e) => { const n = [...shipments]; n[i].quantity = e.target.value; setShipments(n); }} className="h-7 border-0 text-right shadow-none focus-visible:ring-0" /></td>
                        <td className="border px-2 py-1 text-center">{s.unit}</td>
                        <td className="border px-2 py-1"><Input value={s.margin} onChange={(e) => { const n = [...shipments]; n[i].margin = e.target.value; setShipments(n); }} className="h-7 border-0 shadow-none focus-visible:ring-0" /></td>
                        <td className="border px-2 py-1"><div className="flex gap-1 justify-center"><button type="button" onClick={() => addShipment(i)} className="text-emerald-600"><Plus className="h-4 w-4" /></button><button type="button" onClick={() => removeShipment(i)} className="text-rose-600"><Minus className="h-4 w-4" /></button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FieldRow>

            <FieldRow label={L.layCan}>
              <div className="flex flex-wrap items-center gap-2">
                <DateInput value="8/15/2022 00:01" />
                <span className="text-muted-foreground">-</span>
                <DateInput value="8/25/2022 23:59" />
                <Select defaultValue="gmt"><SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="gmt">GMT +10:00</SelectItem></SelectContent>
                </Select>
              </div>
            </FieldRow>

            <FieldRow label={L.loadingPort}><PortTable rows={loadingPorts} setRows={setLoadingPorts} /></FieldRow>
            <FieldRow label={L.dischargingPort}><PortTable rows={dischargingPorts} setRows={setDischargingPorts} /></FieldRow>

            <FieldRow label={L.freight}>
              <div className="overflow-hidden rounded border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border px-2 py-1 font-medium">{L.freight}</th>
                      <th className="border px-2 py-1 font-medium">{L.unit}</th>
                      <th className="border px-2 py-1 font-medium">{L.term}</th>
                      <th className="border px-2 py-1 font-medium" colSpan={2}>{L.basedOn}</th>
                      <th className="border w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {freightRows.map((f, i) => (
                      <tr key={i}>
                        <td className="border px-2 py-1"><Input value={f.freight} onChange={(e) => { const n = [...freightRows]; n[i].freight = e.target.value; setFreightRows(n); }} className="h-7 border-0 text-right shadow-none focus-visible:ring-0" /></td>
                        <td className="border px-2 py-1 text-center text-xs">{f.unit === "mt" ? L.perMt : ""}</td>
                        <td className="border px-2 py-1 text-center">{f.term}</td>
                        <td className="border px-2 py-1 text-center">{L.baseOn}</td>
                        <td className="border px-2 py-1"><div className="flex items-center gap-1"><Input value={f.baseOnA} onChange={(e) => { const n = [...freightRows]; n[i].baseOnA = e.target.value; setFreightRows(n); }} className="h-7 border-0 shadow-none focus-visible:ring-0 text-right" /><span>/</span><Input value={f.baseOnB} onChange={(e) => { const n = [...freightRows]; n[i].baseOnB = e.target.value; setFreightRows(n); }} className="h-7 border-0 shadow-none focus-visible:ring-0 text-right" /></div></td>
                        <td className="border px-2 py-1"><div className="flex gap-1 justify-center"><button type="button" onClick={() => addFreight(i)} className="text-emerald-600"><Plus className="h-4 w-4" /></button><button type="button" onClick={() => removeFreight(i)} className="text-rose-600"><Minus className="h-4 w-4" /></button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FieldRow>

            <FieldRow label={L.addComm}>
              <div className="flex items-center gap-2"><Input defaultValue="3.75" className="w-32 h-9 text-right" /><span>%</span></div>
            </FieldRow>

            <FieldRow label={L.brokerage}>
              <div className="overflow-hidden rounded border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border px-2 py-1 font-medium">{L.account}</th>
                      <th className="border px-2 py-1 font-medium" colSpan={2}>{L.brokerage}</th>
                      <th className="border w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {brokerageRows.map((b, i) => (
                      <tr key={i}>
                        <td className="border px-2 py-1"><Input value={b.account} onChange={(e) => { const n = [...brokerageRows]; n[i].account = e.target.value; setBrokerageRows(n); }} className="h-7 border-0 shadow-none focus-visible:ring-0" /></td>
                        <td className="border px-2 py-1"><Input value={b.value} onChange={(e) => { const n = [...brokerageRows]; n[i].value = e.target.value; setBrokerageRows(n); }} className="h-7 border-0 text-right shadow-none focus-visible:ring-0" /></td>
                        <td className="border px-2 py-1 text-xs">{L.percent}</td>
                        <td className="border px-2 py-1"><div className="flex gap-1 justify-center"><button type="button" onClick={() => addBrokerage(i)} className="text-emerald-600"><Plus className="h-4 w-4" /></button><button type="button" onClick={() => removeBrokerage(i)} className="text-rose-600"><Minus className="h-4 w-4" /></button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FieldRow>

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
      </div>
    </div>
  );
}
