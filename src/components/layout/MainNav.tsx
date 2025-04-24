
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle, Eye, EyeOff } from "lucide-react";
import { useIsAdmin } from "@/hooks/useIsAdmin";

export function MainNav() {
  const { user, signOut } = useAuth();
  const isAdmin = useIsAdmin();
  
  // Debug logs to see user and admin status in UI
  console.log("Current user in MainNav:", user?.id, user?.email);
  console.log("Is admin in MainNav:", isAdmin, "type:", typeof isAdmin);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://levcharity.dev/app/uploads/2024/04/favicon.svg" alt="levcharity logo" className="w-6 h-6" />
            <span className="text-xl font-heading font-bold">levcharity</span>
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
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <UserCircle className="h-5 w-5 mr-2" />
                    <span className="max-w-[150px] truncate">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Show Admin Dashboard button for admin users */}
              {isAdmin === true && (
                <Button asChild variant="default">
                  <Link to="/admin">Admin Dashboard</Link>
                </Button>
              )}
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
