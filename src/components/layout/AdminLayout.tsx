
import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Home, 
  LineChart, 
  Settings, 
  Users 
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: Home,
    },
    {
      name: "Campaigns",
      href: "/admin/campaigns",
      icon: LineChart,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];
  
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-50 hidden md:block">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://levcharity.dev/app/uploads/2024/04/favicon.svg" alt="levcharity logo" className="w-6 h-6" />
            <span className="text-xl font-heading font-bold">levcharity</span>
          </Link>
        </div>
        <div className="px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-6">
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link to="/">View Site</Link>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
