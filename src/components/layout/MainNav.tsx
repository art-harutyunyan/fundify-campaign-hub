
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function MainNav() {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-heading font-bold">Fundify</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/campaigns" className="text-sm font-medium hover:text-primary">
              Campaigns
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link to="/how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link to="/admin">Admin Dashboard</Link>
          </Button>
          <Button asChild>
            <Link to="/campaigns/new">Start a Campaign</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
