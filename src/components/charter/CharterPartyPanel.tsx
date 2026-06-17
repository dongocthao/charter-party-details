import { Calendar as CalendarIcon, Save, X, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// ============== Nhãn giao diện (chỉnh sửa tại đây) ==============
export const PANEL_LABELS = {
  charterPartyDetails: "Thông tin Hợp đồng Thuê tàu",
  contractNumber: "Số hợp đồng",
  vessel: "Tàu",
  owners: "Chủ tàu",
  charterers: "Người thuê",
  cpForm: "Mẫu hợp đồng",
  cpDate: "Ngày ký hợp đồng",
  status: "Trạng thái",
  statusStandby: "Chờ xử lý",
  statusFixed: "Đã chốt",
  tc: "TC",
  tcIn: "Thuê vào",
  tcOut: "Thuê ra",
  relet: "Cho thuê lại",
  manager: "Quản lý",
  remark: "Ghi chú",
  save: "Lưu",
  clear: "Xoá",
  list: "Danh sách",
  search: "Tìm kiếm",
  pickDate: "Chọn ngày",
};

function IconButton({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </button>
  );
}

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
  const L = PANEL_LABELS;
  return (
    <div className="flex flex-col gap-4">
      <fieldset className="rounded border bg-card p-4">
        <legend className="px-2 text-sm font-semibold">{L.charterPartyDetails}</legend>
        <div className="grid grid-cols-[110px_1fr] gap-x-3 gap-y-2 items-center">
          <FieldLabel>{L.contractNumber}</FieldLabel>
          <Input defaultValue={contractNumber} className="h-9" />

          <FieldLabel>{L.vessel}</FieldLabel>
          <div className="relative">
            <Input defaultValue={vessel} className="h-9 pr-24" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <IconButton title={L.save}><Save className="h-4 w-4" /></IconButton>
              <IconButton title={L.clear}><X className="h-4 w-4" /></IconButton>
              <IconButton title={L.list}><List className="h-4 w-4" /></IconButton>
            </div>
          </div>

          <FieldLabel>{L.owners}</FieldLabel>
          {showManager ? (
            <div className="flex gap-2">
              <Input defaultValue={owners} className="h-9 flex-1" />
              <Select defaultValue="manager">
                <SelectTrigger className="h-9 w-32"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="manager">{L.manager}</SelectItem></SelectContent>
              </Select>
            </div>
          ) : (
            <Input defaultValue={owners} className="h-9" />
          )}

          <FieldLabel>{L.charterers}</FieldLabel>
          <div className="relative">
            <Input defaultValue={charterers} className="h-9 pr-9" />
            <IconButton title={L.search}>
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4" />
            </IconButton>
          </div>

          <FieldLabel>{L.cpForm}</FieldLabel>
          <Input defaultValue={cpForm} className="h-9" />

          <FieldLabel>{L.cpDate}</FieldLabel>
          <div className="relative">
            <Input defaultValue={cpDate} className="h-9 pr-9" />
            <IconButton title={L.pickDate}>
              <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4" />
            </IconButton>
          </div>

          <FieldLabel>{L.status}</FieldLabel>
          <Select defaultValue="standby">
            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="standby">{L.statusStandby}</SelectItem>
              <SelectItem value="fixed">{L.statusFixed}</SelectItem>
            </SelectContent>
          </Select>

          {showTc && (
            <>
              <FieldLabel>{L.tc}</FieldLabel>
              <Select defaultValue="in">
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="in">{L.tcIn}</SelectItem>
                  <SelectItem value="out">{L.tcOut}</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}

          {showRelet && (
            <>
              <FieldLabel>{L.relet}</FieldLabel>
              <input type="checkbox" className="h-4 w-4" />
            </>
          )}
        </div>
      </fieldset>

      <fieldset className="rounded border bg-card p-4 flex-1 min-h-[200px] flex flex-col">
        <legend className="px-2 text-sm font-semibold">{L.remark}</legend>
        <Textarea className="flex-1 min-h-[180px] resize-none" />
      </fieldset>
    </div>
  );
}
