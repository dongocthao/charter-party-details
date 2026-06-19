import { createFileRoute, Link } from "@tanstack/react-router";
import { Ship, Anchor } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <AppShell title="Bảng điều khiển">
      <div className="p-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Quản lý Hợp đồng Thuê tàu</h2>
          <p className="text-sm text-muted-foreground mt-1">Chọn loại hợp đồng để bắt đầu nhập liệu.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/voyage-charter"
            className="group rounded-lg border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Ship className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Tàu Chuyến</h3>
                <p className="text-sm text-muted-foreground mt-1">Voyage Charter — hợp đồng thuê tàu theo chuyến.</p>
              </div>
            </div>
          </Link>
          <Link
            to="/time-charter"
            className="group rounded-lg border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Anchor className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Định hạn</h3>
                <p className="text-sm text-muted-foreground mt-1">Time Charter — hợp đồng thuê tàu định hạn.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
