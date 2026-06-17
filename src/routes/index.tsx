import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Biểu mẫu Thuê tàu</h1>
        <div className="flex gap-3 justify-center">
          <Link to="/voyage-charter" className="px-4 py-2 rounded bg-primary text-primary-foreground">Thuê chuyến</Link>
          <Link to="/time-charter" className="px-4 py-2 rounded border">Thuê định hạn</Link>
        </div>
      </div>
    </div>
  );
}
