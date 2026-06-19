import * as React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { FileText, ChevronDown, Ship, Anchor, LayoutDashboard, Menu } from "lucide-react";

export const SHELL_LABELS = {
  brand: "Maritime ERP",
  brandSub: "Quản trị Hàng hải",
  contracts: "Hợp đồng",
  voyage: "Tàu Chuyến",
  time: "Định hạn",
  dashboard: "Bảng điều khiển",
};

export function AppShell({ children, title }: { children: React.ReactNode; title?: string }) {
  const L = SHELL_LABELS;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isContracts = pathname.startsWith("/voyage-charter") || pathname.startsWith("/time-charter");
  const [open, setOpen] = React.useState(isContracts);
  const [collapsed, setCollapsed] = React.useState(false);

  const subItem = (to: string, label: string, Icon: typeof Ship) => {
    const active = pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 pl-9 pr-3 py-2 text-[13px] border-l-2 transition-colors ${
          active
            ? "border-primary bg-primary/10 text-primary font-semibold"
            : "border-transparent text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex w-full bg-[oklch(0.985_0.005_240)]">
      <aside
        className={`${collapsed ? "w-14" : "w-60"} shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col transition-all`}
      >
        {/* Brand */}
        <div className="h-14 flex items-center gap-2 px-3 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-[oklch(0.55_0.14_230)] flex items-center justify-center text-primary-foreground">
            <Anchor className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-bold text-sidebar-foreground">{L.brand}</div>
              <div className="text-[10px] text-sidebar-foreground/60 uppercase tracking-wider">{L.brandSub}</div>
            </div>
          )}
        </div>

        <nav className="flex-1 py-2">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 py-2 text-sm mx-2 rounded-md ${
              pathname === "/"
                ? "bg-primary/10 text-primary font-semibold"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            {!collapsed && <span>{L.dashboard}</span>}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`mt-1 w-[calc(100%-1rem)] mx-2 flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
              isContracts
                ? "bg-sidebar-accent text-sidebar-foreground font-semibold"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
            }`}
          >
            <FileText className="h-4 w-4" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{L.contracts}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? "" : "-rotate-90"}`} />
              </>
            )}
          </button>

          {open && !collapsed && (
            <div className="mt-1 ml-2 mr-2 border-l border-sidebar-border/60">
              {subItem("/voyage-charter", L.voyage, Ship)}
              {subItem("/time-charter", L.time, Anchor)}
            </div>
          )}
        </nav>

        <div className="p-2 border-t border-sidebar-border text-[11px] text-sidebar-foreground/50 text-center">
          {!collapsed ? "v1.0 · © Maritime" : "v1"}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-card border-b flex items-center px-4 gap-3 shadow-sm">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="p-1.5 rounded hover:bg-muted text-muted-foreground"
            aria-label="toggle sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
          {title && <h1 className="text-sm font-semibold text-foreground">{title}</h1>}
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <span className="hidden md:inline">Người dùng: Admin</span>
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">A</div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export function SectionTabs<T extends string>({
  value,
  onChange,
  tabs,
}: {
  value: T;
  onChange: (v: T) => void;
  tabs: { key: T; label: string }[];
}) {
  return (
    <div className="inline-flex p-1 rounded-lg bg-muted/60 border border-border/60 shadow-inner">
      {tabs.map((t) => {
        const active = value === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={`px-4 py-1.5 text-sm rounded-md transition-all ${
              active
                ? "bg-card text-primary font-semibold shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
