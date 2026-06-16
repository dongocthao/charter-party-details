import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Charter Forms</h1>
        <div className="flex gap-3 justify-center">
          <Link to="/time-charter" className="px-4 py-2 rounded bg-primary text-primary-foreground">Time Charter</Link>
          <Link to="/voyage-charter" className="px-4 py-2 rounded border">Voyage Charter</Link>
        </div>
      </div>
    </div>
  );
}
